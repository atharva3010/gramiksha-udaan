const functions = require('firebase-functions');
var admin = require('firebase-admin');

var serviceAccount = require("./gmportal-b4054-firebase-adminsdk-2l548-03dba39b4a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gmportal-b4054.firebaseio.com"
});
var auth = admin.auth()
exports.createUser = functions.firestore.document("unverified/{uid}").onCreate((data, context) => {
  var newUser = data.data()
  return auth.createUser({
    email: newUser.email,
    emailVerified: false,
    disabled: false,
  }).then(() => {
    return auth.generateEmailVerificationLink(newUser.email)
  }).then((link) => {
    return
  })
})
