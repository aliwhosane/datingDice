import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TextInput, Pressable, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/atoms/Button/Button';
import { THEME_COLORS } from '../constants/colors';
import { triggerTap } from '../utils/haptics';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const [playMode, setPlayMode] = useState<'casual' | 'turns'>('casual');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const nameInputsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered entry animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse background circles (Headspace style)
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 4500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.92,
          duration: 4500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim, slideAnim, pulseAnim]);

  // Animate input fields when playMode changes
  useEffect(() => {
    Animated.spring(nameInputsAnim, {
      toValue: playMode === 'turns' ? 1 : 0,
      friction: 8,
      tension: 60,
      useNativeDriver: false,
    }).start();
  }, [playMode, nameInputsAnim]);

  const handleModeChange = (mode: 'casual' | 'turns') => {
    if (playMode !== mode) {
      triggerTap();
      Keyboard.dismiss(); // Dismiss keyboard to prevent resize visual conflicts
      setPlayMode(mode);
    }
  };

  const handleStartGame = () => {
    triggerTap();
    const playerNames = playMode === 'turns' ? [player1.trim(), player2.trim()] : undefined;
    navigation.navigate('Game' as never, { playerNames } as never);
  };

  // Determine if start is disabled (if in turns mode and either name is empty)
  const isStartDisabled = playMode === 'turns' && (player1.trim() === '' || player2.trim() === '');

  const nameInputsTranslateY = nameInputsAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-15, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Ambient background glows */}
      <Animated.View
        style={[
          styles.glowCircle,
          {
            transform: [{ scale: pulseAnim }],
            opacity: 0.12,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.glowCircle2,
          {
            transform: [{ scale: pulseAnim }],
            opacity: 0.08,
          },
        ]}
      />

      <Animated.View
        style={[
          styles.contentWrapper,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.logo}>🎲</Text>
        <Text style={styles.title}>Dating Dice</Text>
        <Text style={styles.subtitle}>Roll the dice for a fun conversation!</Text>

        {/* Mode Selector Toggle */}
        <View style={styles.toggleContainer}>
          <Pressable
            style={[styles.toggleButton, playMode === 'casual' && styles.toggleButtonActive]}
            onPress={() => handleModeChange('casual')}
          >
            <Text style={[styles.toggleText, playMode === 'casual' && styles.toggleTextActive]}>
              Casual Mode
            </Text>
          </Pressable>
          <Pressable
            style={[styles.toggleButton, playMode === 'turns' && styles.toggleButtonActive]}
            onPress={() => handleModeChange('turns')}
          >
            <Text style={[styles.toggleText, playMode === 'turns' && styles.toggleTextActive]}>
              Turn-Based
            </Text>
          </Pressable>
        </View>

        {/* Animated Input Fields */}
        <Animated.View
          style={[
            styles.inputsContainer,
            {
              opacity: nameInputsAnim,
              transform: [
                { translateY: nameInputsTranslateY },
                {
                  scale: nameInputsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.93, 1],
                    extrapolate: 'clamp',
                  }),
                },
              ],
              height: nameInputsAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 115], // Perfect tight fit for two text inputs and margins
                extrapolate: 'clamp',
              }),
            },
          ]}
          pointerEvents={playMode === 'turns' ? 'auto' : 'none'}
        >
          <TextInput
            style={styles.input}
            placeholder="Player 1 Name"
            placeholderTextColor={THEME_COLORS.textSecondary}
            value={player1}
            onChangeText={setPlayer1}
            maxLength={15}
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Player 2 Name"
            placeholderTextColor={THEME_COLORS.textSecondary}
            value={player2}
            onChangeText={setPlayer2}
            maxLength={15}
            autoCorrect={false}
          />
        </Animated.View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleStartGame}
            title="Start Game"
            disabled={isStartDisabled}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  glowCircle: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#E8809A', // Blush Rose glow
    top: '15%',
    left: '-15%',
  },
  glowCircle2: {
    position: 'absolute',
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: '#B8A3E3', // Soft lavender glow
    bottom: '10%',
    right: '-20%',
  },
  contentWrapper: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 84,
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 6 },
    textShadowRadius: 8,
  },
  title: {
    textAlign: 'center',
    color: THEME_COLORS.text,
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  subtitle: {
    textAlign: 'center',
    color: THEME_COLORS.textSecondary,
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 12,
    paddingHorizontal: 20,
    lineHeight: 26,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#261A2C',
    borderRadius: 25,
    padding: 4,
    width: '85%',
    maxWidth: 300,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#3D2D45',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#3D2D45',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: {
    color: THEME_COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: THEME_COLORS.text,
    fontWeight: '800',
  },
  inputsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  input: {
    width: '85%',
    maxWidth: 300,
    backgroundColor: '#261A2C',
    borderColor: '#3D2D45',
    borderWidth: 1.5,
    borderRadius: 16,
    color: THEME_COLORS.text,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 6,
    fontSize: 15,
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 16,
    alignItems: 'center',
  },
});

export default HomeScreen;
