import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/atoms/Button/Button';
import { THEME_COLORS } from '../constants/colors';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

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
  }, []);

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
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate('Game' as never)}
            title="Start Game"
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
    marginVertical: 18,
    paddingHorizontal: 20,
    lineHeight: 26,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
});

export default HomeScreen;
