import { Fragment } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'; 
import data from '../pages/API/data.json';
import treeStyles from './Tree.module.css';
import sortPeople from '../utils/sortPeople';
import arrangeTree from '../utils/arrangeTree';
import getGridSize from '../utils/getGridSize';

const Tree = () => {
  const router = useRouter();
  const { locale } = router.query;
  const sortedList = sortPeople({ list: data, sortBy: 'age' });
  const dataGrid = arrangeTree(sortedList);
  const { minRow, maxRow, minCol, maxCol } = getGridSize(dataGrid);
  
  const renderPerson = (personInGrid) => {
    const { person } = personInGrid;
    return (
      <span key={person.id} className={treeStyles.personBox}>
        <span className={treeStyles.personLink}>
          <Link href={`/locale/${locale}/person/${person.id}`}>
            {person.fullName}
          </Link>
        </span>
      </span>
    );
  };
  const renderPersonOrEmptyBox = ({ row, col }) => {
    const matchingPeople = dataGrid.filter((personInGrid) => (
      personInGrid.row == row && personInGrid.col == col
    ));
    if (matchingPeople.length > 0) {
      return (
        <span key={[row, col]}>
          {renderPerson(matchingPeople[0])}
        </span>
      );
    } else {
      return <span key={[row, col]}></span>;
    }
  };
  const gridRow = (rowIndex) => {
    const boxesInRow = [];
    let colIndex = minCol;
    while (colIndex <= maxCol) {
      boxesInRow.push(
        <td key={[rowIndex, colIndex]} className={treeStyles.tableBox}>
          {renderPersonOrEmptyBox({
            row: rowIndex,
            col: colIndex,
          })}
        </td>
      );
      colIndex += 1;
    }
    return (
      <tr key={rowIndex} className={treeStyles.tableRow}>
        {boxesInRow}
      </tr>
    );
  };
  const rows = [];
  let rowIndex = minRow;
  while (rowIndex <= maxRow) {
    rows.push(gridRow(rowIndex));
    rowIndex++;
  }
  return (
    <div>
      <table className={treeStyles.table}>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};
export default Tree;