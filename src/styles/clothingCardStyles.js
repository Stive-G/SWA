import { StyleSheet } from 'react-native';

export const clothingCardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: '#dbeafe',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 12,
  },
  image: {
    width: 96,
    height: 118,
    borderRadius: 8,
    backgroundColor: '#e5e5e5',
  },
  imagePlaceholder: {
    width: 96,
    height: 118,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    backgroundColor: '#f8fbff',
  },
  imagePlaceholderText: {
    color: '#4f46e5',
    fontSize: 18,
    fontWeight: '900',
  },
  content: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },
  header: {
    gap: 6,
  },
  title: {
    color: '#071b70',
    fontSize: 18,
    fontWeight: '900',
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    backgroundColor: '#e0f7ff',
    color: '#071b70',
    fontSize: 12,
    fontWeight: '900',
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  infoGrid: {
    gap: 3,
  },
  text: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '700',
  },
});
