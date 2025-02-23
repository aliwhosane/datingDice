import { StyleProp, ViewStyle } from 'react-native';

export interface DiceRollerProps {
  onRoll: (value: number) => void;
  style?: StyleProp<ViewStyle>;
}