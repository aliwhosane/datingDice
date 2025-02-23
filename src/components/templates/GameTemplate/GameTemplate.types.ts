import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface GameTemplateProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onGoBack: () => void;
}