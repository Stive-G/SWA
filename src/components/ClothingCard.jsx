import { Image, Text, View } from 'react-native';
import { clothingCardStyles as styles } from '../styles/clothingCardStyles';
import { Button } from './Button';

export function ClothingCard({ item, onDelete }) {
  return (
    <View style={styles.card}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      ) : null}

      <View style={styles.header}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.badge}>{item.type}</Text>
      </View>

      <Text style={styles.text}>Couleur: {item.color}</Text>
      <Text style={styles.text}>Style: {item.style}</Text>
      <Text style={styles.text}>
        Température: {item.temperatureMin} °C à {item.temperatureMax} °C
      </Text>
      <Text style={styles.text}>
        {item.isWaterproof ? 'Imperméable' : 'Non imperméable'}
      </Text>

      {onDelete && (
        <Button label="Supprimer" variant="danger" onPress={onDelete} />
      )}
    </View>
  );
}
