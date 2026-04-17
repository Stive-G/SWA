import { Image, ScrollView, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { useWardrobe } from '../context/WardrobeContext';
import { clothingDetailsStyles as styles } from '../styles/clothingDetailsStyles';

export function ClothingDetailsScreen({ navigation, route }) {
  const wardrobeData = useWardrobe();
  const item = wardrobeData.getClothingById(route.params.id);

  async function deleteItem() {
    await wardrobeData.deleteClothing(route.params.id);
    navigation.goBack();
  }

  if (!item) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Vêtement introuvable</Text>
        <Button label="Retour" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      ) : null}

      <Text style={styles.title}>{item.name}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Type</Text>
        <Text style={styles.value}>{item.type}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Couleur</Text>
        <Text style={styles.value}>{item.color}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Style</Text>
        <Text style={styles.value}>{item.style}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Température</Text>
        <Text style={styles.value}>
          {item.temperatureMin} °C à {item.temperatureMax} °C
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Pluie</Text>
        <Text style={styles.value}>
          {item.isWaterproof ? 'Imperméable' : 'Non imperméable'}
        </Text>
      </View>

      <Button
        label="Modifier"
        variant="secondary"
        onPress={() => navigation.navigate('Form', { id: item.id })}
      />

      <Button label="Supprimer" variant="danger" onPress={deleteItem} />
    </ScrollView>
  );
}
