import INTERVAL from "../../../Enums/Interval";
import { valuePair } from "../../../Interfaces/valuePair";

const getDaysByWeek = (interval: string) => {
  const simple = new Date(
    parseInt(interval.split("-W")[0]),
    0,
    1 + (parseInt(interval.split("-W")[1]) - 1) * 7
  );
  const dow = simple.getDay();
  const ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay());
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  const temp = {
    d: ISOweekStart.getDate(),
    m: ISOweekStart.getMonth(),
    y: ISOweekStart.getFullYear(),
  };

  const numDaysInMonth = new Date(temp.y, temp.m + 1, 0).getDate();

  return Array.from({ length: 7 }, (_) => {
    if (temp.d > numDaysInMonth) {
      temp.m += 1;
      temp.d = 1;
    }
    const month = temp.m < 10 ? `0${temp.m}` : temp.m;
    const day = temp.d++ < 10 ? `0${temp.d}` : temp.d;

    return `${temp.y}-${month}-${day}`;
  });
};

const getAllDaysInMonth = (interval: string) => {
  const year = parseInt(interval.split("-")[0]);
  const month = parseInt(interval.split("-")[1]);
  return Array.from(
    { length: new Date(year, month, 0).getDate() },
    (_, i) =>
      `${year}-${month < 10 ? `0${month}` : month}-${
        i + 1 < 10 ? `0${i + 1}` : i + 1
      }`
  );
};

const getDateListByInterval = (interval: valuePair): string[] => {
  switch (interval.type) {
    case INTERVAL.DATE:
      return [interval.value];
    case INTERVAL.WEEK:
      return getDaysByWeek(interval.value);
    case INTERVAL.MONTH:
      return getAllDaysInMonth(interval.value);
    default:
      return [INTERVAL.EMPTY];
  }
};

const getDays = { getDaysByWeek, getAllDaysInMonth, getDateListByInterval };

export default getDays;
