const addPerson = ({ newPerson, data }) => {
  const copyOfData = [...data];
  copyOfData.forEach((currentPerson) => {
    if (newPerson.parents && newPerson.parents.includes(currentPerson.id)) {
      if (!(currentPerson.children)) {
        currentPerson.children = [];
      }
      currentPerson.children.push(newPerson.id);
    }
    if (newPerson.children && newPerson.children.includes(currentPerson.id)) {
      if (!(currentPerson.parents)) {
        currentPerson.parents = [];
      }
      currentPerson.parents.push(newPerson.id);
    }
    if (newPerson.marriedTo) {
      newPerson.marriedTo
      .filter((marriage) => marriage.spouse == currentPerson.id)
      .forEach((marriage) => {
        if (!(currentPerson.marriedTo)) {
          currentPerson.marriedTo = [];
        }
        currentPerson.marriedTo.push({
          spouse: newPerson.id,
        });
      });
    }
  });
  copyOfData.push(newPerson);
  return copyOfData;
};
export default addPerson;
