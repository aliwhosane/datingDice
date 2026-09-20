import { Vibration, Platform } from 'react-native';

/**
 * iOS ignores the duration argument to Vibration.vibrate() entirely: any call
 * fires the full-strength ~400ms system vibration. Using it for lightweight UI
 * feedback (button taps, roll start) is jarring and drains battery, so on iOS
 * we reserve vibration for the single "payoff" moment when the dice lands.
 * Android honours the requested durations, so it keeps the finer-grained feel.
 */
const isAndroid = Platform.OS === 'android';

/**
 * Triggers a short vibration suitable for a UI button tap or click.
 */
export const triggerTap = () => {
  if (isAndroid) {
    Vibration.vibrate(8);
  }
};

/**
 * Triggers a medium vibration suitable for when the dice starts spinning.
 */
export const triggerRollStart = () => {
  if (isAndroid) {
    Vibration.vibrate(15);
  }
};

/**
 * Triggers a double-pulse vibration pattern representing a physical landing.
 */
export const triggerRollLand = () => {
  if (isAndroid) {
    // [delay, vibrate, delay, vibrate]
    Vibration.vibrate([0, 30, 80, 50]);
  } else {
    Vibration.vibrate();
  }
};

/**
 * Triggers a triple vibration pattern representing an error or cancel state.
 */
export const triggerError = () => {
  if (isAndroid) {
    Vibration.vibrate([0, 60, 60, 60, 60, 60]);
  } else {
    Vibration.vibrate();
  }
};
