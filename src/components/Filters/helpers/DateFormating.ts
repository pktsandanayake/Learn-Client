import INTERVAL from "../../../Enums/Interval";

const getCurrentDateString = () => {
  const day =
    new Date().getDate() + 1 < 10
      ? `0${new Date().getDate()}`
      : `${new Date().getDate()}`;

  const month =
    new Date().getMonth() + 1 < 10
      ? `0${new Date().getMonth() + 1}`
      : `${new Date().getMonth() + 1}`;
  return `${new Date().getFullYear()}-${month}-${day}`;
};

const getCurrentWeekString = () => {
  const weekNumber = () => {
    const d = new Date();
    let yearstart = +new Date(d.getFullYear(), 0, 1);
    let today = +new Date(d.getFullYear(), d.getMonth(), d.getDate());
    let dayOfYear = (today - yearstart + 1) / 86400000;
    return Math.ceil(dayOfYear / 7) + 1;
  };

  return `${new Date().getFullYear()}-W${weekNumber()}`;
};

const getCurrentMonthString = () => {
  const month =
    new Date().getMonth() + 1 < 10
      ? `0${new Date().getMonth() + 1}`
      : `${new Date().getMonth() + 1}`;

  return `${new Date().getFullYear()}-${month}`;
};

const getDateByIntervalType = (interval: string) => {
  switch (interval) {
    case INTERVAL.DATE:
      return DateFormating.getCurrentDateString();
    case INTERVAL.WEEK:
      return DateFormating.getCurrentWeekString();
    case INTERVAL.MONTH:
      return DateFormating.getCurrentMonthString();
    default:
      return INTERVAL.EMPTY;
  }
};

const DateFormating = {
  getCurrentDateString,
  getCurrentWeekString,
  getCurrentMonthString,
  getDateByIntervalType,
};

export default DateFormating;
