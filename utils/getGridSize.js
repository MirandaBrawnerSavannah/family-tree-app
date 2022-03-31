const getGridSize = (grid) => {
  let minRow = undefined;
  let maxRow = undefined;
  let minCol = undefined;
  let maxCol = undefined;
  grid.forEach((personOnGrid) => {
    const { row, col } = personOnGrid;
    if (minRow === undefined || row < minRow) {
      minRow = row;
    }
    if (maxRow === undefined || row > maxRow) {
      maxRow = row;
    }
    if (minCol === undefined || col < minCol) {
      minCol = col;
    }
    if (maxCol === undefined || col > maxCol) {
      maxCol = col;
    }
  });
  return { minRow, maxRow, minCol, maxCol };
}
export default getGridSize;