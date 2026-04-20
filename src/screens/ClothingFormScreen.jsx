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

      <View style={styles.photoBox}>
        {form.imageUri ? (
          <Image source={{ uri: form.imageUri }} style={styles.imagePreview} />
        ) : (
          <View style={styles.imageEmpty}>
            <Text style={styles.imageEmptyText}>Photo du vêtement</Text>
          </View>
        )}

        <Button
          label={form.imageUri ? 'Changer la photo' : 'Ajouter une photo'}
          variant="secondary"
          onPress={pickImage}
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Informations</Text>

        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Veste noire"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />

        <Text style={styles.label}>Style</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: casual"
          value={form.style}
          onChangeText={(text) => setForm({ ...form, style: text })}
        />

        <Text style={styles.label}>Couleur</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: bleu"
          value={form.color}
          onChangeText={(text) => setForm({ ...form, color: text })}
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Type</Text>
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

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Météo</Text>

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
      </View>

      <Button
        label={isEditing ? 'Enregistrer' : 'Ajouter'}
        onPress={saveClothing}
      />
    </ScrollView>
  );
}
