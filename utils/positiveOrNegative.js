/* Coin toss. 50% chance of returning 1, 50% chance of -1 */
const positiveOrNegative = () => {
  return 2 * Math.floor(Math.random() * 2) - 1;
};
export default positiveOrNegative;