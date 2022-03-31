const areMarried = (firstPerson, secondPerson) => {
  if (firstPerson.marriedTo === undefined) {
    return false;
  }
  const firstSpouses = firstPerson.marriedTo.map((marriage) => marriage.spouse);
  let married = false;
  firstSpouses.forEach((spouse) => {
    if (spouse === secondPerson.id) {
      married = true;
    }
  });
  return married;
};
export default areMarried;