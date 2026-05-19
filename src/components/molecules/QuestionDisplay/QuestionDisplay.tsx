import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ViewStyle, Dimensions, Animated, Easing } from 'react-native';
import Card from '../../atoms/Card/Card';
import { CATEGORY_COLORS } from '../../../constants/colors';

interface QuestionDisplayProps {
  question: string | null;
  category?: string;
  style?: ViewStyle;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question, category, style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (question) {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }).start();
    }
  }, [question]);

  if (!question) return null;

  const backgroundColor = category ? CATEGORY_COLORS[category.toLowerCase() as keyof typeof CATEGORY_COLORS] : '#FFFFFF';

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.94, 1],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, 0.7, 1],
  });

  return (
    <Animated.View
      style={[
        styles.animatedContainer,
        {
          opacity,
          transform: [{ translateY }, { scale }],
        }
      ]}
    >
      <Card style={{ ...styles.container, backgroundColor, ...style }}>
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
      </Card>
    </Animated.View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  animatedContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: width * 0.88,
    height: height * 0.38,
    alignSelf: 'center',
    borderRadius: 36, // Rounded Material You expressive shape
    elevation: 8,
    shadowColor: '#1A111E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    marginVertical: 15,
    padding: 24,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.07)', // Soft dark transparent overlay
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '900',
    color: 'rgba(26, 17, 30, 0.7)', // High contrast aubergine color with opacity
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
    color: '#1A111E', // Dark aubergine text for perfect contrast on soft pastel cards
    fontSize: 23,
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: '700',
  },
});

export default QuestionDisplay;