import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import AllRoutes from "./routes/routes.tsx";

import customTheme from "./customStyles.tsx";

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <AllRoutes />
    </ThemeProvider>
  );
}

export default App;
