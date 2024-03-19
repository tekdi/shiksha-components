import { useState } from 'react';
import { Stack, Button, Divider } from '@mui/material';
import CohortCard from './components/CohortCard';
import StudentList from './components/StudentList';
import AttendanceStatusListView from './components/AttendanceStatusListView';
import CalenderCard from './components/CalenderCard';
import './App.css';
import Header from './components/Header';
import ModalUsage from './pages/ModalUsage';

const ENUM_ITEMS = {
  CLASSES: "Classes",
  STUDENT_SELECTION: "Student Selection",
  STUDENT_ATTENDANCE: "Student Attendance",
  CALENDER: "Calender",
  OTHERS: "Others"
}

function App() {
  const [view, setView] = useState(ENUM_ITEMS.OTHERS);

  const getView = () => {
    switch (view) {
      case ENUM_ITEMS.CLASSES:
        return (
          <>
            <CohortCard isNewCohort={false} isRemote={true} cohortName='Class A' />
            <CohortCard isNewCohort={true} isRemote={false} cohortName='Class B' />
            <CohortCard isNewCohort={false} isRemote={false} cohortName='Class C' />
          </>
        );
      case ENUM_ITEMS.STUDENT_SELECTION:
        return (
          <>
            <StudentList isSelected={true} studentName="Student A" />
            <StudentList isSelected={false} studentName="Student B" />
            <StudentList isSelected={false} studentName="Student C" />
          </>
        );
      case ENUM_ITEMS.STUDENT_ATTENDANCE:
        return (
          <>
            <AttendanceStatusListView isPresent={true} studentName="Student X" />
            <AttendanceStatusListView isPresent={false} studentName="Student Y" />
            <AttendanceStatusListView isPresent={false} studentName="Student Z" />
          </>
        )
      case ENUM_ITEMS.CALENDER:
        return (
          <>
            <CalenderCard />
          </>
        )
        case ENUM_ITEMS.OTHERS:
        return (
          <>
          <Header
            label1="Attendance"
            value1="78%"
            label2={true}
            value2={"02/01/2022"}
          />
          <ModalUsage />
        </>
        )
      default:
        <>
            <CohortCard isNewCohort={false} isRemote={true} cohortName='Class A' />
            <CohortCard isNewCohort={true} isRemote={false} cohortName='Class B' />
            <CohortCard isNewCohort={false} isRemote={false} cohortName='Class C' />
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
        <Button variant={view === ENUM_ITEMS.OTHERS ? "contained" : "outlined"} onClick={() => setView(ENUM_ITEMS.OTHERS)}>
          Others
        </Button>
      </Stack>
      {getView()}

    </div>
  )
}

export default App;
