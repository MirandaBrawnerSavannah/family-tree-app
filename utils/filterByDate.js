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

const updateMarriageEndDate = ({ marriage, date }) => {
  if (isBefore({ firstDate: date, secondDate: marriage.endDate })) {
    return { ...marriage, endDate: undefined };
  }
  return marriage;
}

const filterMarriages = ({ person, date }) => {
  const marriages = person.marriedTo;
  if (marriages) {
    const filteredMarriages = marriages
      .map((marriage) => updateMarriageEndDate({ marriage, date }))
      .filter((marriage) => isBefore(
        { firstDate: marriage.startDate, secondDate: date }
      ));
    return { ...person, marriedTo: filteredMarriages };
  }
  return person; 
}

const filterByDate = ({ listOfPeople, date }) => {
  const peopleBornBefore = listOfPeople.filter((person) => {
    return wasBornBefore({ person, date });
  });
  const listCopy = peopleBornBefore.map((person) => {
    const personAtTime = filterMarriages({ person, date });
    if (isBefore({ firstDate: person.died, secondDate: date })) {
      return { ...personAtTime };
    } else {
      return { ...personAtTime, died: undefined };
    }
  })
  return listCopy;
}
module.exports = { isBefore, wasBornBefore, filterByDate }