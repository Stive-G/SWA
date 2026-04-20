import { StyleSheet } from 'react-native';

export const homeScreenStyles = StyleSheet.create({
  screen: {
    gap: 18,
    padding: 20,
    paddingBottom: 32,
    backgroundColor: '#eef2f7',
  },
  title: {
    color: '#071b70',
    fontSize: 32,
    fontWeight: '900',
  },
  copy: {
    color: '#525252',
    fontSize: 16,
    lineHeight: 23,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  infoBox: {
    flex: 1,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  bigNumber: {
    color: '#38c7f3',
    fontSize: 44,
    fontWeight: '900',
  },
  weatherValue: {
    color: '#8b5cf6',
    fontSize: 26,
    fontWeight: '900',
  },
  label: {
    color: '#64748b',
    fontWeight: '800',
  },
});
