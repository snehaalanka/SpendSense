import { createContext, useContext, useState } from "react";

const MonthContext = createContext();

export const MonthProvider = ({ children }) => {
  const now = new Date();

  const [selectedMonth, setSelectedMonth] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  const isCurrentMonth =
    selectedMonth.year === now.getFullYear() &&
    selectedMonth.month === now.getMonth() + 1;

  const goToPrevMonth = () => {
    setSelectedMonth((prev) => {
      if (prev.month === 1) return { year: prev.year - 1, month: 12 };
      return { year: prev.year, month: prev.month - 1 };
    });
  };

  const goToNextMonth = () => {
    if (isCurrentMonth) return;
    setSelectedMonth((prev) => {
      if (prev.month === 12) return { year: prev.year + 1, month: 1 };
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  // Directly jump to a specific month (used by the vertical dropdown list)
  const selectMonth = (month, year = now.getFullYear()) => {
    const isFuture =
      year > now.getFullYear() ||
      (year === now.getFullYear() && month > now.getMonth() + 1);

    if (isFuture) return; // block picking future months

    setSelectedMonth({ year, month });
  };

  return (
    <MonthContext.Provider
      value={{
        selectedMonth,
        goToPrevMonth,
        goToNextMonth,
        selectMonth,
        isCurrentMonth,
      }}
    >
      {children}
    </MonthContext.Provider>
  );
};

export const useMonth = () => useContext(MonthContext);