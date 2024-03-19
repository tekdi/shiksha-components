import React from "react";
import AllRoutes from "./routes/routes";
import "./App.css";
import Header from "./components/Header";
import ModalUsage from "./pages/ModalUsage";
import PlaneCard from "./components/Card";
// import StudentsStatsListView from './components/StudentsStatsListView'
// import StudentStatsCard from './components/StudentStatsCard'

function App() {
  return (
    <>
      <AllRoutes />
      {/* <StudentsStatsListView name="Rushi" label1="Attendance" value1="78%" label2="Missed Casses" value2="2"/> */}
      {/* <StudentStatsCard label1="Attendance" value1="78%" label2 = {true} value2={"02/01/2022"}/> */}
      <Header
        label1="Attendance"
        value1="78%"
        label2={true}
        value2={"02/01/2022"}
      />
      <PlaneCard />
    </>
  );
}

export default App;
