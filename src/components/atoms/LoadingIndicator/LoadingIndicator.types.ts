import { StyleProp, ViewStyle } from 'react-native';

export interface LoadingIndicatorProps {
  size?: 'small' | 'large';
  color?: string;
  style?: StyleProp<ViewStyle>;
}