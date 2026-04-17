import { IA_API_KEY, MISTRAL_API_URL, MISTRAL_MODEL } from '@env';

function getLocalRecommendation(weather, wardrobe) {
  const selectedClothes = [];

  wardrobe.forEach((item) => {
    const temperatureIsOk =
      weather.temperature >= item.temperatureMin &&
      weather.temperature <= item.temperatureMax;

    if (temperatureIsOk) {
      selectedClothes.push(item.name);
    }
  });

  return {
    outfit: selectedClothes,
    explanation: `Sélection simple pour ${weather.temperature} °C avec une météo: ${weather.condition}.`,
  };
}

function parseRecommendation(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');

    if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
      throw error;
    }

    return JSON.parse(text.slice(jsonStart, jsonEnd + 1));
  }
}

function normalizeRecommendation(result) {
  return {
    outfit: Array.isArray(result.outfit) ? result.outfit : [],
    explanation: typeof result.explanation === 'string' ? result.explanation : '',
  };
}

export async function generateRecommendation(weather, wardrobe) {
  if (!IA_API_KEY || IA_API_KEY === 'api_key') {
    return getLocalRecommendation(weather, wardrobe);
  }

  try {
    const url = MISTRAL_API_URL || 'https://api.mistral.ai/v1/chat/completions';

    const prompt = `Tu dois recommander une tenue.
                    Météo: ${JSON.stringify(weather)}
                    Armoire: ${JSON.stringify(wardrobe)}
                    Utilise seulement les vêtements de l'armoire.
                    Réponds uniquement avec un objet JSON valide, sans markdown, sans texte avant ou après.
                    Format attendu:
                    {"outfit":["nom exact du vêtement"],"explanation":"explication courte"}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${IA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MISTRAL_MODEL || 'mistral-small-latest',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('Mistral recommendation failed:', response.status, errorText);
      return getLocalRecommendation(weather, wardrobe);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      console.warn('Mistral recommendation response is empty:', data);
      return getLocalRecommendation(weather, wardrobe);
    }

    return normalizeRecommendation(parseRecommendation(text));
  } catch (error) {
    console.warn('Mistral recommendation fallback:', error);
    return getLocalRecommendation(weather, wardrobe);
  }
}
