import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import Dashboard from '../pages/Dashboard';

const MyClassDetails = lazy(() => import('../pages/MyClassDetails'));
import PrivateRoute from '../utils/PrivateRoute';
const LoginPage = lazy(() => import('../pages/LoginPage'));
const Profile = lazy(() => import('../pages/Profile'));
const StudentDetails = lazy(() => import('../pages/StudentBasicDetails'));

function AllRoutes(): JSX.Element {
  const { t } = useTranslation();
  return (
    <Router>
      <Suspense fallback={<TextField>{t('COMMON.LOADING')}</TextField>}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student-details" element={<StudentDetails />} />
            <Route path="/class-details" element={<MyClassDetails />} />
          </Route>
        </Routes>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AllRoutes;
