import {
  firebase
} from "./src/scripts/firebase.js";
firebase.auth()
  .generateSignInWithEmailLink("rohitsahu.4998@gmail.com", {
    url: "http://localhost:8080/signinWithLink/" + "rohitsahu.4998@gmail.com"
  })
  .then(url => console.log(url));
