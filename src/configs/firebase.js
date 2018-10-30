import firebase from 'firebase'
// Initalize and export Firebase.
const config = {
  apiKey: 'AIzaSyDvF8-EWzxsd9VNUqGciE4fIvEL-ro1ZXw',
  authDomain: 'holdem-test-fdbb4.firebaseapp.com',
  databaseURL: 'https://holdem-test-fdbb4.firebaseio.com',
  projectId: 'holdem-test-fdbb4',
  storageBucket: 'holdem-test-fdbb4.appspot.com',
  messagingSenderId: '482024138445'
}
export default firebase.initializeApp(config)