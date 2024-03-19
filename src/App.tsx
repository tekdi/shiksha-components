import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import "./App.css";
// import Header from "./components/Header";
// import StudentsStatsListView from './components/StudentsStatsListView'
// import StudentStatsCard from './components/StudentStatsCard'
import LoginPage from './pages/LoginPage.tsx';

import customTheme from "./customStyles.tsx";

function App() {

  return (
    <ThemeProvider theme={customTheme}>
      <LoginPage />
    </ThemeProvider>

  );
}

export default App;
