import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { Search, Filter, Calendar } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

import "react-datepicker/dist/react-datepicker.css";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "Food", label: "Food" },
  { value: "Shopping", label: "Shopping" },
  { value: "Travel", label: "Travel" },
  { value: "Bills", label: "Bills" },
  { value: "Health", label: "Health" },
  { value: "Education", label: "Education" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Other", label: "Other" },
];

const ExpenseFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  selectedDate,
  setSelectedDate,
}) => {
  const { theme } = useTheme();

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "12px",
      minHeight: "50px",
      boxShadow: "none",
      cursor: "pointer",
      transition: ".25s",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#1E293B" : "#ffffff",
      borderRadius: "12px",
      overflow: "hidden",
      border: `1px solid ${theme === "dark" ? "#374151" : "#E5E7EB"}`,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#2563EB"
        : theme === "dark"
        ? "#1E293B"
        : "#ffffff",
      color: state.isFocused
        ? "#ffffff"
        : theme === "dark"
        ? "#ffffff"
        : "#111827",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#ffffff" : "#111827",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#94A3B8" : "#6B7280",
    }),
    input: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#ffffff" : "#111827",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#2563EB",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <div className="filter-card">
      <div className="filter-input">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search expense..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-select">
        <Filter size={18} />
        <Select
          options={categories}
          value={categories.find((item) => item.value === category)}
          onChange={(option) => setCategory(option.value)}
          styles={selectStyles}
          isSearchable={false}
        />
      </div>

      <div className="filter-date">
        <Calendar size={18} />
        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          placeholderText="Select Date"
          dateFormat="dd MMM yyyy"
        />
      </div>
    </div>
  );
};

export default ExpenseFilters;