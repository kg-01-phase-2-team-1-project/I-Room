const sendEmail = (email, message) => {
    const mailgunApiKey = process.env.MAILGUN_API_KEY;
    const mailgunDomain = process.env.MAILGUN_DOMAIN;

    const mailgun = require('mailgun-js')({apiKey: mailgunApiKey, domain: mailgunDomain});

    const data = {
        from: 'I-Room <not-reply@i-room.mailgun.org>',
        to: email,
        subject: "Welcome to I-Room",
        text: message,
    };

    mailgun.messages().send(data, (error, body) => {
        error ? console.log(error) : console.log(body);
    })
}

module.exports = {sendEmail};