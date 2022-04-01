const removeFromTree = ({ personId, data }) => {
  const copyOfData = [...data];
  data.forEach((nextPerson, index) => {
    if (nextPerson.id === personId) {
      copyOfData.splice(index);
    }
  });
  copyOfData.forEach((nextPerson) => {
    if (nextPerson.children) {
      const newChildList = [...nextPerson.children];
      nextPerson.children.forEach((childId, index) => {
        if (index < newChildList.length && newChildList[index] === personId) {
          newChildList.splice(index);
        }
      });
      nextPerson.children = newChildList;
    };
    if (nextPerson.parents) {
      const newParentList = [...nextPerson.parents];
      nextPerson.parents.forEach((parentId, index) => {
        if (index < newParentList.length && newParentList[index] === personId) {
          newParentList.splice(index);
        }
      });
      nextPerson.parents = newParentList;
    };
    /* if (nextPerson.marriedTo) {
      const newMarriageList = [...nextPerson.marriedTo];
      nextPerson.marriedTo.forEach((marriage, index) => {
        if (index < newMarriageList.length && newMarriageList[index].spouse === personId) {
          newMarriageList.splice(index);
        }
      });
      nextPerson.marriedTo = newMarriageList;
    } */
  });
  return copyOfData;
};
export default removeFromTree;
