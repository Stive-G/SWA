import { FlatList, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { ClothingCard } from '../components/ClothingCard';
import { useWardrobe } from '../context/WardrobeContext';
import { wardrobeScreenStyles as styles } from '../styles/wardrobeScreenStyles';

export function WardrobeScreen({ navigation }) {
  const wardrobeData = useWardrobe();

  function renderHeader() {
    return (
      <View style={styles.header}>
        <Button
          label="Ajouter un vêtement"
          onPress={() => navigation.navigate('Form')}
        />
      </View>
    );
  }

  function renderEmptyList() {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyTitle}>Armoire vide</Text>
        <Text style={styles.emptyText}>
          Ajoute une première pièce pour recevoir une recommandation.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={wardrobeData.wardrobe}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <ClothingCard
            item={item}
            onPress={() => navigation.navigate('Details', { id: item.id })}
          />
        </View>
      )}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmptyList}
      contentContainerStyle={styles.screen}
    />
  );
}
