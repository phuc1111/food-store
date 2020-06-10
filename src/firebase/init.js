import firebase from 'firebase';
// import firestore from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyACDGAxQpTRvB-x7NO570Uc9vDM5UCZad4",
    authDomain: "food-store-84f73.firebaseapp.com",
    databaseURL: "https://food-store-84f73.firebaseio.com",
    projectId: "food-store-84f73",
    storageBucket: "food-store-84f73.appspot.com",
    messagingSenderId: "1031292224381",
    appId: "1:1031292224381:web:efb16ab97f1c67589dc214",
    measurementId: "G-NWF2Y87L1Q"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true })
export default firebaseApp.firestore()