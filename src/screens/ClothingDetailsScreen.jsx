import { Image, ScrollView, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { useWardrobe } from '../context/WardrobeContext';
import { clothingDetailsStyles as styles } from '../styles/clothingDetailsStyles';

function DetailLine({ label, value }) {
  return (
    <View style={styles.detailLine}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

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
        <View style={styles.emptyBox}>
          <Text style={styles.title}>Vêtement introuvable</Text>
          <Text style={styles.text}>Cette pièce n’existe plus dans ton armoire.</Text>
          <Button label="Retour" onPress={() => navigation.goBack()} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderTitle}>SWA</Text>
            <Text style={styles.imagePlaceholderText}>Aucune photo</Text>
          </View>
        )}

        <View style={styles.mainInfo}>
          <Text style={styles.badge}>{item.type}</Text>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.text}>
            {item.style} • {item.color}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Détails</Text>
        <DetailLine label="Couleur" value={item.color} />
        <DetailLine label="Style" value={item.style} />
        <DetailLine label="Type" value={item.type} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Utilisation météo</Text>
        <DetailLine
          label="Température"
          value={`${item.temperatureMin} °C à ${item.temperatureMax} °C`}
        />
        <DetailLine
          label="Pluie"
          value={item.isWaterproof ? 'Imperméable' : 'Non imperméable'}
        />
      </View>

      <View style={styles.actions}>
        <Button
          label="Modifier ce vêtement"
          variant="secondary"
          onPress={() => navigation.navigate('Form', { id: item.id })}
        />

        <Button label="Supprimer" variant="danger" onPress={deleteItem} />
      </View>
    </ScrollView>
  );
}
