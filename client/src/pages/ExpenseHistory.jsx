import ExpenseFilters from "../components/ExpenseHistory/ExpenseFilters";
import ExpenseHistoryTable from "../components/ExpenseHistory/ExpenseHistoryTable";
import "../components/ExpenseHistory/ExpenseHistory.css";

const ExpenseHistory = () => {
  return (
    <div className="history-page">

      <div className="history-header">

        <h1>Expense History</h1>

        <p>
          View and manage all your recorded expenses.
        </p>

      </div>

      <ExpenseFilters />

      <ExpenseHistoryTable />

    </div>
  );
};

export default ExpenseHistory;