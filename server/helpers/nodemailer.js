const nodemailer = require('nodemailer')

module.exports = {
    Mailer: (email, message) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_NODEMAILER,
                pass: process.env.PASSWORD_NODEMAILER
            }
        });

        var mailOptions = {
            from:  process.env.EMAIL_NODEMAILER,
            to: email,
            subject: `Information for you`,
            text: message
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}