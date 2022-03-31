const compareByAge = (firstPerson, secondPerson) => {
  if (
    firstPerson === undefined || secondPerson === undefined
    || firstPerson.born === undefined || secondPerson.born === undefined
    || firstPerson.born.year === undefined
    || secondPerson.born.year === undefined
  ) {
    return 0;
  }
  const yearDiff = firstPerson.born.year - secondPerson.born.year;
  if (yearDiff !== 0) return yearDiff;
  if (
    firstPerson.born.month === undefined
    || secondPerson.born.month === undefined
  ) {
    return 0;
  } 
  const monthDiff = firstPerson.born.month - secondPerson.born.month;
  if (monthDiff !== 0) return monthDiff;
  if (
    firstPerson.born.day === undefined
    || secondPerson.born.day === undefined
  ) {
    return 0;
  } 
  return firstPerson.born.day - secondPerson.born.day;
};
const sortByAge = (list) => {
  return list.sort(compareByAge);
}
const sortPeople = ({ list, sortBy }) => {
  if (sortBy === 'age') {
    return sortByAge(list);
  }
  return list;
};
export default sortPeople;