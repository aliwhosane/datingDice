import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import Dice from '../../atoms/Dice/Dice';
import { rollDice } from '../../../utils/diceRoll';

interface DiceRollerProps {
  onRoll: (value: number) => void;
  value: number;
  style?: ViewStyle;
}

const DiceRoller: React.FC<DiceRollerProps> = ({ onRoll, value, style }) => {
  const [isRolling, setIsRolling] = useState(false);

  const handlePress = () => {
    if (!isRolling) {
      setIsRolling(true);
      const newValue = rollDice(6);
      
      setTimeout(() => {
        onRoll(newValue);
        setTimeout(() => {
          setIsRolling(false);
        }, 800);
      }, 400);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Dice value={value} size={120} isRolling={isRolling} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default DiceRoller;