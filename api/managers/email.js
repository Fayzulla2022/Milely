// Load environment variables from .env file
require("dotenv").config();

// Import SendGrid mail module
const sgMail = require("@sendgrid/mail");

// Set the SendGrid API key from environment variables
sgMail.setApiKey(process.env.SG_API);

module.exports = {
  // Function to send an email
  send: (obj) => {
    return new Promise((resolve, reject) => {
      const msg = {
        to: obj.to,
        from: process.env.EMAIL_FROM,
        subject: obj.subject,
        html: obj.html,
      };

      // Send the email
      sgMail
        .send(msg)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
