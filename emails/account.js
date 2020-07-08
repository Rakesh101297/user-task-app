const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendwelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'aswathrakesh7@gmail.com',
    subject: 'Confirmation',
    text: `Confirm Account!!`,
  });
};



module.exports = {
  sendwelcomeEmail
};
