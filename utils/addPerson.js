const addPerson = ({ person, data }) => {
  const copyOfData = [...data];
  copyOfData.push(person);
  return copyOfData;
};
export default addPerson;
