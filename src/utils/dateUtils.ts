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
export const unvailableMonth = (date: Date) => {
  return (
    date.getMonth() - 1 > today.getMonth() ||
    date.getMonth() < today.getMonth() ||
    date.getFullYear() !== today.getFullYear()
  );
};

// 날짜를 YYYY-MM-DD 형식으로 변환
export const formatDateYYYYMMDD = (dateStr: Date) => {
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};
