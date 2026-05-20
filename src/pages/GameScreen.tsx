import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Pressable } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import GameTemplate from '../components/templates/GameTemplate/GameTemplate';
import Game from '../components/organisms/Game/Game';
import { THEME_COLORS } from '../constants/colors';
import { useLayoutEffect } from 'react';
import { triggerTap } from '../utils/haptics';

type RootStackParamList = {
  Home: undefined;
  Game: {
    playerNames?: string[];
  };
};

const GameScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Game'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Game'>>();
  const playerNames = route.params?.playerNames;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [hasRolled, setHasRolled] = useState(false);

  const overlayScale = useRef(new Animated.Value(0.8)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const turnScaleAnim = useRef(new Animated.Value(1)).current;

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
      }),
    ]).start();
  }, [overlayOpacity, overlayScale]);

  // Animate the turn banner when player index changes
  useEffect(() => {
    if (playerNames && playerNames.length > 0) {
      turnScaleAnim.setValue(0.9);
      Animated.spring(turnScaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 120,
        useNativeDriver: true,
      }).start();
    }
  }, [currentPlayerIndex, playerNames, turnScaleAnim]);

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
        }),
      ]).start(() => {
        setHasRolled(true);
      });
    } else if (playerNames && playerNames.length > 0) {
      // Toggle turns on subsequent rolls
      setCurrentPlayerIndex((prev) => (prev + 1) % playerNames.length);
    }
  };

  const handleBack = () => {
    triggerTap();
    navigation.goBack();
  };

  return (
    <GameTemplate style={styles.container}>
      <View style={styles.gameWrapper}>
        {/* Header Bar with Turn Indicator & Back Button */}
        <View style={styles.headerContainer}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>

          {playerNames && playerNames.length > 0 ? (
            <Animated.View style={[styles.turnBanner, { transform: [{ scale: turnScaleAnim }] }]}>
              <Text style={styles.turnText}>
                {playerNames[currentPlayerIndex]}'s Turn
              </Text>
            </Animated.View>
          ) : (
            <View style={styles.turnBanner}>
              <Text style={styles.turnText}>Dating Dice</Text>
            </View>
          )}

          <View style={styles.headerPlaceholder} />
        </View>

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
              {playerNames && playerNames.length > 0
                ? `${playerNames[0]}, tap the dice below to start your turn!`
                : 'Tap the dice at the bottom to kick off your conversation!'}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
    marginTop: 8,
    marginBottom: 8,
    zIndex: 20,
  },
  backButton: {
    backgroundColor: 'rgba(38, 26, 44, 0.6)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3D2D45',
  },
  backButtonText: {
    color: '#F3E9F8',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  headerPlaceholder: {
    width: 40,
  },
  turnBanner: {
    backgroundColor: 'rgba(38, 26, 44, 0.75)',
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#E8809A', // Blush Rose border
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  turnText: {
    color: '#F3E9F8',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.5,
    textAlign: 'center',
    textTransform: 'uppercase',
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
