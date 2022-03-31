import data from '../pages/API/data.json';

const lookupPerson = (personNumber) => {
  const withMatchingId = data.filter((person) => {
    const isEqual = (person.id == personNumber);
    return isEqual;
  });
  if (withMatchingId.length > 0) {
    return withMatchingId[0];
  }
  return undefined;
};
export default lookupPerson;
