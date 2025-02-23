import 'styled-components';
import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      background: string;
      text: string;
    };
  }
}