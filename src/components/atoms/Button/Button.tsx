import React from 'react';
import { Pressable, Text, StyleSheet, Animated } from 'react-native';
import { THEME_COLORS } from '../../../constants/colors';

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  hasIcon?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onPress, title, disabled }) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.94,
      useNativeDriver: true,
      tension: 150,
      friction: 5,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 150,
      friction: 5,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={styles.pressable}
    >
      <Animated.View
        style={[
          styles.button,
          { transform: [{ scale: scaleValue }] },
          disabled && styles.buttonDisabled,
        ]}
      >
        <Text style={[
          styles.buttonText,
          disabled && styles.buttonTextDisabled,
        ]}>
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#E8809A', // Blush Rose Accent
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 30, // Rounded pill shape
    width: '85%',
    maxWidth: 300,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E8809A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: THEME_COLORS.surface,
    shadowOpacity: 0,
    elevation: 0,
    opacity: 0.5,
  },
  buttonText: {
    color: '#1A111E', // Dark Aubergine text on light background
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.0,
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: THEME_COLORS.textSecondary,
  },
});

export default Button;
