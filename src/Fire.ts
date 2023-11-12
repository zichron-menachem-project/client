import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAEcAWL9_HLaweWk0B9k15WPh2b0o8SF24",
    authDomain: "rr-waze-final-project.firebaseapp.com",
    projectId: "rr-waze-final-project",
    storageBucket: "rr-waze-final-project.appspot.com",
    messagingSenderId: "180661079937",
    appId: "1:180661079937:web:704a4c7ec18a854053e280"
};

try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    console.error(err);
    console.error("Error initializing firebase app: " + firebaseConfig.apiKey);
}

export default firebase;
