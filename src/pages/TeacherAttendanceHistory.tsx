import React from 'react'
import CalendarWithAttendance from '../components/CalenderWithAttendance';

const TeacherAttendanceHistory = () => {
  return (
    <CalendarWithAttendance
    presentDates={["2024-03-01", "2024-03-05", "2024-03-24"]}
    absentDates={["2024-03-14", "2024-03-17", "2024-03-29"]}
    halfDayDates={["2024-03-05", "2024-03-15"]}
    notMarkedDates={["2024-03-13", "2024-03-25"]}
  />
  )
}

export default TeacherAttendanceHistory