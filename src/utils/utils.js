const ParamsToObject = (entries) => {
  const result = {};
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
};

const AddDays = (date, days) => {
  return new Date(new Date(date).getTime() + days * 24 * 60 * 60 * 1000);
};

const FormatDate = (string) => {
  var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return new Date(string).toLocaleDateString([], options);
};

const GetDayAddition = (day) => {
  const preLastDigit = parseInt((day % 100) / 10, 10);
  if (preLastDigit === 1) {
    return 'дней';
  }
  switch (day % 10) {
    case 1:
      return 'день';
    case 2:
    case 3:
    case 4:
      return 'дня';
    default:
      return 'дней';
  }
};

export { ParamsToObject, AddDays, FormatDate, GetDayAddition };
