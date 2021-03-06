import { useRouter } from 'next/router';
import Link from 'next/link'; 
import Image from 'next/image';
import treeStyles from './Tree.module.css';
import sortPeople from '../utils/sortPeople';
import arrangeTree from '../utils/arrangeTree';
import getGridSize from '../utils/getGridSize';
import wereEverMarried, { areMarried, areNoLongerMarried } from '../utils/areMarried';
import Localizer from '../utils/Localizer';
import areParentChild from '../utils/areParentChild';
import { TreeContext } from './TreeContext';
import { filterByDate } from '../utils/filterByDate';
import BirthDeathDates from './BirthDeathDates';
import { updateQueryParam } from '../utils/updateQueryParam';

const Tree = () => {
  const router = useRouter();
  return (
    <TreeContext.Consumer>
      {contextValue => {
        const [treeState, setTreeState] = contextValue;
        const { listOfPeople } = treeState;
        const { locale, year: currentYear } = router.query;
        const intl = new Localizer(locale);
        const currentDate = {
          year: currentYear,
          month: 12,
          day: 31,
        }
        const listAtCurrentTime = filterByDate({ listOfPeople, date: currentDate });
        const sortedList = sortPeople({ list: listAtCurrentTime, sortBy: 'age' });
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
          const basePath = `/locale/${locale}/person/${person.id}#profile`
          const pathWithQueryParams = updateQueryParam({
            path: basePath,
            paramName: 'year',
            paramValue: currentYear,
          })
          return (
            <span key={person.id} className={treeStyles.personBox}>
              <span className={treeStyles.personLink}>
                <Link href={pathWithQueryParams}>
                  {person.fullName}
                </Link>
              </span>
              <br />
              <BirthDeathDates person={person} />
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
              if (areMarried({ 
                firstPerson: leftNeighbor.person,
                secondPerson: rightNeighbor.person,
                date: currentDate,
              })) {
                return (
                  <span className={treeStyles.marriageBox}>
                    {intl.formatMessage({ id: 'marriageLine' })}
                  </span>
                );
              }
              if (areNoLongerMarried({ 
                firstPerson: leftNeighbor.person,
                secondPerson: rightNeighbor.person,
                date: currentDate,
              })) {
                return (
                  <span className={treeStyles.marriageBox}>
                    {intl.formatMessage({ id: 'pastMarriageLine' })}
                  </span>
                );
              }
            }
            const leftAbove = lookupInGrid({ row: row - 1, col: col - 1});
            const rightAbove = lookupInGrid({ row: row - 1, col: col + 1 });
            const below = lookupInGrid({ row: row + 1, col });
            if (
              leftAbove && rightAbove && below 
              && wereEverMarried(leftAbove.person, rightAbove.person)
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
            const above = lookupInGrid({ row: row - 1, col });
            if (
              above && below
              && areParentChild({ parent: above.person, child: below.person })
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
          </div>
        );
      }}
    </TreeContext.Consumer>
  );
};
export default Tree;