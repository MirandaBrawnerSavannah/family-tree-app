import { useRouter } from 'next/router'
import Link from 'next/link'; 
import Image from 'next/image';
import treeStyles from './Tree.module.css';
import sortPeople from '../utils/sortPeople';
import arrangeTree from '../utils/arrangeTree';
import getGridSize from '../utils/getGridSize';
import areMarried from '../utils/areMarried';
import Localizer from '../utils/Localizer';
import areParentChild from '../utils/areParentChild';
import { TreeContext } from './TreeContext';
import getNextAvailableID from '../utils/getNextAvailableID';
import addPerson from '../utils/addPerson';

const Tree = () => {
  const router = useRouter();
  return (
    <TreeContext.Consumer>
      {contextValue => {
        const [listOfPeople, setListOfPeople] = contextValue;
        const nextId = getNextAvailableID(listOfPeople);
        const { locale } = router.query;
        const intl = new Localizer(locale);
        const sortedList = sortPeople({ list: listOfPeople, sortBy: 'age' });
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
          <div className={treeStyles.treePage}>
            <table className={treeStyles.table}>
              <tbody>
                {rows}
              </tbody>
            </table>
            <button
              type="button"
              className={treeStyles.addButton}
              onClick={() => {
                const newPerson = {
                  id: nextId,
                  fullName: 'Clarissa Tompkins',
                  born: {
                    year: 1922,
                    month: 12,
                    day: 5
                  },
                  died: {
                    year: 2000,
                    month: 1,
                    day: 7
                  },
                  parents: [10, 11],
                  children: [5],
                  marriedTo: [{
                    spouse: 7,
                  }],
                }
                const newList = addPerson({ newPerson, data: listOfPeople });
                setListOfPeople(newList);
                router.push(`/locale/${locale}/newPerson#addPersonMenu`);
              }}
            >
              {intl.formatMessage({ id: 'addPerson' })}
            </button>
          </div>
        );
      }}
    </TreeContext.Consumer>
  );
};
export default Tree;