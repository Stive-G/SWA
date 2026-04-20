import { Image, Pressable, Text, View } from 'react-native';
import { clothingCardStyles as styles } from '../styles/clothingCardStyles';
import { Button } from './Button';

export function ClothingCard({ item, onDelete, onPress }) {
  const CardWrapper = onPress ? Pressable : View;

  return (
    <CardWrapper style={styles.card} onPress={onPress}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>SWA</Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.badge}>{item.type}</Text>
        </View>

        <View style={styles.infoGrid}>
          <Text style={styles.text}>Couleur: {item.color}</Text>
          <Text style={styles.text}>Style: {item.style}</Text>
          <Text style={styles.text}>
            {item.temperatureMin} °C à {item.temperatureMax} °C
          </Text>
          <Text style={styles.text}>
            {item.isWaterproof ? 'Imperméable' : 'Non imperméable'}
          </Text>
        </View>

        {onDelete && (
          <Button label="Supprimer" variant="danger" onPress={onDelete} />
        )}
      </View>
    </CardWrapper>
  );
}
