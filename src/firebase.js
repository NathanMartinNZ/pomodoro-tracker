// Config file
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBdtQPrz2z6KIoW_pvTnso2Tgn7W8p_UXU",
  authDomain: "pomodoro-tracker-45d06.firebaseapp.com",
  databaseURL: "https://pomodoro-tracker-45d06.firebaseio.com",
  projectId: "pomodoro-tracker-45d06",
  storageBucket: "pomodoro-tracker-45d06.appspot.com",
  messagingSenderId: "1021302381442",
  appId: "1:1021302381442:web:4ded79f2374ef18bac8d9b",
};

const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export default app;
