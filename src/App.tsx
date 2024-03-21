import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import customTheme from "./customStyles.tsx";
import AllRoutes from "./routes/routes.tsx";
function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <AllRoutes />
    </ThemeProvider>
  );
}
export default App;
