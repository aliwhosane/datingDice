import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import GameTemplate from '../components/templates/GameTemplate/GameTemplate';
import GameScreenOrganism from '../components/organisms/GameScreen/GameScreen';
import { THEME_COLORS } from '../constants/colors';
import { useLayoutEffect } from 'react';

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
};

interface GameScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Game'>;
}

const GameScreen: React.FC<GameScreenProps> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerStyle: {
        backgroundColor: THEME_COLORS.background,
      },
    });
  }, [navigation]);

  return (
    <GameTemplate style={styles.container}>
      <GameScreenOrganism style={styles.content} />
    </GameTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});

export default GameScreen;