import React from "react";
import "./App.css";
// import Header from "./components/Header";
// import StudentsStatsListView from './components/StudentsStatsListView'
// import StudentStatsCard from './components/StudentStatsCard'
import LoginPage from './pages/LoginPage.tsx'

function App() {
  return (
    <>
      {/* <StudentsStatsListView name="Rushi" label1="Attendance" value1="78%" label2="Missed Casses" value2="2"/> */}
      {/* <StudentStatsCard label1="Attendance" value1="78%" label2 = {true} value2={"02/01/2022"}/> */}
      {/* <Header
        label1="Attendance"
        value1="78%"
        label2={true}
        value2={"02/01/2022"}
      /> */}
     <LoginPage />
    </>
  );
}

export default App;
