export var getNumberOfDays = (date: Date) => {
  const timeDifference: number = Date.now() - date.getTime();
  const daysDifference: number = Math.round(
    timeDifference / (1000 * 3600 * 24)
  );
  return daysDifference;
};

export var getNumberOfWeeks = (date: Date) => {
  return Math.round((Date.now() - date.getTime()) / (7 * 24 * 60 * 60 * 1000));
};

export var getNumberOfMonths = (date: Date) => {
  const now = new Date();
  let months =
    now.getMonth() -
    date.getMonth() +
    12 * (now.getFullYear() - date.getFullYear());
  if (now.getDate() < date.getDate()) {
    months--;
  }
  return months;
};

export var getNumberOfYears = (date: Date) => {
  const ageDifMs = Date.now() - date.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
