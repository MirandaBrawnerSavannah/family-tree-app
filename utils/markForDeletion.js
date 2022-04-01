const markForDeletion = ({ personId, data }) => {
  const copyOfData = [...data];
    data.forEach((nextPerson, index) => {
    if (nextPerson.id == personId) {
      copyOfData[index].markedForDeletion = true;
    }
  });
  return copyOfData;
};
export default markForDeletion;
