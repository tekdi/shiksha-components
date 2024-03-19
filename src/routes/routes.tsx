import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";

const Test = lazy(() => import("../components/Test"));

function AllRoutes(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Router>
      <Suspense fallback={<TextField>{t("COMMON.LOADING")}</TextField>}>
        <Routes>
          <Route path="/test" element={<Test />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AllRoutes;
