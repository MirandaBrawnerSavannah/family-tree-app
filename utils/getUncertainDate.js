const getUncertainDate = (dateInput) => {
  if (dateInput === undefined) {
    return undefined;
  }
  let dateOutput = undefined;
  const { year, month, day } = dateInput;
  if (year !== undefined) {
    dateOutput = new Date(year, 6, 1);
    if (month !== undefined) {
      dateOutput = new Date(year, month - 1, 15);
      if (day !== undefined) {
        dateOutput = new Date(year, month - 1, day);
      }
    }
  }
  return dateOutput;
};
export default getUncertainDate;