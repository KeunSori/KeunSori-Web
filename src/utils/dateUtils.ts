const today = new Date();
export const transDate = (userDate: string) => {
  return `${userDate[0].toString()}/${userDate[1].toString()}/${userDate[2].toString()}`;
};
export const formatDate = (date: Date | null): string | null => {
  if (!date) return null;

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  return `${year}${month}`;
};
export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
export const beforeToday = (date: Date) => {
  return (
    date.getDate() < today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
