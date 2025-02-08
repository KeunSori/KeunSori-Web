export const transDate = (userDate: string) => {
  return `${userDate[0].toString()}/${userDate[1].toString()}/${userDate[2].toString()}`;
};
export const formatDate = (date: Date | null): string | null => {
  if (!date) return null;

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  return `${year}${month}`;
};
