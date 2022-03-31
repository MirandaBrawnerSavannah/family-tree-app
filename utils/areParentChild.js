const areParentChild = ({ parent, child }) => {
  if (child.parents === undefined) {
    return false;
  }
  return child.parents.includes(parent.id);
};
export default areParentChild;