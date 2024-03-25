import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import AllRoutes from './routes/routes.tsx';

import customTheme from './customStyles.tsx';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import AttendanceStatusListView from './components/AttendanceStatusListView.tsx';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* <AllRoutes /> */}
      <AttendanceStatusListView studentName='Nawaz' isEdit={true} currentStatus='present' />
    </ThemeProvider>
  );
}

export default App;
