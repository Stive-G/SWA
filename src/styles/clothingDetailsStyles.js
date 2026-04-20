import { StyleSheet } from 'react-native';

export const clothingDetailsStyles = StyleSheet.create({
  screen: {
    gap: 14,
    padding: 18,
    paddingBottom: 30,
    backgroundColor: '#eef2f7',
  },
  card: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    aspectRatio: 1.15,
    backgroundColor: '#e5e5e5',
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1.15,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#f8fbff',
  },
  imagePlaceholderTitle: {
    color: '#4f46e5',
    fontSize: 42,
    fontWeight: '900',
  },
  imagePlaceholderText: {
    color: '#64748b',
    fontWeight: '800',
  },
  mainInfo: {
    gap: 7,
    padding: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    backgroundColor: '#e0f7ff',
    color: '#071b70',
    fontWeight: '900',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    color: '#071b70',
    fontSize: 30,
    fontWeight: '900',
  },
  text: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '700',
  },
  section: {
    gap: 2,
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
    marginBottom: 8,
  },
  detailLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingVertical: 11,
  },
  label: {
    color: '#64748b',
    fontWeight: '800',
  },
  value: {
    flex: 1,
    color: '#071b70',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'right',
  },
  actions: {
    gap: 10,
  },
  emptyBox: {
    gap: 12,
    borderWidth: 1,
    borderColor: '#dbeafe',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 16,
  },
});
