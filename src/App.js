import React, { useState } from 'react';
import './App.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const App = () => {
  const [date, setDate] = useState(new Date());
  const [currYear, setCurrYear] = useState(date.getFullYear());
  const [currMonth, setCurrMonth] = useState(date.getMonth());

  const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

  const renderCalendar = () => {
    const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let days = [];

    for (let i = firstDayofMonth; i > 0; i--) {
      days.push(<li key={`inactive-${i}`} className="inactive">{lastDateofLastMonth - i + 1}</li>);
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      const isToday = i === date.getDate() && currMonth === new Date().getMonth()
        && currYear === new Date().getFullYear() ? "active" : "";
      days.push(<li key={`active-${i}`} className={isToday}>{i}</li>);
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      days.push(<li key={`inactive-next-${i}`} className="inactive">{i - lastDayofMonth + 1}</li>);
    }

    return days;
  };

  const handlePrevNextClick = (id) => {
    setCurrMonth((prevMonth) => id === "prev" ? prevMonth - 1 : prevMonth + 1);
    setDate(new Date());
  };

  if (currMonth < 0 || currMonth > 11) {
    const newDate = new Date(currYear, currMonth, new Date().getDate());
    setCurrYear(newDate.getFullYear());
    setCurrMonth(newDate.getMonth());
  }

  return (
    <div className="wrapper">
      <header>
        <p className="current-date">{`${months[currMonth]} ${currYear}`}</p>
        <div className="icons">
          <span id="prev" className="material-symbols-rounded"
            onClick={() => handlePrevNextClick("prev")}><ChevronLeftIcon/></span>
          <span id="next" className="material-symbols-rounded"
            onClick={() => handlePrevNextClick("next")}><ChevronRightIcon/></span>
        </div>
      </header>
      <div className="calendar">
        <ul className="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul className="days">
          {renderCalendar()}
        </ul>
      </div>
    </div>
  );
};

export default App;
