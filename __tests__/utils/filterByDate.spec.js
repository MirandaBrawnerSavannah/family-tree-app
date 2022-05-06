const { wasBornBefore, filterByDate } = require('../../utils/filterByDate');

describe('test filterByDate and related functions', () => {
  describe('test the wasBornBefore function', () => {
    const people = [
      { name: 'noBirthdate', born: undefined },
      { name: 'noYear', born: { month: 2, day: 15 }},
      { name: 'bornIn1975', born: { year: 1975 }},
      { name: 'bornInAugust1990', born: { year: 1990, month: 8 }},
      { name: 'bornOn3Dec1987', born: {
        year: 1987,
        month: 12,
        day: 3
      }},
    ];
    const currentDates = [
      { name: 'undefined', date: undefined },
      { name: 'noYear', date: { month: 2, day: 14 }},
      { name: '1975', date: { year: 1975 }},
      { name: '1974', date: { year: 1974 }},
      { name: '1976', date: { year: 1976 }},
      { name: 'August1990', date: { year: 1990, month: 8 }},
      { name: 'Jan1990', date: { year: 1990, month: 1 }},
      { name: '31Dec1990', date: { year: 1990, month: 12, day: 31 }},
      { name: '3Dec1987', date: { year: 1987, month: 12, day: 3 }},
      { name: '1Dec1987', date: { year: 1987, month: 12, day: 1 }},
      { name: '29Dec1987', date: { year: 1987, month: 12, day: 29 }},
      { name: 'Nov1987', date: { year: 1987, month: 11 }},
      { name: '7March1975', date: { year: 1975, month: 3, day: 7 }},
    ];
    const lookupPersonByName = (personName) => {
      return people.filter((person) => person.name === personName)[0];
    }
    const lookupDateByName = (dateName) => {
      return currentDates.filter((date) => date.name === dateName)[0].date;
    } 
    const runTest = ({ personName, dateName, expected }) => {
      const person = lookupPersonByName(personName);
      const date = lookupDateByName(dateName);
      const returnedValue = wasBornBefore({ person, date });
      it(`comparing ${personName} to ${dateName}`, () => {
        expect(returnedValue).toStrictEqual(expected);
      });
    }
    const testCases = [
      { personName: 'noBirthdate', dateName: '1974', expected: true },
      { personName: 'noBirthdate', dateName: 'undefined', expected: true },
      { personName: 'noBirthdate', dateName: 'noYear', expected: true },
      { personName: 'noYear', dateName: 'noYear', expected: true },
      { personName: 'noYear', dateName: 'undefined', expected: true },
      { personName: 'noYear', dateName: '29Dec1987', expected: true },
      { personName: 'bornIn1975', dateName: 'undefined', expected: true },
      { personName: 'bornIn1975', dateName: '1974', expected: false },
      { personName: 'bornIn1975', dateName: '1975', expected: true },
      { personName: 'bornIn1975', dateName: '1976', expected: true },
      { personName: 'bornIn1975', dateName: '7March1975', expected: true },
      { personName: 'bornInAugust1990', dateName: '1976', expected: false },
      { personName: 'bornInAugust1990', dateName: 'August1990', expected: true },
      { personName: 'bornInAugust1990', dateName: 'Jan1990', expected: false },
      { personName: 'bornInAugust1990', dateName: '31Dec1990', expected: true },
      { personName: 'bornOn3Dec1987', dateName: '3Dec1987', expected: true },
      { personName: 'bornOn3Dec1987', dateName: '1Dec1987', expected: false },
      { personName: 'bornOn3Dec1987', dateName: '29Dec1987', expected: true },
      { personName: 'bornOn3Dec1987', dateName: 'Nov1987', expected: false },
    ];
    testCases.forEach(runTest);
  });
  describe('test the filterByDate function', () => {
    const people = [
      { name: 'noBirthdate', born: undefined },
      { name: 'noYear', born: { month: 2, day: 15 }},
      { name: 'bornIn1975', born: { year: 1975 }},
      { name: 'bornInAugust1990', born: { year: 1990, month: 8 }},
      { name: 'bornOn3Nov1987', born: {
        year: 1987,
        month: 11,
        day: 3,
      }},
      { name: 'bornOn2Nov1987', born: {
        year: 1987,
        month: 11,
        day: 2,
      }},
      { name: 'bornOn4Nov1987', born: {
        year: 1987,
        month: 11,
        day: 4,
      }},
      { name: 'bornIn1987', born: { year: 1987 }},
      { name: 'bornInNov1987', born: { year: 1987, month: 11 }},
      { name: 'bornOn1Dec1987', born: {
        year: 1987,
        month: 12,
        day: 1,
      }},
      { name: 'bornOn31Oct1987', born: {
        year: 1987,
        month: 10,
        day: 31,
      }},
    ];
    const currentDate = { year: 1987, month: 11, day: 3 };
    const testCases = [
      { personName: 'noBirthdate', expected: true },
      { personName: 'noYear', expected: true },
      { personName: 'bornIn1975', expected: true },
      { personName: 'bornInAugust1990', expected: false },
      { personName: 'bornOn3Nov1987', expected: true },
      { personName: 'bornOn2Nov1987', expected: true },
      { personName: 'bornOn4Nov1987', expected: false },
      { personName: 'bornIn1987', expected: true },
      { personName: 'bornInNov1987', expected: true },
      { personName: 'bornOn1Dec1987', expected: false },
      { personName: 'bornOn31Oct1987', expected: true },
    ];

    const filteredList = filterByDate({ listOfPeople: people, date: currentDate });
    const isInList = (personName) => {
      const selection = filteredList.filter(
        (person) => person.name === personName
      );
      return selection.length > 0;
    }
    const runTest = ({ personName, expected }) => {
      it(`is ${personName} in the filtered list`, () => {
        const returnedValue = isInList(personName);
        expect(returnedValue).toStrictEqual(expected);
      });
    }
    testCases.forEach(runTest);
  });
});
