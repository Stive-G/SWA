import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { emptyClothingForm } from '../constants/forms';
import { defaultWardrobe } from '../data/defaults';
import { generateRecommendation } from '../services/aiService';
import {
  createClothing,
  deleteStoredClothing,
  loadWardrobe,
  updateStoredClothing,
} from '../services/storage';
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
      if (error.message === 'LOCATION_PERMISSION_DENIED') {
        Alert.alert(
          'Localisation refusée',
          'Autorise la localisation pour obtenir la météo de ta position.'
        );
        return null;
      }

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
      Alert.alert('Recommandation impossible', 'Une erreur est arrivée avec l’IA.');
      return false;
    } finally {
      setLoadingRecommendation(false);
    }
  }

  async function addClothingData(clothingForm) {
    if (
      clothingForm.name === '' ||
      clothingForm.type === '' ||
      clothingForm.style === '' ||
      clothingForm.color === ''
    ) {
      Alert.alert('Champs manquants', 'Tous les champs texte doivent être remplis.');
      return false;
    }

    const temperatureMin = Number(clothingForm.temperatureMin);
    const temperatureMax = Number(clothingForm.temperatureMax);

    if (Number.isNaN(temperatureMin) || Number.isNaN(temperatureMax)) {
      Alert.alert('Température invalide', 'Les températures doivent être des nombres.');
      return false;
    }

    try {
      const newClothing = await createClothing(clothingForm, temperatureMin, temperatureMax);
      setWardrobe([newClothing, ...wardrobe]);
      setForm(emptyClothingForm);
      return true;
    } catch (error) {
      Alert.alert('Ajout impossible', 'Impossible d’enregistrer le vêtement.');
      return false;
    }
  }

  async function addClothing() {
    return addClothingData(form);
  }

  async function updateClothing(id, clothingForm) {
    if (
      clothingForm.name === '' ||
      clothingForm.type === '' ||
      clothingForm.style === '' ||
      clothingForm.color === ''
    ) {
      Alert.alert('Champs manquants', 'Tous les champs texte doivent être remplis.');
      return false;
    }

    const temperatureMin = Number(clothingForm.temperatureMin);
    const temperatureMax = Number(clothingForm.temperatureMax);

    if (Number.isNaN(temperatureMin) || Number.isNaN(temperatureMax)) {
      Alert.alert('Température invalide', 'Les températures doivent être des nombres.');
      return false;
    }

    try {
      const updatedClothing = await updateStoredClothing(
        id,
        clothingForm,
        temperatureMin,
        temperatureMax
      );

      setWardrobe(wardrobe.map((item) => (item.id === id ? updatedClothing : item)));
      return true;
    } catch (error) {
      Alert.alert('Modification impossible', 'Impossible de modifier le vêtement.');
      return false;
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

  function getClothingById(id) {
    return wardrobe.find((item) => item.id === id);
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
        addClothingData,
        updateClothing,
        deleteClothing,
        getClothingById,
      }}
    >
      {children}
    </WardrobeContext.Provider>
  );
}

export function useWardrobe() {
  return useContext(WardrobeContext);
}
