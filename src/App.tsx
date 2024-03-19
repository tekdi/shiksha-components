import React from "react";
import AllRoutes from "./routes/routes";
import "./App.css";
import Header from "./components/Header";
function App() {
  return (
    <>
      <Header
        label1="Attendance"
        value1="78%"
        label2={true}
        value2={"02/01/2022"}
      />
      <AllRoutes />
    </>
  );
}

export default App;
