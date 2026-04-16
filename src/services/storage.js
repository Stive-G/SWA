import AsyncStorage from '@react-native-async-storage/async-storage';

const WARDROBE_KEY = 'smart-wardrobe-assistant:wardrobe';

export async function loadWardrobe() {
  const raw = await AsyncStorage.getItem(WARDROBE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function saveWardrobe(items) {
  await AsyncStorage.setItem(WARDROBE_KEY, JSON.stringify(items));
}
