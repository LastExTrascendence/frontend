export const getFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // month starts from 0
  const day = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};

export const getNDaysAgoString = (date: Date) => {
  const today = new Date();
  const diff = today.getTime() - date.getTime();
  const diffDays = Math.floor(diff / (1000 * 3600 * 24));
  return diffDays === 0
    ? "today"
    : diffDays === 1
      ? "yesterday"
      : `${diffDays} days ago`;
};
