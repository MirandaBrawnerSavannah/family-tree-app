const lookupPerson = ({ personNumber, data }) => {
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
