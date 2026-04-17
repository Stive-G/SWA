import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { Button } from '../components/Button';
import { clothingTypes, emptyClothingForm } from '../constants/forms';
import { useWardrobe } from '../context/WardrobeContext';
import { clothingFormStyles as styles } from '../styles/clothingFormStyles';

function buildInitialForm(item) {
  if (!item) {
    return emptyClothingForm;
  }

  return {
    name: item.name,
    type: item.type,
    style: item.style,
    color: item.color,
    isWaterproof: item.isWaterproof,
    temperatureMin: String(item.temperatureMin),
    temperatureMax: String(item.temperatureMax),
    imageUri: item.imageUrl || '',
  };
}

export function ClothingFormScreen({ navigation, route }) {
  const wardrobeData = useWardrobe();
  const item = route.params?.id ? wardrobeData.getClothingById(route.params.id) : null;
  const [form, setForm] = useState(buildInitialForm(item));
  const isEditing = Boolean(item);

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
      setForm({ ...form, imageUri: result.assets[0].uri });
    }
  }

  async function saveClothing() {
    const success = isEditing
      ? await wardrobeData.updateClothing(item.id, form)
      : await wardrobeData.addClothingData(form);

    if (success) {
      navigation.goBack();
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>
        {isEditing ? 'Modifier le vêtement' : 'Ajouter un vêtement'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nom du vêtement"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />

      <View style={styles.typeList}>
        <Text style={styles.label}>Type</Text>
        <View style={styles.typeGrid}>
          {clothingTypes.map((type) => (
            <Button
              key={type.value}
              label={type.label}
              variant={form.type === type.value ? undefined : 'secondary'}
              onPress={() => setForm({ ...form, type: type.value })}
            />
          ))}
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Style"
        value={form.style}
        onChangeText={(text) => setForm({ ...form, style: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Couleur"
        value={form.color}
        onChangeText={(text) => setForm({ ...form, color: text })}
      />

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Imperméable</Text>
        <Switch
          value={form.isWaterproof}
          onValueChange={(value) => setForm({ ...form, isWaterproof: value })}
        />
      </View>

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          keyboardType="numeric"
          placeholder="Temp. min"
          value={form.temperatureMin}
          onChangeText={(text) => setForm({ ...form, temperatureMin: text })}
        />

        <TextInput
          style={[styles.input, styles.halfInput]}
          keyboardType="numeric"
          placeholder="Temp. max"
          value={form.temperatureMax}
          onChangeText={(text) => setForm({ ...form, temperatureMax: text })}
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

      <Button
        label={isEditing ? 'Enregistrer' : 'Ajouter'}
        onPress={saveClothing}
      />
    </ScrollView>
  );
}
