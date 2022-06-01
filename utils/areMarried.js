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
        console.log(`${firstPerson.fullName} and ${secondPerson.fullName}`
        + ` got married in ${nextMarriage.startDate.year}.`)
        if (nextMarriage.endDate) {
          console.log(`Their marriage ended in ${nextMarriage.endDate.year}.`);
        }
        console.log('-----');
        marriedNow = true;
      }
      if (nextMarriage.endDate && isBefore({ firstDate: nextMarriage.endDate, secondDate: date })) {
        console.log(`Marriage ended in ${JSON.stringify(nextMarriage.endDate)}`);
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
