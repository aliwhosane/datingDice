import { StyleProp, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}