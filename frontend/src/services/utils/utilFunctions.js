const regexDate = (dateToConvert) => {
  const date = dateToConvert;
  const regex = /^\d{4}-\d{2}-\d{2}/;
  const match = date.match(regex);
  const result = match ? match[0] : "";
  return result;
};

export default regexDate;
