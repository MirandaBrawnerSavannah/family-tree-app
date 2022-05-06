const updateQueryParam = ({ path, paramName, paramValue }) => {
  const hashTagIndex = path.indexOf('#');
  if (hashTagIndex !== -1) {
    const beforeHashTag = path.slice(0, hashTagIndex); // does not include #
    const hashTag = path.slice(hashTagIndex);
    const newPageUrl = updateQueryParam ({ 
      path: beforeHashTag, paramName, paramValue,
    });
    return `${newPageUrl}${hashTag}`;
  }
  const questionMarkIndex = path.indexOf('?');
  if (questionMarkIndex === -1) {
    return `${path}?${paramName}=${paramValue}`
  }
  const pathWithoutParams = path.slice(0, questionMarkIndex + 1); // includes ?
  const paramList = path.slice(questionMarkIndex + 1).split('&')
  let foundMatchingParam = false;
  const newParamList = paramList.map((nextNameAndValue) => {
    if (nextNameAndValue.startsWith(`${paramName}=`)) {
      foundMatchingParam = true;
      return `${paramName}=${paramValue}`;
    }
    return nextNameAndValue;
  });
  let newPath = `${pathWithoutParams}${newParamList.join('&')}`;
  if (!foundMatchingParam) {
    newPath = `${newPath}&${paramName}=${paramValue}`;
  }
  return newPath;
}
module.exports = { updateQueryParam };
