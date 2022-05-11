const isBefore = ({ firstDate, secondDate }) => {
  if (firstDate === undefined || firstDate.year === undefined) return true;
  if (secondDate === undefined || secondDate.year === undefined) return true;
  if (firstDate.year < secondDate.year) return true;
  if (firstDate.year > secondDate.year) return false;
  if (firstDate.month === undefined || secondDate.month === undefined) {
    return true;
  }
  if (firstDate.month < secondDate.month) return true;
  if (firstDate.month > secondDate.month) return false;
  if (firstDate.day === undefined || secondDate.day === undefined) {
    return true;
  }
  return firstDate.day <= secondDate.day;
}

const wasBornBefore = ({ person, date }) => {
  return isBefore({ firstDate: person.born, secondDate: date });
}

const filterByDate = ({ listOfPeople, date }) => {
  const peopleBornBefore = listOfPeople.filter((person) => {
    return wasBornBefore({ person, date });
  });
  const listCopy = peopleBornBefore.map((person) => {
    if (isBefore({ firstDate: person.died, secondDate: date })) {
      return { ...person };
    } else {
      return { ...person, died: undefined };
    }
  })
  return listCopy;
}
module.exports = { isBefore, wasBornBefore, filterByDate }