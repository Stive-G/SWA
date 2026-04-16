import { StyleSheet } from 'react-native';

export const homeScreenStyles = StyleSheet.create({
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
  copy: {
    color: '#4b5563',
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
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  bigNumber: {
    color: '#2563eb',
    fontSize: 42,
    fontWeight: '900',
  },
  weatherValue: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '900',
  },
  label: {
    color: '#4b5563',
    fontWeight: '700',
  },
});
