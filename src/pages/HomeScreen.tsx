import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/atoms/Button/Button';
import { THEME_COLORS } from '../constants/colors';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Dating Dice</Text>
        <Text style={styles.subtitle}>Roll the dice for a fun conversation!</Text>
        <Button 
          onPress={() => navigation.navigate('Game' as never)} title="Start Game"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: THEME_COLORS.text,
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    color: THEME_COLORS.textSecondary,
    fontSize: 18,
    marginVertical: 16,
  },
});

export default HomeScreen;
