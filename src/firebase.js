// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJk7CmKdFE3rsIfBeBsEqIiHWMr83Z6Y8",
  authDomain: "elessar-portfolio.firebaseapp.com",
  projectId: "elessar-portfolio",
  storageBucket: "elessar-portfolio.appspot.com",
  messagingSenderId: "824367513657",
  appId: "1:824367513657:web:90f30ae7cea9c43eda8de8",
  measurementId: "G-T8673EQP30",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
