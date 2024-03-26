import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import Dashboard from "../pages/Dashboard";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const MyClassDetails = lazy(() => import("../pages/MyClassDetails"));

function AllRoutes(): JSX.Element {
  const { t } = useTranslation();
  return (
    <Router>
      <Suspense fallback={<TextField>{t("COMMON.LOADING")}</TextField>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/classDetails" element={<MyClassDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AllRoutes;
