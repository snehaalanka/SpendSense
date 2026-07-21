import { useMonth } from "../../context/MonthContext";
import "../../styles/TimelineBar.css";

const TimelineBar = () => {
  const { selectedMonth } = useMonth();
  
  // Calculate day of the month logic
  const now = new Date();
  
  // If viewing current month/year, use current day, else use last day of that month
  let currentDay;
  let totalDays;
  
  if (now.getFullYear() === selectedMonth.year && now.getMonth() === selectedMonth.month - 1) {
    currentDay = now.getDate();
    totalDays = new Date(selectedMonth.year, selectedMonth.month, 0).getDate();
  } else {
    totalDays = new Date(selectedMonth.year, selectedMonth.month, 0).getDate();
    currentDay = totalDays; // past month completed
  }
  
  const percentage = (currentDay / totalDays) * 100;
  
  // formatting month name
  const monthName = new Date(selectedMonth.year, selectedMonth.month - 1).toLocaleString('default', { month: 'long' });

  return (
    <div className="timeline-container">
      <div className="timeline-track">
        <div className="timeline-fill" style={{ width: `${percentage}%` }}></div>
        <div className="timeline-indicator" style={{ left: `${percentage}%` }}>
          <div className="timeline-dot"></div>
        </div>
      </div>
      <div className="timeline-text">
        Day {currentDay} of {totalDays} • {monthName}
      </div>
    </div>
  );
};

export default TimelineBar;
