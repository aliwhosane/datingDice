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
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRolling) {
      spinValue.setValue(0);
      scaleValue.setValue(1);
      
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 0.8,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
          Animated.timing(scaleValue, {
            toValue: 1.2,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.bounce,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.bounce,
          }),
        ]),
        Animated.timing(spinValue, {
          toValue: 4,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
      ]).start();
    }
  }, [isRolling]);

  const spin = spinValue.interpolate({
    inputRange: [0, 4],
    outputRange: ['0deg', '1440deg'],
  });

  const renderCategory = () => {
    const categoryKeys = Object.keys(CATEGORIES);
    const categoryIndex = (value - 1) % categoryKeys.length;
    const category = categoryKeys[categoryIndex];
    const categoryColor = CATEGORY_COLORS[category?.toLowerCase() as keyof typeof CATEGORY_COLORS];

    return (
      <View style={styles.contentContainer}>
        <Text 
          style={[
            styles.categoryText,
            { 
              fontSize: size * 0.10,
              color: categoryColor,
            }
          ]}
        >
          {category?.toUpperCase()}
        </Text>
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
            { scale: scaleValue },
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
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    letterSpacing: 1,
  },
});

export default Dice;