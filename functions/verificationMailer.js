const nodemailer = require("nodemailer");
EmailTemplate = require('email-templates').EmailTemplate
exports.handler = (email, link) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "Zoho",
      host: "smtp.zoho.com",
      requireTLS: false,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "webmaster@gramiksha.in", // generated ethereal user
        pass: "ZVZYxZDcXZiE" // generated ethereal password
      }
    });

    let context = {
      link
    }
    return loadTemplate(context).then((result) => {
      let mailOptions = {
        from: "webmaster@gramiksha.in", // sender address
        to: email, // list of receivers
        subject: result.subject, // Subject line
        text: result.text, // plain text body
        html: result.html // html body
      }
      return transporter.sendMail(mailOptions, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    }).catch(err => {
      console.log(err)
      reject(err)
    })

    // return transporter.sendMail(mailOptions, (err) => {
    //   if (err) {
    //     reject(err)
    //   } else {
    //     resolve()
    //   }
    // })
  })
}

function loadTemplate(context) {
  let template = new EmailTemplate("./verification");
  return new Promise((resolve, reject) => {
    template.render(context, (err, result) => {
      if (err) reject(err);
      else resolve(
        result
      );
    });
  });

}
