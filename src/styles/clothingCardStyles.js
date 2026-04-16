import { StyleSheet } from 'react-native';

export const clothingCardStyles = StyleSheet.create({
  card: {
    gap: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    flex: 1,
    color: '#111827',
    fontSize: 18,
    fontWeight: '900',
  },
  badge: {
    borderRadius: 8,
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    color: '#4b5563',
  },
});
