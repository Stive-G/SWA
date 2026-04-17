import { StyleSheet } from 'react-native';

export const wardrobeScreenStyles = StyleSheet.create({
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
  form: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    color: '#111827',
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  switchLabel: {
    color: '#111827',
    fontWeight: '700',
  },
  imagePreview: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
});
