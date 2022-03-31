const areFullSiblings = (firstPerson, secondPerson) => {
  const firstParents = firstPerson.parents;
  const secondParents = secondPerson.parents;
  if (firstParents === undefined || secondParents === undefined) {
    return false;
  }
  if (firstParents.length !== secondParents.length) {
    return false;
  }
  const matchingSoFar = true;
  firstParents.forEach((parent) => {
    if (!secondParents.includes(parent)) {
      matchingSoFar = false;
    }
  });
  return matchingSoFar;
};
export default areFullSiblings;
