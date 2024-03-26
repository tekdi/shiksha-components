import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import AllRoutes from './routes/routes.tsx';

import { Container } from '@mui/material';
import customTheme from './customStyles.tsx';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* <CssBaseline /> */}
      <Container maxWidth="md" sx={{ p: 0 }}>
        <AllRoutes />
      </Container>
    </ThemeProvider>
  );
}
export default App;
