import React from "react";
import EnrollContextProvider from "./../../context/EnrollContext";
import EnrollPage from "./EnrollPage";

const EnrollIndexPage = () => {
  return (
    <EnrollContextProvider>
      <EnrollPage />
    </EnrollContextProvider>
  );
};

export default EnrollIndexPage;
