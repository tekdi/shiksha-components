import React from "react";
import "./App.css";
import PageHeaderComponent from "./components/PageHeaderComponent";
import ModalUsage from "./pages/ModalUsage";
// import StudentsStatsListView from './components/StudentsStatsListView'
// import StudentStatsCard from './components/StudentStatsCard'

function App() {
  return (
    <>
      {/* <StudentsStatsListView studentName="Rushi" label1="Attendance" value1="78%" label2="Missed Casses" value2="2"/> */}
      {/* <StudentStatsCard label1="Attendance" value1="78%" label2 = {true} value2={"02/01/2022"}/> */}
      <PageHeaderComponent
        label1="Attendance"
        value1="78%"
        label2={true}
        value2={"02/01/2022"}
      />
      <ModalUsage />
    </>
  );
}

export default App;
