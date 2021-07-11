import React from "react";
import SwipeableViews from "react-swipeable-views";
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
  const pageSize = 3; //Starting from 0
  const [enrollmenForm, setEnrollmentForm] = React.useState({
    plan: "",
    student_roster: "",
    teacher_roaster: "",
  });

  const handleSetForm = (formData) => {
    setEnrollmentForm({
      ...enrollmenForm,
      [formData.name]: formData.value,
    });
    moveForward();
  };
  const moveForward = () => {
    if (currentIndex < pageSize) setCurrentIndex(currentIndex + 1);
  };
  const moveBackward = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  return (
    <EnrollContext.Provider
      value={{
        currentIndex,
        moveForward,
        moveBackward,
        handleSetForm,
      }}
    >
      <SwipeableViews
        style={swiperViewStyle}
        containerStyle={swiperContainerStyle}
        slideStyle={slideStyle}
        index={currentIndex}
      >
        <SelectPlan />
        <StudentRoster />
        <TeacherRoster />
        <FinalizePage />
      </SwipeableViews>
    </EnrollContext.Provider>
  );
};

export default EnrollPage;
