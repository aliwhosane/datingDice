import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { THEME_COLORS } from '../../../constants/colors';

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  hasIcon?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onPress, title, disabled, hasIcon }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        hasIcon && styles.buttonWithIcon
      ]}
    >
      <Text style={[
        styles.buttonText,
        hasIcon && styles.buttonWithIcon
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME_COLORS.surface,
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: THEME_COLORS.textSecondary,
    opacity: 0.5,
  },
  buttonWithIcon: {
    paddingHorizontal: 16,
  },
  buttonText: {
    color: THEME_COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;
