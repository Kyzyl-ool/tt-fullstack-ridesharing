const getTimeFromNow = (minutes: number): Date => {
  const now = new Date().getTime();
  const nowPlusInterval = minutes * 60 * 1000 + now;
  return new Date(nowPlusInterval);
};

export default getTimeFromNow;
