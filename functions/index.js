const functions = require("firebase-functions");
var admin = require("firebase-admin");
var serviceAccount = require("./gmportal-b4054-firebase-adminsdk-2l548-03dba39b4a.json");

admin.initializeApp();
var auth = admin.auth();
exports.createUser = functions.firestore
  .document("unverified/{uid}")
  .onCreate((data, context) => {
    var newUser = data.data();
    var isvol=newUser.post==="vol"
    var isprog=!isvol;
    return auth
      .createUser({
        email: newUser.email,
        emailVerified: false,
        disabled: false,
      }).then((createdUser)=>{
        return admin.auth().setCustomUserClaims(     createdUser.uid, {isvol,isprog})
   
      })
      .then(() => {
        return auth.generateSignInWithEmailLink(newUser.email, {
          url: "http://localhost:8080/signinWithLink/" + newUser.email
        });
      })
      .then(link => {
        console.log(link)
        var sendVerification = require("./verificationMailer")
        return sendVerification.handler(newUser.email, link)
      })
      .then(() => {
        return Promise.resolve()
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  });
