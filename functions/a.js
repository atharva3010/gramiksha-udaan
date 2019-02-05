var sendVerification = require("./verificationMailer")
sendVerification.handler("rohit sahu", "rohitsahu.4998@gmail.com", "google.com").then(() => {
  return console.log("done")
}).catch((err) => {
  return console.log(
    err)
})
