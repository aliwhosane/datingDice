import { CATEGORIES } from '../constants/categories';
import { QUESTIONS } from '../constants/questions';

export class QuestionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuestionError';
  }
}

export const getRandomQuestion = (diceRoll: number) => {
  try {
    if (!diceRoll || diceRoll < 1 || diceRoll > 6) {
      throw new QuestionError('Invalid dice roll value');
    }

    const categoryKeys = Object.keys(CATEGORIES);
    const categoryIndex = (diceRoll - 1) % categoryKeys.length;
    const category = categoryKeys[categoryIndex];
    
    const questions = QUESTIONS[category as keyof typeof QUESTIONS];
    if (!questions || questions.length === 0) {
      throw new QuestionError(`No questions available for category: ${category}`);
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  } catch (error) {
    throw new QuestionError(error instanceof Error ? error.message : 'Failed to get question');
  }
};