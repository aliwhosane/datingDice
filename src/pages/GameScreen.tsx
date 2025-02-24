import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import GameTemplate from '../components/templates/GameTemplate/GameTemplate';
import Game from '../components/organisms/Game/Game';
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
  const [hasRolled, setHasRolled] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerStyle: {
        backgroundColor: THEME_COLORS.background,
      },
    });
  }, [navigation]);

  const handleDiceTap = () => {
    if (!hasRolled) {
      setHasRolled(true);
    }
    // Add any additional logic for dice tap here
  };

  return (
    <GameTemplate style={styles.container}>
      {!hasRolled && (
        <Text style={styles.rollMessage}>Tap the dice to start playing!</Text>
      )}
      <Game style={styles.content} onDiceTap={handleDiceTap} />
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
  rollMessage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontSize: 18,
    color: THEME_COLORS.text,
    textAlign: 'center',
  },
});

export default GameScreen;