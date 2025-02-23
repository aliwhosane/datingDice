import { StyleProp, ViewStyle } from 'react-native';

export interface DiceProps {
  value: number;
  size?: number;
  style?: StyleProp<ViewStyle>;
  isRolling?: boolean;
}