import { StyleSheet } from 'react-native';

export const clothingFormStyles = StyleSheet.create({
  screen: {
    gap: 16,
    padding: 18,
    paddingBottom: 30,
    backgroundColor: '#eef2f7',
  },
  title: {
    color: '#071b70',
    fontSize: 30,
    fontWeight: '900',
  },
  photoBox: {
    gap: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 12,
  },
  imagePreview: {
    width: '100%',
    aspectRatio: 1.55,
    borderRadius: 8,
    backgroundColor: '#e5e5e5',
  },
  imageEmpty: {
    width: '100%',
    aspectRatio: 1.55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dbeafe',
    backgroundColor: '#f8fbff',
  },
  imageEmptyText: {
    color: '#4f46e5',
    fontSize: 18,
    fontWeight: '900',
  },
  formSection: {
    gap: 9,
    borderWidth: 1,
    borderColor: '#dbeafe',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 14,
  },
  sectionTitle: {
    color: '#071b70',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    backgroundColor: '#f8fbff',
    color: '#071b70',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  label: {
    color: '#475569',
    fontWeight: '800',
  },
  typeList: {
    gap: 8,
  },
  typeGrid: {
    gap: 8,
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
    borderColor: '#cbd5e1',
    borderRadius: 8,
    backgroundColor: '#f8fbff',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  switchLabel: {
    color: '#071b70',
    fontWeight: '800',
  },
});
