import { WEATHER_API_URL } from '@env';

const weatherLabels = {
  0: 'soleil',
  1: 'ciel dégagé',
  2: 'partiellement nuageux',
  3: 'couvert',
  45: 'brouillard',
  48: 'brouillard givrant',
  51: 'bruine légère',
  53: 'bruine',
  55: 'bruine dense',
  61: 'pluie légère',
  63: 'pluie',
  65: 'forte pluie',
  71: 'neige légère',
  73: 'neige',
  75: 'forte neige',
  80: 'averses légères',
  81: 'averses',
  82: 'fortes averses',
  95: 'orage',
};

export async function fetchCurrentWeather() {
  const latitude = 48.8566;
  const longitude = 2.3522;
  const baseUrl = WEATHER_API_URL || 'https://api.open-meteo.com';
  const url = `${baseUrl}/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`;

  const response = await fetch(url);
  const data = await response.json();

  const temperature = data.current.temperature_2m;
  const code = data.current.weather_code;

  return {
    temperature: temperature,
    condition: weatherLabels[code] || 'condition inconnue',
    weatherCode: code,
  };
}
