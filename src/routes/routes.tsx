import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Test = lazy(() => import("../components/Test"));

function AllRoutes(): JSX.Element {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/test" element={<Test />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AllRoutes;
