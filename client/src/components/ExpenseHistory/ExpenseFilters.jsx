const ExpenseFilters = () => {
  return (
    <div className="filter-card">

      <input
        type="text"
        placeholder="Search expenses..."
      />

      <select>
        <option>All Categories</option>
        <option>Food</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Bills</option>
      </select>

      <input type="date" />

    </div>
  );
};

export default ExpenseFilters;