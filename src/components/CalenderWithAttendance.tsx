import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CheckCircleOutlineOutlined, CancelOutlined, RemoveCircleOutline, RemoveOutlined } from '@mui/icons-material';
import '../App.css';

const CalendarWithAttendance = ({ presentDates, absentDates, halfDayDates, notMarkedDates, futureDates, onChange }) => {
  const [date, setDate] = useState(new Date());

  const reducedPresentDates = useMemo(() => reduceDatesByOneDay(presentDates), [presentDates]);
  const reducedHalfDates = useMemo(() => reduceDatesByOneDay(halfDayDates), [halfDayDates]);
  const reducedAbsentDates = useMemo(() => reduceDatesByOneDay(absentDates), [absentDates]);
  const reducedNotMarkedDates = useMemo(() => reduceDatesByOneDay(notMarkedDates), [notMarkedDates]);
  const reducedFutureDates = useMemo(() => reduceDatesByOneDay(futureDates), [futureDates]);

  useEffect(() => {
    const currentDate = new Date();
    localStorage.setItem("activeStartDate", currentDate.toDateString());
    console.log("activeStartDate child", currentDate);
  }, [])

  function reduceDatesByOneDay(dates) {
    return dates.map((dateString) => {
      const date = new Date(dateString);
      date.setDate(date.getDate() - 1);
      return date.toISOString().slice(0, 10);
    });
  }

  function getAttendanceStatus(date) {
    const dateString = date.toISOString().slice(0, 10);
    // const currentDate = new Date().toISOString().slice(0, 10);

    if (reducedPresentDates.includes(dateString) && !halfDayDates.includes(dateString)) {
      return 'present';
    }
    if (reducedHalfDates.includes(dateString)) {
      return 'halfDay';
    }
    if (reducedAbsentDates.includes(dateString)) {
      return 'absent';
    }
    if (reducedNotMarkedDates.includes(dateString)) {
      return 'attendanceNotMarked';
    }
    if (reducedFutureDates.includes(dateString)) {
      return "futureDate";
    }
    return null;
  }

  function tileContent({ date, view }) {
    if (view !== 'month') return null;
    const status = getAttendanceStatus(date);
    switch (status) {
      case 'present':
        return (
          <div className="present-marker">
            <CheckCircleOutlineOutlined />
          </div>
        );
      case 'absent':
        return (
          <div className="absent-marker">
            <CancelOutlined />
          </div>
        );
      case 'halfDay':
        return (
          <div>
            <RemoveCircleOutline />
          </div>
        );
      case 'futureDate':
        return (
          <div style={{ color: 'gray' }}>
            <RemoveOutlined />
          </div>
        );
      default:
        return null;
    }
  }

  function tileClassName({ date, view }) {
    if (view !== 'month') return null;
    const classes = ['tile-day'];
    if (date.toDateString() === new Date().toDateString()) {
      classes.push('today');
    }
    if (getAttendanceStatus(date) === 'attendanceNotMarked') {
      classes.push('attendance-not-marked');
    }
    return classes.join(' ');
  }

  const formatShortWeekday = (locale, date) => {
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return weekdays[date.getDay()];
  };

  const handleActiveStartDateChange = ({ activeStartDate, view }) => {
    console.log("Active start date changed:", activeStartDate);
    // localStorage.setItem("activeStartDate", activeStartDate);
    onChange(activeStartDate);
  };

  return (
    <div>
      <div className="day-tile-wrapper">
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={tileContent}
          tileClassName={tileClassName}
          calendarType="gregory"
          className="calender-body"
          formatShortWeekday={formatShortWeekday}
          onActiveStartDateChange={handleActiveStartDateChange}
        />
      </div>
    </div>
  );
};

CalendarWithAttendance.propTypes = {
  presentDates: PropTypes.arrayOf(PropTypes.string).isRequired,
  absentDates: PropTypes.arrayOf(PropTypes.string).isRequired,
  halfDayDates: PropTypes.arrayOf(PropTypes.string).isRequired,
  notMarkedDates: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CalendarWithAttendance;
