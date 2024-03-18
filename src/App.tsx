import { useState } from 'react';
import { Stack, Button, Divider } from '@mui/material';
import ClassCard from './components/ClassCard';
import StudentSelectListView from './components/StudentSelectListView';
import AttendanceStatsListView from './components/AttendanceStatusListView';
import CalenderCard from './components/CalenderCard';
import './App.css';

const ENUM_ITEMS = {
  CLASSES: "Classes",
  STUDENT_SELECTION: "Student Selection",
  STUDENT_ATTENDANCE: "Student Attendance",
  CALENDER: "Calender",
}

function App() {
  const [view, setView] = useState(ENUM_ITEMS.CLASSES);

  const getView = () => {
    switch (view) {
      case ENUM_ITEMS.CLASSES:
        return (
          <>
            <ClassCard isNewClass={false} isRemote={true} className='Class A' />
            <ClassCard isNewClass={true} isRemote={false} className='Class B' />
            <ClassCard isNewClass={false} isRemote={false} className='Class C' />
          </>
        );
      case ENUM_ITEMS.STUDENT_SELECTION:
        return (
          <>
            <StudentSelectListView isSelected={true} studentName="Student A" />
            <StudentSelectListView isSelected={false} studentName="Student B" />
            <StudentSelectListView isSelected={false} studentName="Student C" />
          </>
        );
      case ENUM_ITEMS.STUDENT_ATTENDANCE:
        return (
          <>
            <AttendanceStatsListView isPresent={true} studentName="Student X" />
            <AttendanceStatsListView isPresent={false} studentName="Student Y" />
            <AttendanceStatsListView isPresent={false} studentName="Student Z" />
          </>
        )
      case ENUM_ITEMS.CALENDER:
        return (
          <>
            <CalenderCard />
          </>
        )
      default:
        <>
          <ClassCard isNewClass={false} isRemote={true} className='Class A' />
          <ClassCard isNewClass={true} isRemote={false} className='Class B' />
          <ClassCard isNewClass={false} isRemote={false} className='Class C' />
        </>
    }
  }

  return (
    <div>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <Button variant={view === ENUM_ITEMS.CLASSES ? "contained" : "outlined"} onClick={() => setView(ENUM_ITEMS.CLASSES)}>
          Classes
        </Button>
        <Button variant={view === ENUM_ITEMS.STUDENT_SELECTION ? "contained" : "outlined"} onClick={() => setView(ENUM_ITEMS.STUDENT_SELECTION)}>
          Selection
        </Button>
        <Button variant={view === ENUM_ITEMS.STUDENT_ATTENDANCE ? "contained" : "outlined"} onClick={() => setView(ENUM_ITEMS.STUDENT_ATTENDANCE)}>
          Attendance
        </Button>
        <Button variant={view === ENUM_ITEMS.CALENDER ? "contained" : "outlined"} onClick={() => setView(ENUM_ITEMS.CALENDER)}>
          Calender
        </Button>
      </Stack>
      {getView()}

    </div>
  )
}

export default App
