import { isBefore } from './filterByDate';

export const getMarriageStatus = ({ firstPerson, secondPerson, date }) => {
  if (firstPerson.marriedTo === undefined) {
    return false;
  }
  let marriedEver = false;
  let marriedNow = false;
  let marriedPast = false;
  firstPerson.marriedTo.forEach((nextMarriage) => {
    if (nextMarriage.spouse === secondPerson.id) {
      marriedEver = true;
      if (isBefore({ firstDate: nextMarriage.startDate, secondDate: date })
      && isBefore({ firstDate: date, secondDate: nextMarriage.endDate })) {
        marriedNow = true;
      }
      if (nextMarriage.endDate && isBefore({ firstDate: nextMarriage.endDate, secondDate: date })) {
        marriedPast = true;
      }
    }
  });
  if (marriedEver) {
    if (marriedNow) {
      return 'present';
    }
    if (marriedPast) {
      return 'past'
    }
    return 'future';
  }
  return 'never';
};
const wereEverMarried = (firstPerson, secondPerson) => {
  return getMarriageStatus({ firstPerson, secondPerson }) !== 'never';
};
export const areMarried = ({ firstPerson, secondPerson, date }) => {
  return getMarriageStatus({ firstPerson, secondPerson, date }) === 'present';
}
export const areNoLongerMarried = ({ firstPerson, secondPerson, date }) => {
  return getMarriageStatus({ firstPerson, secondPerson, date }) === 'past';
}
export default wereEverMarried;
