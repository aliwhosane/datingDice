import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, ViewStyle, Easing, Text } from 'react-native';
import { CATEGORIES } from '../../../constants/categories';
import { CATEGORY_COLORS } from '../../../constants/colors';

interface DiceProps {
  value: number;
  size?: number;
  style?: ViewStyle;
  isRolling?: boolean;
}

const Dice: React.FC<DiceProps> = ({ value, size = 120, style, isRolling }) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const scaleXValue = useRef(new Animated.Value(1)).current;
  const scaleYValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRolling) {
      spinValue.setValue(0);
      scaleXValue.setValue(1);
      scaleYValue.setValue(1);

      Animated.parallel([
        // scaleX Squish and Stretch
        Animated.sequence([
          Animated.timing(scaleXValue, {
            toValue: 1.25, // Squash (wider)
            duration: 150,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
          Animated.timing(scaleXValue, {
            toValue: 0.8, // Stretch (thinner in air)
            duration: 200,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad),
          }),
          Animated.timing(scaleXValue, {
            toValue: 1.1, // Wobble
            duration: 200,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.spring(scaleXValue, {
            toValue: 1, // Soft landing rebound
            friction: 4,
            tension: 80,
            useNativeDriver: true,
          }),
        ]),

        // scaleY Squish and Stretch
        Animated.sequence([
          Animated.timing(scaleYValue, {
            toValue: 0.7, // Squash (flatter)
            duration: 150,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
          Animated.timing(scaleYValue, {
            toValue: 1.3, // Stretch (elongated in air)
            duration: 200,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad),
          }),
          Animated.timing(scaleYValue, {
            toValue: 0.95, // Wobble
            duration: 200,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.spring(scaleYValue, {
            toValue: 1, // Soft landing rebound
            friction: 4,
            tension: 80,
            useNativeDriver: true,
          }),
        ]),

        // Spin
        Animated.timing(spinValue, {
          toValue: 4,
          duration: 750,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.5)), // Bouncy wind-down
        }),
      ]).start();
    }
  }, [isRolling, scaleXValue, scaleYValue, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 4],
    outputRange: ['0deg', '1440deg'],
  });

  const renderCategory = () => {
    const categoryKeys = Object.keys(CATEGORIES);
    const categoryIndex = (value - 1) % categoryKeys.length;
    const category = categoryKeys[categoryIndex];
    const categoryColor = category
      ? CATEGORY_COLORS[category.toLowerCase() as keyof typeof CATEGORY_COLORS]
      : '#E8809A'; // Primary Rose Accent for "TAP"

    const text = category?.toUpperCase() || 'ROLL';
    const baseFontSize = size * 0.11;
    // Prevent wrapping of long text by adjusting font size dynamically based on length
    const dynamicFontSize = text.length > 8
      ? baseFontSize * (8 / text.length)
      : baseFontSize;

    return (
      <View style={styles.contentContainer}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
          style={[
            styles.categoryText,
            {
              fontSize: dynamicFontSize,
              color: categoryColor,
              width: '100%',
            },
          ]}
        >
          {text}
        </Text>
        {!category && (
          <Text style={[styles.tapLabel, { color: categoryColor }]}>
            🎲
          </Text>
        )}
      </View>
    );
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          transform: [
            { rotate: spin },
            { scaleX: scaleXValue },
            { scaleY: scaleYValue },
          ],
        },
        style,
      ]}
    >
      {renderCategory()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28, // Rounded Material-You card shape
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#1A111E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    borderWidth: 4,
    borderColor: '#F3E9F8',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  categoryText: {
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  tapLabel: {
    fontSize: 22,
    marginTop: 6,
  },
});

export default Dice;
