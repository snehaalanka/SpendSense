import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";

import {
  Search,
  Filter,
  Calendar,
  Download,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

import "react-datepicker/dist/react-datepicker.css";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "Food", label: "Food" },
  { value: "Transport", label: "Transport" },
  { value: "Shopping", label: "Shopping" },
  { value: "Bills", label: "Bills" },
  { value: "Education", label: "Education" },
  { value: "Entertainment", label: "Entertainment" },
];

const ExpenseFilters = () => {

  const { theme } = useTheme();

  const [selectedDate, setSelectedDate] = useState(null);

  const selectStyles = {

    control: (provided, state) => ({

      ...provided,

      backgroundColor:
        theme === "dark"
          ? "#111827"
          : "#ffffff",

      border: `1px solid ${
        state.isFocused
          ? "#2563EB"
          : theme === "dark"
          ? "#374151"
          : "#D1D5DB"
      }`,

      borderRadius: "12px",

      minHeight: "50px",

      boxShadow: "none",

      cursor: "pointer",

      transition: ".25s",

      "&:hover": {

        borderColor:"#2563EB",

      },

    }),

    menu: (provided) => ({

      ...provided,

      backgroundColor:
        theme === "dark"
          ? "#1E293B"
          : "#ffffff",

      borderRadius:"12px",

      overflow:"hidden",

      border:`1px solid ${
        theme === "dark"
          ? "#374151"
          : "#E5E7EB"
      }`,

    }),

    option: (provided,state)=>({

      ...provided,

      backgroundColor:state.isFocused
      ? "#2563EB"
      : theme==="dark"
      ? "#1E293B"
      : "#ffffff",

      color:state.isFocused
      ? "#ffffff"
      : theme==="dark"
      ? "#ffffff"
      : "#111827",

      cursor:"pointer",

    }),

    singleValue:(provided)=>({

      ...provided,

      color:
      theme==="dark"
      ? "#ffffff"
      : "#111827",

    }),

    placeholder:(provided)=>({

      ...provided,

      color:
      theme==="dark"
      ? "#94A3B8"
      : "#6B7280",

    }),

    input:(provided)=>({

      ...provided,

      color:
      theme==="dark"
      ? "#ffffff"
      : "#111827",

    }),

    dropdownIndicator:(provided)=>({

      ...provided,

      color:"#2563EB",

    }),

    indicatorSeparator:()=>({

      display:"none",

    }),

  };

  return (

    <div className="filter-card">

      <div className="filter-input">

        <Search size={18}/>

        <input

          type="text"

          placeholder="Search expenses..."

        />

      </div>

      <div className="filter-select">

        <Filter size={18}/>

        <Select

          options={categories}

          defaultValue={categories[0]}

          styles={selectStyles}

          isSearchable={false}

        />

      </div>

      <div className="filter-date">

        <Calendar size={18}/>

        <DatePicker

          selected={selectedDate}

          onChange={(date)=>setSelectedDate(date)}

          placeholderText="Select Date"

          dateFormat="dd MMM yyyy"

        />

      </div>

      <button className="export-btn">

        <Download size={18}/>

        Export

      </button>

    </div>

  );

};

export default ExpenseFilters;