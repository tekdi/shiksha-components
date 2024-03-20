import AllRoutes from "./routes/routes";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";

import customTheme from "./customStyles.tsx";

function App() {
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <AllRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
