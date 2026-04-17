import { StyleSheet } from 'react-native';

export const clothingDetailsStyles = StyleSheet.create({
  screen: {
    gap: 16,
    padding: 20,
    paddingBottom: 28,
  },
  title: {
    color: '#111827',
    fontSize: 30,
    fontWeight: '900',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
  infoBox: {
    gap: 4,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 12,
  },
  label: {
    color: '#6b7280',
    fontWeight: '700',
  },
  value: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
  },
});
