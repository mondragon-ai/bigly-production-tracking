export const createCurrentSeconds = () => {
  const dateInMillisecs = new Date().getTime();
  return Math.round(dateInMillisecs / 1000);
};
