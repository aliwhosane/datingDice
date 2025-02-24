import React, { useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
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
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

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
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setHasRolled(true);
      });
    }
  };

  return (
    <GameTemplate style={styles.container}>
      <View style={styles.gameWrapper}>
        {!hasRolled && (
          <Animated.View style={[styles.messageContainer, { opacity: fadeAnim }]}>
            <Text style={styles.rollMessage}>🎲 Ready to Roll?</Text>
            <Text style={styles.rollSubMessage}>Tap the dice to start your adventure!</Text>
          </Animated.View>
        )}
        <View style={styles.diceContainer}>
          <Game style={styles.content} onDiceTap={handleDiceTap} />
        </View>
      </View>
    </GameTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  gameWrapper: {
    flex: 1,
    position: 'relative',
  },
  content: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  diceContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    margin: 20,
  },
  rollMessage: {
    fontSize: 28,
    fontWeight: 'bold',
    color: THEME_COLORS.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  rollSubMessage: {
    fontSize: 18,
    color: THEME_COLORS.text,
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default GameScreen;