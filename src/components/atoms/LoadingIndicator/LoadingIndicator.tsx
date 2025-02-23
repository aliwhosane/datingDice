import React from 'react';
import { ActivityIndicator, View, StyleSheet, ViewStyle } from 'react-native';

interface LoadingIndicatorProps {
  size?: 'small' | 'large';
  color?: string;
  style?: ViewStyle;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  size = 'large', 
  color = '#007AFF',
  style 
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;