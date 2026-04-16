import { Pressable, Text } from 'react-native';
import { buttonStyles as styles } from '../styles/buttonStyles';

export function Button({ label, onPress, variant }) {
  let buttonStyle = styles.primary;
  let textStyle = styles.label;

  if (variant === 'secondary') {
    buttonStyle = styles.secondary;
    textStyle = styles.darkLabel;
  }

  if (variant === 'danger') {
    buttonStyle = styles.danger;
    textStyle = styles.darkLabel;
  }

  return (
    <Pressable style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </Pressable>
  );
}
