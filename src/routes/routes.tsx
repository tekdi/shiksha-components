import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, redirect, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import Dashboard from '../pages/Dashboard';

import PrivateRoute from '../utils/PrivateRoute';
import PageNotFound from '../pages/PageNotFound';

// lazy loading components
const MyClassDetails = lazy(() => import('../pages/MyClassDetails'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const Profile = lazy(() => import('../pages/Profile'));
const StudentDetails = lazy(() => import('../pages/StudentDetails'));
const Logout = lazy(() => import('../components/Logout'));
const UserAttendanceHistory = lazy(() => import('../pages/UserAttendanceHistory'));
const ClassAttendanceHistory = lazy(() => import('../pages/ClassAttendanceHistory'));
const StudentAttendanceHistory = lazy(() => import('../pages/StudentAttendanceHistory'));

function AllRoutes(): JSX.Element {
  const { t } = useTranslation();
  return (
    <Router>
      <Suspense fallback={<TextField>{t('COMMON.LOADING')}</TextField>}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/student-details/:cohortId/:userId" element={<StudentDetails />} />/
            <Route path="/class-details/:cohortId" element={<MyClassDetails />} />
            <Route path="/user-attendance-history" element={<UserAttendanceHistory />} />
            <Route
              path="/student-attendance-history/:userId/:cohortId"
              element={<StudentAttendanceHistory />}
            />
            <Route
              path="/class-attendance-history/:cohortId"
              element={<ClassAttendanceHistory />}
            />
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AllRoutes;
