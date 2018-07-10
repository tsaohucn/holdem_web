import firebase from 'firebase'
// Initalize and export Firebase.
const config = {
  apiKey: "AIzaSyAWeP0OotxAxSektWi5b2oxJOXiPHuIJ9w",
  authDomain: "holdem-d55f7.firebaseapp.com",
  databaseURL: "https://holdem-d55f7.firebaseio.com",
  projectId: "holdem-d55f7",
  storageBucket: "",
  messagingSenderId: "37681178648"
};
export default firebase.initializeApp(config);