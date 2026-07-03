import { useState } from "react";

import ExpenseFilters from "../components/ExpenseHistory/ExpenseFilters";
import ExpenseHistoryTable from "../components/ExpenseHistory/ExpenseHistoryTable";

import "../components/ExpenseHistory/ExpenseHistory.css";

const ExpenseHistory = () => {

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const [selectedDate, setSelectedDate] = useState(null);

  return (

    <div className="history-page">

      <div className="history-header">

        <h1>Expense History</h1>

        <p>View and manage all your recorded expenses.</p>

      </div>

      <ExpenseFilters

        search={search}
        setSearch={setSearch}

        category={category}
        setCategory={setCategory}

        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}

      />

      <ExpenseHistoryTable

        search={search}
        category={category}
        selectedDate={selectedDate}

      />

    </div>

  );

};

export default ExpenseHistory;