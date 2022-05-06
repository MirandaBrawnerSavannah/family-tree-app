const { updateQueryParam } = require('../../utils/updateQueryParam');

describe('test the updateQueryParam function', () => {
  const testCases = [
    { 
      name: 'add to empty list',
      path: 'example.com',
      paramName: 'param',
      paramValue: 'test',
      expected: 'example.com?param=test'
    }, { 
      name: 'add to list with one param',
      path: 'website.net?page=home',
      paramName: 'newParam',
      paramValue: 'test',
      expected: 'website.net?page=home&newParam=test'
    }, { 
      name: 'add to list with two params',
      path: 'test.org?first=cat&second=dog',
      paramName: 'third',
      paramValue: 'bear',
      expected: 'test.org?first=cat&second=dog&third=bear',
    }, { 
      name: 'replace one param',
      path: 'somewhere.com?page=home',
      paramName: 'page',
      paramValue: 'login',
      expected: 'somewhere.com?page=login',
    }, { 
      name: 'replace one of two params',
      path: 'example.com?first=cow&second=horse',
      paramName: 'second',
      paramValue: 'zebra',
      expected: 'example.com?first=cow&second=zebra',
    }, { 
      name: 'replace one of three params',
      path: 'website.com?first=cat&second=dog&third=bear',
      paramName: 'second',
      paramValue: 'mouse',
      expected: 'website.com?first=cat&second=mouse&third=bear',
    }, { 
      name: 'replace one of two, and keep hashtag',
      path: 'example.com?first=cat&second=dog#food',
      paramName: 'first',
      paramValue: 'ferret',
      expected: 'example.com?first=ferret&second=dog#food',
    },
  ];
  const runTest = (testCase) => {
    const { name, path, paramName, paramValue, expected } = testCase;
    it(name, () => {
      const updatedPath = updateQueryParam({ path, paramName, paramValue });
      expect(updatedPath).toStrictEqual(expected);
    });
  };
  testCases.forEach(runTest);
});