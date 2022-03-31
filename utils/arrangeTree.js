import areParentChild from "./areParentChild";
import getGridSize from "./getGridSize";

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
      while (isOccupied({ row: firstSpouse.row, col: firstSpouse.col + colOffset })) {
        colOffset += 2;
      };
      moveRelativeTo({
        remainingIndex, personOnGrid: firstSpouse, rowOffset: 0, colOffset,
      });
      return true;
    }
    return false;
  }
  const moveToParent = (remainingIndex) => {
    const personOutsideGrid = remaining[remainingIndex];
    if (personOutsideGrid.parents === undefined) {
      return false;
    }
    const parents = grid.filter((personOnGrid) => {
      return personOutsideGrid.parents.includes(personOnGrid.person.id);
    });
    if (parents.length > 0) {
      const parent = parents[0];
      const rowOffset = 2;
      let colOffset = parents.length - 1;
      while (isOccupied({ row: parent.row + rowOffset, col: parent.col + colOffset })) {
        colOffset += 2;
      }
      moveRelativeTo({
        remainingIndex, personOnGrid: parent, rowOffset, colOffset
      });
      return true;
    }
    return false;
  }
  let startingRow = 0;
  let startingCol = 0;
  while (remaining.length > 0) {
    moveToGrid({ remainingIndex: 0, row: startingRow, col: startingCol });
    let keepMatching = true;
    let remainingIndex = 0;
    while (keepMatching) {
      let changed = false;
      let foundSpouse = false;
      remainingIndex = 0;
      while (remainingIndex < remaining.length && !foundSpouse) {
        foundSpouse = moveToSpouse(remainingIndex);
        if (foundSpouse) {
          changed = true;
        }
        remainingIndex += 1;
      }
      let foundChild = false;
      remainingIndex = 0;
      while (remainingIndex < remaining.length && !foundChild) {
        foundChild = moveToParent(remainingIndex);
        if (foundChild) {
          changed = true;
        }
        remainingIndex += 1;
      }
      keepMatching = changed;
    }
    const { maxCol } = getGridSize(grid)
    startingCol = maxCol + 1;
  }
  return grid;
};
export default arrangeTree;