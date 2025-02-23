import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Dimensions } from 'react-native';
import Card from '../../atoms/Card/Card';
import { CATEGORY_COLORS, THEME_COLORS } from '../../../constants/colors';

interface QuestionDisplayProps {
  question: string | null;
  category?: string;
  style?: ViewStyle;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question, category, style }) => {
  if (!question) return null;

  const backgroundColor = category ? CATEGORY_COLORS[category.toLowerCase() as keyof typeof CATEGORY_COLORS] : '#FFFFFF';

  return (
    <Card style={{ ...styles.container, backgroundColor, ...style }}>
      {category && (
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>
            {category.toUpperCase()}
          </Text>
          <View style={styles.categoryUnderline} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.questionText}>
          {question}
        </Text>
      </View>
    </Card>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME_COLORS.surface,
    width: width * 0.9,
    height: height * 0.4,
    alignSelf: 'center',
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginVertical: 20,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#303030',
    letterSpacing: 2,
    marginBottom: 8,
  },
  categoryUnderline: {
    width: 40,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  questionText: {
    color: THEME_COLORS.text,
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default QuestionDisplay;