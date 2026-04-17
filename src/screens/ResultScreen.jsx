import { FlatList, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { ClothingCard } from '../components/ClothingCard';
import { useWardrobe } from '../context/WardrobeContext';
import { resultScreenStyles as styles } from '../styles/resultScreenStyles';

export function ResultScreen() {
  const wardrobeData = useWardrobe();
  const hasRecommendation = Boolean(wardrobeData.recommendation);

  function renderHeader() {
    return (
      <View style={styles.headerContent}>
        <View style={styles.hero}>
          <Text style={styles.badge}>Assistant IA</Text>
          <Text style={styles.title}>Recommandations</Text>
          <Text style={styles.copy}>
            {hasRecommendation
              ? 'Une tenue proposée avec la météo actuelle et les vêtements disponibles.'
              : 'Lance une recommandation pour recevoir une tenue adaptée.'}
          </Text>
        </View>

        <View style={styles.weatherBox}>
          <Text style={styles.boxLabel}>Contexte météo</Text>
          <Text style={styles.weatherValue}>
            {wardrobeData.weather
              ? wardrobeData.weather.temperature + ' °C'
              : '-- °C'}
          </Text>
          <Text style={styles.copy}>
            {wardrobeData.weather ? wardrobeData.weather.condition : 'Météo non chargée'}
          </Text>
        </View>

        <Button
          label={wardrobeData.loadingRecommendation ? 'Analyse en cours...' : 'Générer une recommandation'}
          onPress={wardrobeData.recommendOutfit}
        />

        <View style={styles.answerBox}>
          <View style={styles.answerHeader}>
            <Text style={styles.answerIcon}>IA</Text>
            <View style={styles.answerTitleGroup}>
              <Text style={styles.sectionTitle}>Réponse de l’assistant</Text>
              <Text style={styles.smallText}>Sélection intelligente</Text>
            </View>
          </View>

          <Text style={styles.copy}>
            {hasRecommendation
              ? wardrobeData.recommendation.explanation
              : 'Aucune recommandation pour le moment.'}
          </Text>
        </View>

        <Text style={styles.listTitle}>Vêtements recommandés</Text>

        {wardrobeData.selectedItems.length === 0 && (
          <Text style={styles.emptyText}>Aucun vêtement sélectionné.</Text>
        )}
      </View>
    );
  }

  return (
    <FlatList
      data={wardrobeData.selectedItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.cardItem}>
          <ClothingCard item={item} />
        </View>
      )}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.screen}
    />
  );
}
