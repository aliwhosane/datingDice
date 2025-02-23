import React from 'react';
import { View, StyleSheet, SafeAreaView, ViewStyle } from 'react-native';

interface GameTemplateProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const GameTemplate: React.FC<GameTemplateProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 16,
  },
});

export default GameTemplate;