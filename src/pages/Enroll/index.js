import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import SnackbarComponent from "../../components/Snackbar";
import FinalizePage from "./FinalizePage";
import SelectPlan from "./SelectPlan";
import StudentRoster from "./StudentRoster";
import TeacherRoster from "./TeacherRoster";

const swiperViewStyle = {
  overflowX: "hidden",
  height: "100%",
};

const swiperContainerStyle = {
  height: "100%",
};

const slideStyle = {};

export const EnrollContext = React.createContext();

const EnrollPage = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  let currentKey = 0; //for Student Roaster Uniq key
  const pageSize = 3; //Starting from 0

  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
  });
  //EnrollMent Form
  const [enrollmentForm, setEnrollmentForm] = React.useState({
    plan: "",
    studentRoaster: [
      {
        key: currentKey,
        className: "",
        roasterFile: null,
      },
    ],
    teacherRoaster: null,
  });

  //Function to set value to the enrollmentForm by fieldName and value
  const handleSetForm = (formData) => {
    setEnrollmentForm({
      ...enrollmentForm,
      [formData.name]: formData.value,
    });
    // moveForward();
  };

  //Function to update the value in studentRoasterList
  const updateStudentRoaster = (roasterForm) => {
    const updatedStudentRoaster = enrollmentForm.studentRoaster.map((item) => {
      if (item.key === roasterForm.key) {
        item = roasterForm;
        return item;
      }
      return item;
    });
    setEnrollmentForm({
      ...enrollmentForm,
      studentRoaster: updatedStudentRoaster,
    });
  };

  //Function to add class in studentRoaster
  const handleAddClass = () => {
    const newStudentRoaster = [...enrollmentForm.studentRoaster];
    newStudentRoaster.push({
      key: ++currentKey,
      className: "",
      roasterFile: null,
    });
    setEnrollmentForm({
      ...enrollmentForm,
      studentRoaster: newStudentRoaster,
    });
  };

  //Swiper Actions
  const moveForward = () => {
    if (currentIndex < pageSize) setCurrentIndex(currentIndex + 1);
  };
  const moveBackward = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  //Alert Close
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertState({
      ...alertState,
      open: false,
      message: "",
    });
  };

  //Funtion to check if studentRoaster is Filled
  const handleSRContinue = () => {
    if (
      !enrollmentForm.studentRoaster[0].roasterFile &&
      enrollmentForm.studentRoaster[0].className === ""
    ) {
      setAlertState({
        ...alertState,
        open: true,
        message: "Classname and Student Roaster File is not filled",
      });
      return;
    }
    if (!enrollmentForm.studentRoaster[0].roasterFile) {
      setAlertState({
        ...alertState,
        open: true,
        message: "Student Roaster File is not uploaded",
      });
      return;
    }
    if (enrollmentForm.studentRoaster[0].className === "") {
      setAlertState({
        ...alertState,
        open: true,
        message: "Student Classname is not filled",
      });
      return;
    }

    moveForward();
  };

  return (
    <EnrollContext.Provider
      value={{
        currentIndex,
        moveForward,
        moveBackward,
        handleSetForm,
        enrollmentForm,
        handleAddClass,
        updateStudentRoaster,
        handleSRContinue,
      }}
    >
      <div style={{ height: "100%" }}>
        <SnackbarComponent
          open={alertState.open}
          handleClose={handleClose}
          message={alertState.message}
          type="error"
        />
        <SwipeableViews
          style={swiperViewStyle}
          containerStyle={swiperContainerStyle}
          slideStyle={slideStyle}
          index={currentIndex}
          enableMouseEvents
          onChangeIndex={(index) => {
            setCurrentIndex(index);
          }}
        >
          <SelectPlan />
          <StudentRoster />
          <TeacherRoster />
          <FinalizePage />
        </SwipeableViews>
      </div>
    </EnrollContext.Provider>
  );
};

export default EnrollPage;
