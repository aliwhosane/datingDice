import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { CATEGORY_COLORS } from '../../../constants/colors';

interface QuestionDisplayProps {
  question: string | null;
  category?: string;
  isRolling?: boolean;
  style?: any;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question, category, isRolling, style }) => {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const pulseScale = useRef(new Animated.Value(1)).current;

  // Pulse animation for the card back while rolling
  useEffect(() => {
    let animation: Animated.CompositeAnimation | null = null;

    if (isRolling) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseScale, {
            toValue: 1.25,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseScale, {
            toValue: 0.95,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
    } else {
      pulseScale.setValue(1);
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [isRolling, pulseScale]);

  // Card flip control
  useEffect(() => {
    if (isRolling) {
      // Flip back to face-down (0 degrees)
      Animated.spring(flipAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
    } else if (question) {
      // Flip to face-up (180 degrees)
      Animated.spring(flipAnim, {
        toValue: 180,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }
  }, [isRolling, question, flipAnim]);

  // Interpolate rotation values
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
    extrapolate: 'clamp',
  });

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
    extrapolate: 'clamp',
  });

  // Cross-fade opacity at the halfway point (90 degrees) to prevent flickering on Android
  const backOpacity = flipAnim.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const cardColor = category
    ? CATEGORY_COLORS[category.toLowerCase() as keyof typeof CATEGORY_COLORS]
    : '#FFFFFF';

  return (
    <View style={[styles.cardContainer, style]}>
      {/* CARD BACK (Face Down - shown while rolling) */}
      <Animated.View
        style={[
          styles.cardBack,
          {
            opacity: backOpacity,
            transform: [
              { perspective: 1000 },
              { rotateY: backInterpolate },
            ],
          },
        ]}
      >
        <Animated.Text style={[styles.cardBackEmoji, { transform: [{ scale: pulseScale }] }]}>
          🎲
        </Animated.Text>
        <Text style={styles.cardBackTitle}>ROLLING...</Text>
        <Text style={styles.cardBackSubtitle}>Get ready to answer!</Text>
      </Animated.View>

      {/* CARD FRONT (Face Up - shown when question lands) */}
      <Animated.View
        style={[
          styles.cardFront,
          {
            backgroundColor: cardColor,
            opacity: frontOpacity,
            transform: [
              { perspective: 1000 },
              { rotateY: frontInterpolate },
            ],
          },
        ]}
      >
        {category && (
          <View style={styles.categoryPill}>
            <Text style={styles.categoryText}>
              {category.toUpperCase()}
            </Text>
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.questionText}>
            {question}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.88,
    height: height * 0.38,
    alignSelf: 'center',
    position: 'relative',
    marginVertical: 15,
    zIndex: 10,
    elevation: 10,
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#261A2C', // Soft Amethyst surface
    borderRadius: 36,
    borderWidth: 3,
    borderColor: '#E8809A', // Blush Rose border
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#1A111E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
  },
  cardBackEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  cardBackTitle: {
    color: '#F3E9F8',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2.5,
    textAlign: 'center',
    marginBottom: 6,
  },
  cardBackSubtitle: {
    color: '#A392A7',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardFront: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 36,
    padding: 24,
    justifyContent: 'space-between',
    elevation: 8,
    shadowColor: '#1A111E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '900',
    color: 'rgba(26, 17, 30, 0.7)',
    letterSpacing: 2,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  questionText: {
    color: '#1A111E',
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: '700',
  },
});

export default QuestionDisplay;
