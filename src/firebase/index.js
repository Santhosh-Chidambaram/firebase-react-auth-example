import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  const userDoc = await getUserDocument(user.uid);
  return userDoc;
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

const uploadArrayOfImages = (myArray) => {
  const promises = myArray.map(async (item) => {
    return {
      className: item.className,
      studentRosterUrl: await handleUploadToBucket(item.rosterFile),
    };
  });
  return Promise.all(promises);
};

export const generateEnrollDocument = async (uid, enrollmentData) => {
  try {
    const enrollDoc = firestore.doc(`enrollements/${uid}`);
    const snapshot = await enrollDoc.get();
    let studentRosters = [];
    let teacherRosterUrl;
    if (!snapshot.exists) {
      const { plan, studentRoster, teacherRoster } = enrollmentData;

      studentRosters = await uploadArrayOfImages(studentRoster);

      teacherRosterUrl = await handleUploadToBucket(teacherRoster);

      console.log(studentRosters, teacherRosterUrl, plan);
      await enrollDoc.set({
        plan,
        studentRosters,
        teacherRosterUrl,
      });

      return "Success";
    }
    throw new Error("EnrollMent Already Exists");
  } catch (error) {
    console.error(error);
  }
};

export const getEnrolledDocument = async (uid) => {
  const enrollDocRef = firestore.doc(`enrollements/${uid}`);
  const snapshot = await enrollDocRef.get();
  if (snapshot.exists) {
    console.log("snapshot exits");
    return true;
  }
  console.log("Snapshot doesnt exits");
  return false;
};

export const handleUploadToBucket = async (mediaFile, uid = "dsakda") => {
  const storageRef = firebase.storage().ref();
  const uploadRef = storageRef.child(mediaFile.name);
  try {
    await uploadRef.put(mediaFile);
    console.log("success");
    return await uploadRef.getDownloadURL();
  } catch (error) {
    console.log(error);
    throw new Error("Upload Error");
  }
};
