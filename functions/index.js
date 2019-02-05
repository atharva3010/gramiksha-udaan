const functions = require("firebase-functions");
var admin = require("firebase-admin");
var sendVerification = require("./verificationMailer")
var serviceAccount = require("./gmportal-b4054-firebase-adminsdk-2l548-03dba39b4a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gmportal-b4054.firebaseio.com"
});
var auth = admin.auth();
exports.createUser = functions.firestore
  .document("unverified/{uid}")
  .onCreate((data, context) => {
    var newUser = data.data();
    return auth
      .createUser({
        email: newUser.email,
        emailVerified: false,
        disabled: false,
      })
      .then(() => {
        return auth.generateSignInWithEmailLink(newUser.email, {
          url: "http://localhost:8080/signinWithLink/" + newUser.email
        });
      })
      .then(url => {
        return auth.generateEmailVerificationLink(newUser.email, {
          url: url
        });
      })
      .then(link => {
        return sendVerification.handler(newUser.name, newUser.email, link)
      })
      .then(Promise.resolve())
      .catch((err) => Promise.reject(err))
  });
