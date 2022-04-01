import { useRouter } from 'next/router'
import Link from 'next/link'; 
import Image from 'next/image';
import data from '../pages/API/data.json';
import treeStyles from './Tree.module.css';
import sortPeople from '../utils/sortPeople';
import arrangeTree from '../utils/arrangeTree';
import getGridSize from '../utils/getGridSize';
import areMarried from '../utils/areMarried';
import Localizer from '../utils/Localizer';
import areParentChild from '../utils/areParentChild';

const Tree = () => {
  const router = useRouter();
  const { locale } = router.query;
  const intl = new Localizer(locale);
  const sortedList = sortPeople({ list: data, sortBy: 'age' });
  const dataGrid = arrangeTree(sortedList);
  const { minRow, maxRow, minCol, maxCol } = getGridSize(dataGrid);

  const lookupInGrid = ({ row, col }) => {
    const matchingPeople = dataGrid.filter((personInGrid) => (
      personInGrid.row == row && personInGrid.col == col
    ));
    if (matchingPeople.length > 0) {
      return matchingPeople[0];
    }
    return undefined;
  }
  const renderPerson = (personInGrid) => {
    const { person } = personInGrid;
    return (
      <span key={person.id} className={treeStyles.personBox}>
        <span className={treeStyles.personLink}>
          <Link href={`/locale/${locale}/person/${person.id}#profile`}>
            {person.fullName}
          </Link>
        </span>
      </span>
    );
  };
  const renderBox = ({ row, col }) => {
    const person = lookupInGrid({ row, col });
    if (person !== undefined) {
      return (
        <span key={[row, col]}>
          {renderPerson(person)}
        </span>
      );
    } else {
      const leftNeighbor = lookupInGrid({ row, col: col - 1 });
      const rightNeighbor = lookupInGrid({ row, col: col + 1 });
      if (leftNeighbor && rightNeighbor) {
        if (areMarried(leftNeighbor.person, rightNeighbor.person)) {
          return (
            <span className={treeStyles.marriageBox}>
              {intl.formatMessage({ id: 'marriageLine' })}
            </span>
          );
        }
      }
      const leftAbove = lookupInGrid({ row: row - 1, col: col - 1});
      const rightAbove = lookupInGrid({ row: row - 1, col: col + 1 });
      const below = lookupInGrid({ row: row + 1, col });
      if (
        leftAbove && rightAbove && below 
        && areMarried(leftAbove.person, rightAbove.person)
        && areParentChild({ parent: leftAbove.person, child: below.person })
        && areParentChild({ parent: rightAbove.person, child: below.person })
      ) {
        return <Image
          src="/vertical.png"
          alt=""
          width={100}
          height={50}
        />
      }
      return <span key={[row, col]}></span>;
    }
  };
  const gridRow = (rowIndex) => {
    const boxesInRow = [];
    let colIndex = minCol;
    while (colIndex <= maxCol) {
      boxesInRow.push(
        <td key={[rowIndex, colIndex]} className={treeStyles.tableBox}>
          {renderBox({
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