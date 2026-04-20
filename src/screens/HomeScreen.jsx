import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { useWardrobe } from '../context/WardrobeContext';
import { homeScreenStyles as styles } from '../styles/homeScreenStyles';

export function HomeScreen({ navigation }) {
  const wardrobeData = useWardrobe();

  async function goToResult() {
    const success = await wardrobeData.recommendOutfit();

    if (success) {
      navigation.navigate('Resultat');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Smart Wardrobe Assistant</Text>

      <Text style={styles.copy}>
        Une application pour choisir une tenue avec ton armoire, la météo et une recommandation personnalisée.
      </Text>

      <View style={styles.statsGrid}>
        <View style={styles.infoBox}>
          <Text style={styles.bigNumber}>{wardrobeData.wardrobe.length}</Text>
          <Text style={styles.label}>vêtements</Text>
        </View>

        <View style={styles.infoBox}>
          {wardrobeData.loadingWeather ? (
            <ActivityIndicator color="#4f46e5" />
          ) : (
            <View>
              <Text style={styles.weatherValue}>
                {wardrobeData.weather ? wardrobeData.weather.temperature + ' °C' : '--'}
              </Text>
              <Text style={styles.label}>
                {wardrobeData.weather ? wardrobeData.weather.condition : 'météo'}
              </Text>
            </View>
          )}
        </View>
      </View>

      <Button
        label={wardrobeData.loadingRecommendation ? 'Chargement...' : 'Générer une tenue'}
        onPress={goToResult}
      />

      <Button
        label="Actualiser la météo"
        variant="secondary"
        onPress={wardrobeData.refreshWeather}
      />
    </ScrollView>
  );
}
