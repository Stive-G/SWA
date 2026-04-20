import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  primary: {
    backgroundColor: '#4f46e5',
  },
  secondary: {
    borderWidth: 1,
    borderColor: '#d4d4d4',
    backgroundColor: '#ffffff',
  },
  danger: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  label: {
    color: '#ffffff',
    fontWeight: '800',
  },
  darkLabel: {
    color: '#071b70',
  },
  pressed: {
    opacity: 0.85,
  },
});
