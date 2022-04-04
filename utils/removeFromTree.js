export const removeOnePersonFromTree = ({ personId, data }) => {
  const copyOfData = [...data];
  data.forEach((nextPerson, index) => {
    if (nextPerson.id === personId) {
      copyOfData.splice(index, 1);
    }
  });
  copyOfData.forEach((nextPerson) => {
    if (nextPerson.children) {
      const newChildList = [...nextPerson.children];
      nextPerson.children.forEach((childId, index) => {
        if (index < newChildList.length && newChildList[index] === personId) {
          newChildList.splice(index, 1);
        }
      });
      nextPerson.children = newChildList;
    }
    if (nextPerson.parents) {
      const newParentList = [...nextPerson.parents];
      nextPerson.parents.forEach((parentId, index) => {
        if (index < newParentList.length && newParentList[index] === personId) {
          newParentList.splice(index, 1);
        }
      });
      nextPerson.parents = newParentList;
    }
    if (nextPerson.marriedTo) {
      const newMarriageList = [...nextPerson.marriedTo];
      nextPerson.marriedTo.forEach((marriage, index) => {
        if (index < newMarriageList.length && newMarriageList[index].spouse === personId) {
          newMarriageList.splice(index, 1);
        }
      });
      nextPerson.marriedTo = newMarriageList;
    }
  });
  return copyOfData;
};
const removeFromTree = (data) => {
  let copyOfData = [...data];
  const idsToRemove = copyOfData.filter((person) => person.markedForDeletion)
    .map((person) => person.id);
  idsToRemove.forEach((personId) => {
    copyOfData = removeOnePersonFromTree({ personId, data: copyOfData });
  });
  return copyOfData;
};
export default removeFromTree;
