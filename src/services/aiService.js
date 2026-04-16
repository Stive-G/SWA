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

export async function generateRecommendation(weather, wardrobe) {
  if (!IA_API_KEY || IA_API_KEY === 'your_mistral_api_key_here') {
    return getLocalRecommendation(weather, wardrobe);
  }

  const url = MISTRAL_API_URL || 'https://api.mistral.ai/v1/chat/completions';

  const prompt = `Tu dois recommander une tenue.
                  Météo: ${JSON.stringify(weather)}
                  Armoire: ${JSON.stringify(wardrobe)}
                  Utilise seulement les vêtements de l’armoire.
                  Réponds en JSON comme ceci:
                  {"outfit":["nom du vêtement"],"explanation":"explication"}
                  `;

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
    throw new Error('Mistral AI a refusé la recommandation.');
  }

  const data = await response.json();
  const text = data.choices[0].message.content;
  const result = JSON.parse(text);

  return {
    outfit: result.outfit || [],
    explanation: result.explanation || '',
  };
}
