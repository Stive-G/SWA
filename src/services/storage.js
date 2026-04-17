import { API_BASE_URL } from '@env';

const baseUrl = API_BASE_URL || 'http://localhost:3000';

function buildImagePart(imageUri) {
  if (!imageUri) {
    return null;
  }

  const extension = imageUri.split('.').pop() || 'jpg';

  return {
    uri: imageUri,
    name: `clothing.${extension}`,
    type: `image/${extension === 'jpg' ? 'jpeg' : extension}`,
  };
}

export async function loadWardrobe() {
  const response = await fetch(`${baseUrl}/api/clothes`);

  if (!response.ok) {
    throw new Error('LOAD_WARDROBE_FAILED');
  }

  return response.json();
}

export async function createClothing(form, temperatureMin, temperatureMax) {
  const body = new FormData();

  body.append('name', form.name);
  body.append('type', form.type);
  body.append('style', form.style);
  body.append('color', form.color);
  body.append('isWaterproof', String(form.isWaterproof));
  body.append('temperatureMin', String(temperatureMin));
  body.append('temperatureMax', String(temperatureMax));

  const image = buildImagePart(form.imageUri);

  if (image) {
    body.append('image', image);
  }

  const response = await fetch(`${baseUrl}/api/clothes`, {
    method: 'POST',
    body,
  });

  if (!response.ok) {
    throw new Error('CREATE_CLOTHING_FAILED');
  }

  return response.json();
}

export async function deleteStoredClothing(id) {
  const response = await fetch(`${baseUrl}/api/clothes/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('DELETE_CLOTHING_FAILED');
  }
}
