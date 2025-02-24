import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DiceRoller from '../../molecules/DiceRoller/DiceRoller';
import QuestionDisplay from '../../molecules/QuestionDisplay/QuestionDisplay';
import LoadingIndicator from '../../atoms/LoadingIndicator/LoadingIndicator';
import { getRandomQuestion, QuestionError } from '../../../utils/getRandomQuestion';
import { CATEGORIES } from '../../../constants/categories';
import { THEME_COLORS } from '../../../constants/colors';

const GameScreenOrganism: React.FC<{ style?: React.CSSProperties; onDiceTap: () => void }> = ({ style, onDiceTap }) => {
  const [diceValue, setDiceValue] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<{ text: string; category: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoll = (value: number) => {
    setError(null);
    setIsLoading(true);
    setDiceValue(value);

    setTimeout(() => {
      try {
        const question = getRandomQuestion(value);
        const categoryKeys = Object.keys(CATEGORIES);
        const categoryIndex = (value - 1) % categoryKeys.length;
        const category = categoryKeys[categoryIndex];
        
        setCurrentQuestion({
          text: question.text,
          category: category
        });
      } catch (err) {
        setError(err instanceof QuestionError ? err.message : 'An unexpected error occurred');
        setCurrentQuestion(null);
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    // Call the onDiceTap function when the dice is rolled
    onDiceTap();
  };

  return (
    <View style={[styles.container, style as any]}>
      <View style={styles.content}>
        <View style={styles.diceSection}>
          <DiceRoller onRoll={handleRoll} value={diceValue} />
        </View>
        <View style={styles.questionSection}>
          {isLoading ? (
            <LoadingIndicator />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <QuestionDisplay 
              question={currentQuestion?.text || null}
              category={currentQuestion?.category}
              style={styles.questionCard}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  diceSection: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    paddingTop: 40,
  },
  questionSection: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  questionCard: {
    width: '100%',
    flex: 1,
    marginBottom: 40,
  },
  errorText: {
    color: THEME_COLORS.error,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default GameScreenOrganism;