import { FlatList, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { ClothingCard } from '../components/ClothingCard';
import { useWardrobe } from '../context/WardrobeContext';
import { resultScreenStyles as styles } from '../styles/resultScreenStyles';

export function ResultScreen() {
  const wardrobeData = useWardrobe();

  function renderHeader() {
    return (
      <>
        <Text style={styles.title}>Tenue recommandée</Text>

        <Text style={styles.copy}>
          {wardrobeData.weather
            ? wardrobeData.weather.temperature + ' °C, ' + wardrobeData.weather.condition
            : 'Météo non chargée'}
        </Text>

        <Button
          label={wardrobeData.loadingRecommendation ? 'Chargement...' : 'Régénérer avec Mistral'}
          onPress={wardrobeData.recommendOutfit}
        />

        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Explication</Text>
          <Text style={styles.copy}>
            {wardrobeData.recommendation
              ? wardrobeData.recommendation.explanation
              : 'Aucune recommandation pour le moment.'}
          </Text>
        </View>

        {wardrobeData.selectedItems.length === 0 && (
          <Text style={styles.emptyText}>Aucun vêtement sélectionné.</Text>
        )}
      </>
    );
  }

  return (
    <FlatList
      data={wardrobeData.selectedItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ClothingCard item={item} />}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.screen}
    />
  );
}
