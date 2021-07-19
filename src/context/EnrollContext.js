import React, { useContext, useState } from "react";
import { generateEnrollDocument } from "../firebase";
import generateId from "../pages/Enroll/util";
import { planData } from "./../pages/Enroll/data";
import { useAuth } from "./AuthContext";

export const EnrollContext = React.createContext();

export function useEnrollContext() {
  return useContext(EnrollContext);
}

const EnrollContextProvider = (props) => {
  const { currentUser } = useAuth();
  //Swiper Controllers
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const pageSize = 3; //Starting from 0

  //Swiper Actions
  const moveForward = () => {
    if (currentIndex < pageSize) setCurrentIndex(currentIndex + 1);
  };

  const moveBackward = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  //End of Swiper Controllers

  //Alert State
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
  });

  //Handle ALert Close
  //Alert Close
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertState({
      ...alertState,
      open: false,
      message: "",
    });
  };

  //EnrollMent Form

  const [enrollmentForm, setEnrollmentForm] = React.useState({
    plan: "",
    studentRoster: [
      {
        key: generateId(3),
        className: "",
        rosterFile: null,
      },
    ],
    teacherRoster: null,
  });
  const [isUploading, setIsUploading] = useState(false);

  //Function to set value to the enrollmentForm by fieldName and value
  const handleSetForm = (formData) => {
    setEnrollmentForm({
      ...enrollmentForm,
      [formData.name]: formData.value,
    });
    // moveForward();
  };

  //Function to update the value in studentRoasterList
  const updateStudentRoaster = (rosterForm) => {
    const updatedStudentRoaster = enrollmentForm.studentRoster.map((item) => {
      if (item.key === rosterForm.key) {
        item = rosterForm;
        return item;
      }
      return item;
    });
    setEnrollmentForm({
      ...enrollmentForm,
      studentRoster: updatedStudentRoaster,
    });
  };

  //Function to add class in studentRoaster
  const handleAddClass = () => {
    const newStudentRoster = [...enrollmentForm.studentRoster];

    newStudentRoster.push({
      key: generateId(3),
      className: "",
      roasterFile: null,
    });
    setEnrollmentForm({
      ...enrollmentForm,
      studentRoster: newStudentRoster,
    });
  };

  //Function to check if studentRoaster is Filled and proceed to Next
  const handleSRContinue = () => {
    if (
      !enrollmentForm.studentRoster[0].rosterFile &&
      enrollmentForm.studentRoster[0].className === ""
    ) {
      setAlertState({
        ...alertState,
        open: true,
        message: "Classname and Student Roster File is not filled",
      });
      return;
    }
    if (!enrollmentForm.studentRoster[0].rosterFile) {
      setAlertState({
        ...alertState,
        open: true,
        message: "Student Roster File is not uploaded",
      });
      return;
    }
    if (enrollmentForm.studentRoster[0].className === "") {
      setAlertState({
        ...alertState,
        open: true,
        message: "Student Classname is not filled",
      });
      return;
    }

    moveForward();
  };

  //Function to check if teacherRoaster is Filled and proceed to Next
  const handleTRContinue = async () => {
    if (!enrollmentForm.teacherRoster) {
      setAlertState({
        ...alertState,
        open: true,
        message: "Teacher Roaster File is not uploaded",
      });
      return;
    }

    setIsUploading(true);
    try {
      const selectedPlan = planData.filter(
        (e) => e.key === parseInt(enrollmentForm.plan)
      )[0];

      const enrollmentData = {
        ...enrollmentForm,
        plan: selectedPlan.title,
      };
      await generateEnrollDocument(currentUser?.uid, enrollmentData);
      setIsUploading(false);
      moveForward();
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  };

  return (
    <EnrollContext.Provider
      value={{
        currentIndex,
        setCurrentIndex,
        moveForward,
        moveBackward,
        handleSetForm,
        enrollmentForm,
        handleAddClass,
        updateStudentRoaster,
        handleSRContinue,
        handleTRContinue,
        handleAlertClose,
        alertState,
        isUploading,
      }}
    >
      {props.children}
    </EnrollContext.Provider>
  );
};

export default EnrollContextProvider;
