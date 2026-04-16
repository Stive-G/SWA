import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  primary: {
    backgroundColor: '#2563eb',
  },
  secondary: {
    backgroundColor: '#e5e7eb',
  },
  danger: {
    alignSelf: 'flex-start',
    backgroundColor: '#fee2e2',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  label: {
    color: '#ffffff',
    fontWeight: '800',
  },
  darkLabel: {
    color: '#111827',
  },
  pressed: {
    opacity: 0.85,
  },
});
