
const arrangeTree = (people) => {
  if (people.length === 0) return [];
  const grid = [];
  const remaining = [...people];
  const moveToGrid = ({ remainingIndex, row, col }) => {
    const person = remaining[remainingIndex];
    grid.push({ person, row, col });
    remaining.splice(remainingIndex, 1);
  };
  const moveRelativeTo = ({ remainingIndex, personOnGrid, rowOffset, colOffset }) => {
    moveToGrid({
      remainingIndex,
      row: personOnGrid.row + rowOffset,
      col: personOnGrid.col + colOffset,
    });
  }
  const isOccupied = ({ row, col }) => {
    const matches = grid.filter(
      (personOnGrid) => personOnGrid.row == row && personOnGrid.col == col
    );
    return matches.length > 0;
  }
  const moveToSpouse = (remainingIndex) => {
    const personOutsideGrid = remaining[remainingIndex];
    if (personOutsideGrid.marriedTo === undefined) {
      return false;
    }
    const spouseIds = personOutsideGrid.marriedTo.map((marriage) => marriage.spouse);
    const spouses = grid.filter((personOnGrid) => {
      return spouseIds.includes(personOnGrid.person.id);
    });
    if (spouses.length > 0) {
      const firstSpouse = spouses[0];
      let colOffset = 2;
      while (isOccupied(firstSpouse.row, firstSpouse.col + colOffset)) {
        colOffset += 2;
      };
      moveRelativeTo({
        remainingIndex, personOnGrid: firstSpouse, rowOffset: 0, colOffset,
      });
      return true;
    }
    return false;
  }
  let startingRow = 0;
  let startingCol = 0;
  while (remaining.length > 0) {
    moveToGrid({ remainingIndex: 0, row: startingRow, col: startingCol });
    let changed = false;
    let remainingIndex = 0;
    while (remainingIndex < remaining.length && !changed) {
      changed = moveToSpouse(remainingIndex);
      remainingIndex += 1;
    }
    startingRow += 1;
  }
  return grid;
};
export default arrangeTree;