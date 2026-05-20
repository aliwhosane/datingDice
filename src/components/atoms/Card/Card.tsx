import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { THEME_COLORS } from '../../../constants/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME_COLORS.surface,
    borderRadius: 32, // More organic rounded corners
    padding: 24,
    marginVertical: 12,
    marginHorizontal: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15, // Softer shadow opacity
    shadowRadius: 16, // Deeper blur radius
  },
});

export default Card;
