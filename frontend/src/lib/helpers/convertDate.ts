/* eslint-disable no-octal */
const mapMonthNameToNumber = {
  Oct: '10',
  Nov: '11',
  Dec: '12',
  Jan: '01'
};

export const convertDate = (date: string): string => {
  // Thu Oct 31 2019 16:04:00 GMT+0300 (Moscow Standard Time) - input
  // 2019-10-31 16:04:00.001000 - output
  const splittedDate = date.split(' ');
  const dateWithouttime = splittedDate.slice(1, 4); // ['Oct', '31', '2019']
  const constructedDate = `${dateWithouttime[2]}-${mapMonthNameToNumber[dateWithouttime[0]]}-${dateWithouttime[1]} ${
    splittedDate[4]
  }.001000`;
  return constructedDate;
};
