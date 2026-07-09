import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useMonth } from "../../context/MonthContext";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MonthSelector = () => {
  const { selectedMonth, selectMonth } = useMonth();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonthIndex = now.getMonth() + 1;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (monthIndex) => {
    selectMonth(monthIndex, selectedMonth.year);
    setOpen(false);
  };

  const label = monthNames[selectedMonth.month - 1];

  return (
    <div className="month-selector" ref={wrapperRef}>

      <button
        className="month-btn"
        onClick={() => setOpen((prev) => !prev)}
      >
        {label}
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="month-dropdown-list">
          {monthNames.map((name, index) => {
            const monthNumber = index + 1;
            const isFuture =
              selectedMonth.year === currentYear &&
              monthNumber > currentMonthIndex;
            const isActive = monthNumber === selectedMonth.month;

            return (
              <button
                key={name}
                className={`month-list-item ${isActive ? "active" : ""}`}
                disabled={isFuture}
                onClick={() => handleSelect(monthNumber)}
              >
                {name}
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default MonthSelector;