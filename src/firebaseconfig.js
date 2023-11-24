// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMHC5GAlHroSmYZOtlcXKiiRO4MBto_wU",
  authDomain: "mychatapp-34da9.firebaseapp.com",
  projectId: "mychatapp-34da9",
  storageBucket: "mychatapp-34da9.appspot.com",
  messagingSenderId: "578875155400",
  appId: "1:578875155400:web:88ee913c8b1b851d19d6fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig