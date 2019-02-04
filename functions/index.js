const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const nodemailer = require("nodemailer");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Parth!");
// });

exports.sendWelcomeEmail = functions.auth.user().onCreate(user => {
  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "webmaster@gramiksha.in", // generated ethereal user
      pass: "ZVZYxZDcXZiE" // generated ethereal password
    }
  });
  var userObject = {
    uid: user.uid,
    email: user.email
  };
  let mailOptions = {
    from: "webmaster@gramiksha.in", // sender address
    to: user.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  };
  return transporter.sendMail(mailOptions);
});
