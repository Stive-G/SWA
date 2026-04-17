import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { emptyClothingForm } from '../constants/forms';
import { defaultWardrobe } from '../data/defaults';
import { generateRecommendation } from '../services/aiService';
import { createClothing, deleteStoredClothing, loadWardrobe } from '../services/storage';
import { fetchCurrentWeather } from '../services/weather';

const WardrobeContext = createContext();

export function WardrobeProvider({ children }) {
  const [wardrobe, setWardrobe] = useState(defaultWardrobe);
  const [weather, setWeather] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [form, setForm] = useState(emptyClothingForm);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);

  useEffect(() => {
    getSavedWardrobe();
    refreshWeather();
  }, []);

  async function getSavedWardrobe() {
    try {
      const savedWardrobe = await loadWardrobe();

      if (savedWardrobe) {
        setWardrobe(savedWardrobe);
      }
    } catch (error) {
      Alert.alert('Armoire indisponible', 'Impossible de charger les vêtements depuis le serveur.');
    }
  }

  async function refreshWeather() {
    setLoadingWeather(true);

    try {
      const newWeather = await fetchCurrentWeather();
      setWeather(newWeather);
      return newWeather;
    } catch (error) {
      Alert.alert('Météo indisponible', 'Impossible de récupérer la météo.');
      return null;
    } finally {
      setLoadingWeather(false);
    }
  }

  async function recommendOutfit() {
    setLoadingRecommendation(true);

    try {
      let currentWeather = weather;

      if (!currentWeather) {
        currentWeather = await refreshWeather();
      }

      if (!currentWeather) {
        return false;
      }

      const result = await generateRecommendation(currentWeather, wardrobe);
      setRecommendation(result);
      return true;
    } catch (error) {
      Alert.alert('Recommandation impossible', 'Une erreur est arrivee avec l IA.');
      return false;
    } finally {
      setLoadingRecommendation(false);
    }
  }

  async function addClothing() {
    if (form.name === '' || form.type === '' || form.style === '' || form.color === '') {
      Alert.alert('Champs manquants', 'Tous les champs texte doivent etre remplis.');
      return;
    }

    const temperatureMin = Number(form.temperatureMin);
    const temperatureMax = Number(form.temperatureMax);

    if (Number.isNaN(temperatureMin) || Number.isNaN(temperatureMax)) {
      Alert.alert('Temperature invalide', 'Les temperatures doivent etre des nombres.');
      return;
    }

    try {
      const newClothing = await createClothing(form, temperatureMin, temperatureMax);
      setWardrobe([newClothing, ...wardrobe]);
      setForm(emptyClothingForm);
    } catch (error) {
      Alert.alert('Ajout impossible', 'Impossible d’enregistrer le vêtement.');
    }
  }

  async function deleteClothing(id) {
    try {
      await deleteStoredClothing(id);
      setWardrobe(wardrobe.filter((item) => item.id !== id));
    } catch (error) {
      Alert.alert('Suppression impossible', 'Impossible de supprimer le vêtement.');
    }
  }

  const selectedItems = wardrobe.filter((item) => {
    if (!recommendation) {
      return false;
    }

    return recommendation.outfit.includes(item.name);
  });

  return (
    <WardrobeContext.Provider
      value={{
        wardrobe,
        weather,
        recommendation,
        selectedItems,
        form,
        setForm,
        loadingWeather,
        loadingRecommendation,
        refreshWeather,
        recommendOutfit,
        addClothing,
        deleteClothing,
      }}
    >
      {children}
    </WardrobeContext.Provider>
  );
}

export function useWardrobe() {
  return useContext(WardrobeContext);
}
