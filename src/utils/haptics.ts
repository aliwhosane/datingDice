import { Vibration, Platform } from 'react-native';

/**
 * Triggers a short vibration suitable for a UI button tap or click.
 */
export const triggerTap = () => {
  if (Platform.OS === 'android') {
    Vibration.vibrate(8);
  } else {
    Vibration.vibrate(10);
  }
};

/**
 * Triggers a medium vibration suitable for when the dice starts spinning.
 */
export const triggerRollStart = () => {
  if (Platform.OS === 'android') {
    Vibration.vibrate(15);
  } else {
    Vibration.vibrate(20);
  }
};

/**
 * Triggers a double-pulse vibration pattern representing a physical landing.
 */
export const triggerRollLand = () => {
  // [delay, vibrate, delay, vibrate]
  Vibration.vibrate([0, 30, 80, 50]);
};

/**
 * Triggers a triple vibration pattern representing an error or cancel state.
 */
export const triggerError = () => {
  Vibration.vibrate([0, 60, 60, 60, 60, 60]);
};
