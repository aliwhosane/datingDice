import React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';

type Variant = 'heading' | 'body' | 'small';

interface TextProps {
  children: React.ReactNode;
  variant?: Variant;
  style?: TextStyle;
}

const Text: React.FC<TextProps> = ({ children, variant = 'body', style }) => {
  return (
    <RNText style={[styles[variant], style]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000000',
  },
  small: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#000000',
  },
});

export default Text;