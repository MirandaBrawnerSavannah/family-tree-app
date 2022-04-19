const getNextAvailableID = (data) => {
  let maxID = undefined;
  data.forEach((person) => {
    if (maxID === undefined || person.id > maxID) {
      maxID = person.id;
    }
  });
  if (maxID === undefined) {
    return 0;
  }
  return maxID + 1;
};
export default getNextAvailableID;
