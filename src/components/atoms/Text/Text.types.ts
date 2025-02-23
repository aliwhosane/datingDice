import { StyleProp, TextStyle } from 'react-native';
import { ReactNode } from 'react';

export type Variant = 'heading' | 'body' | 'small';

export interface TextProps {
  children: ReactNode;
  variant?: Variant;
  style?: StyleProp<TextStyle>;
}