import * as ImagePicker from 'expo-image-picker';
import { Image, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { Button } from '../components/Button';
import { ClothingCard } from '../components/ClothingCard';
import { useWardrobe } from '../context/WardrobeContext';
import { wardrobeScreenStyles as styles } from '../styles/wardrobeScreenStyles';

export function WardrobeScreen() {
  const wardrobeData = useWardrobe();
  const form = wardrobeData.form;

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (!result.canceled) {
      wardrobeData.setForm({ ...form, imageUri: result.assets[0].uri });
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Armoire</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nom du vêtement"
          value={form.name}
          onChangeText={(text) => wardrobeData.setForm({ ...form, name: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Type: top, bottom, shoes, jacket"
          value={form.type}
          onChangeText={(text) => wardrobeData.setForm({ ...form, type: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Style"
          value={form.style}
          onChangeText={(text) => wardrobeData.setForm({ ...form, style: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Couleur"
          value={form.color}
          onChangeText={(text) => wardrobeData.setForm({ ...form, color: text })}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Imperméable</Text>
          <Switch
            value={form.isWaterproof}
            onValueChange={(value) => wardrobeData.setForm({ ...form, isWaterproof: value })}
          />
        </View>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            keyboardType="numeric"
            placeholder="Temp. min"
            value={form.temperatureMin}
            onChangeText={(text) => wardrobeData.setForm({ ...form, temperatureMin: text })}
          />

          <TextInput
            style={[styles.input, styles.halfInput]}
            keyboardType="numeric"
            placeholder="Temp. max"
            value={form.temperatureMax}
            onChangeText={(text) => wardrobeData.setForm({ ...form, temperatureMax: text })}
          />
        </View>

        {form.imageUri ? (
          <Image source={{ uri: form.imageUri }} style={styles.imagePreview} />
        ) : null}

        <Button
          label={form.imageUri ? 'Changer la photo' : 'Ajouter une photo'}
          variant="secondary"
          onPress={pickImage}
        />

        <Button label="Ajouter le vêtement" onPress={wardrobeData.addClothing} />
      </View>

      {wardrobeData.wardrobe.map((item) => (
        <ClothingCard
          key={item.id}
          item={item}
          onDelete={() => wardrobeData.deleteClothing(item.id)}
        />
      ))}
    </ScrollView>
  );
}
