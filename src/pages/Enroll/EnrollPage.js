import React from "react";
import SwipeableViews from "react-swipeable-views";
import SnackbarComponent from "../../components/Snackbar";
import FinalizePage from "./FinalizePage";
import SelectPlan from "./SelectPlan";
import StudentRoster from "./StudentRoster";
import TeacherRoster from "./TeacherRoster";
import LoadingBackdrop from "./../../components/LoadingBackdrop";
import { useEnrollContext } from "../../context/EnrollContext";
import HeaderTab from "../../components/HeaderTab";
const swiperViewStyle = {
  height: "auto",
};

const swiperContainerStyle = {
  height: "auto",
};

const slideStyle = {
  height: "auto",
};

const EnrollPage = () => {
  const {
    alertState,
    currentIndex,
    isUploading,
    setCurrentIndex,
    handleAlertClose,
  } = useEnrollContext();
  return (
    <div style={{ height: "100%", backgroundColor: "white" }}>
      <SnackbarComponent
        open={alertState.open}
        handleClose={handleAlertClose}
        message={alertState.message}
        type="error"
      />
      {currentIndex < 3 && <HeaderTab />}
      <SwipeableViews
        disabled={true}
        style={swiperViewStyle}
        containerStyle={swiperContainerStyle}
        slideStyle={slideStyle}
        index={currentIndex}
        onChangeIndex={(index) => {
          setCurrentIndex(index);
        }}
      >
        <SelectPlan />
        <StudentRoster />
        <TeacherRoster />
        <FinalizePage />
      </SwipeableViews>
      <LoadingBackdrop open={isUploading} />
    </div>
  );
};

export default EnrollPage;
