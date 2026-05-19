import React, { useState, useEffect, useRef } from 'react';
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
  const overlayScale = useRef(new Animated.Value(0.8)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    // Spring in the welcome card on mount
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(overlayScale, {
        toValue: 1,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleDiceTap = () => {
    if (!hasRolled) {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.spring(overlayScale, {
          toValue: 0.85,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        })
      ]).start(() => {
        setHasRolled(true);
      });
    }
  };

  return (
    <GameTemplate style={styles.container}>
      <View style={styles.gameWrapper}>
        {!hasRolled && (
          <Animated.View
            style={[
              styles.messageCard,
              {
                opacity: overlayOpacity,
                transform: [{ scale: overlayScale }],
              },
            ]}
          >
            <Text style={styles.cardEmoji}>🎲</Text>
            <Text style={styles.rollMessage}>Ready to Roll?</Text>
            <Text style={styles.rollSubMessage}>
              Tap the dice at the bottom to kick off your conversation!
            </Text>
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
  messageCard: {
    position: 'absolute',
    top: '20%',
    alignSelf: 'center',
    width: '88%',
    zIndex: 10,
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#261A2C', // Soft Amethyst surface
    borderRadius: 36, // Highly rounded shape
    borderWidth: 2,
    borderColor: '#E8809A', // Blush Rose border
    shadowColor: '#1A111E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  cardEmoji: {
    fontSize: 54,
    marginBottom: 16,
    textAlign: 'center',
  },
  rollMessage: {
    fontSize: 26,
    fontWeight: '900',
    color: '#F3E9F8',
    textAlign: 'center',
    marginBottom: 10,
  },
  rollSubMessage: {
    fontSize: 16,
    color: '#A392A7',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default GameScreen;