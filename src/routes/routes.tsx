import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const StudentDetails = lazy(() => import("../pages/StudentBasicDetails"));

function AllRoutes(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Router>
      <Suspense fallback={<TextField>{t("COMMON.LOADING")}</TextField>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/basicdetails" element={<StudentDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AllRoutes;
