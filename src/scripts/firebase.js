import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDkyNTGxE25OKiAkEEeMQzy5P-andW7yQk",
  authDomain: "gmportal-b4054.firebaseapp.com",
  databaseURL: "https://gmportal-b4054.firebaseio.com",
  projectId: "gmportal-b4054",
  storageBucket: "gmportal-b4054.appspot.com",
  messagingSenderId: "238141181023"
};
firebase.initializeApp(config);
var db = firebase.firestore();
var storage = firebase.storage();
const settings = { /* your settings... */
  timestampsInSnapshots: true
};
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
db.settings(settings);
export {
  firebase,
  db,
  storage
}
