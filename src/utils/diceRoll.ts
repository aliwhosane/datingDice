export const rollDice = (sides: number = 6): number => {
  return Math.floor(Math.random() * sides) + 1;
};

export const getRandomRotation = () => {
  return Math.floor(Math.random() * 4) * 90;
};
