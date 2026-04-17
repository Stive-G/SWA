import { FlatList, Text } from 'react-native';
import { Button } from '../components/Button';
import { ClothingCard } from '../components/ClothingCard';
import { useWardrobe } from '../context/WardrobeContext';
import { wardrobeScreenStyles as styles } from '../styles/wardrobeScreenStyles';

export function WardrobeScreen({ navigation }) {
  const wardrobeData = useWardrobe();

  function renderFooter() {
    return (
      <Button
        label="Ajouter un vêtement"
        onPress={() => navigation.navigate('Form')}
      />
    );
  }

  function renderEmptyList() {
    return <Text style={styles.emptyText}>Aucun vêtement dans ton armoire.</Text>;
  }

  return (
    <FlatList
      data={wardrobeData.wardrobe}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ClothingCard
          item={item}
          onPress={() => navigation.navigate('Details', { id: item.id })}
        />
      )}
      ListEmptyComponent={renderEmptyList}
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.screen}
    />
  );
}
