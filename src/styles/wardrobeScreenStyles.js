import { StyleSheet } from 'react-native';

export const wardrobeScreenStyles = StyleSheet.create({
  screen: {
    padding: 18,
    paddingBottom: 30,
    backgroundColor: '#eef2f7',
  },
  header: {
    gap: 10,
    marginBottom: 16,
  },
  title: {
    color: '#071b70',
    fontSize: 31,
    fontWeight: '900',
  },
  subtitle: {
    color: '#64748b',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '700',
  },
  cardWrapper: {
    marginBottom: 12,
  },
  emptyBox: {
    gap: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 8,
  },
  emptyTitle: {
    color: '#071b70',
    fontSize: 20,
    fontWeight: '900',
  },
  emptyText: {
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 20,
  },
});
