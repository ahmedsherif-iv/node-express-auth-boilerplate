const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');

const service = 'yahoo';
const email = 'ahmed.asa146@yahoo.com';
const password = '0102347791';

const transporter = nodemailer.createTransport({
    service: service,
    auth: {
        user: email,
        pass: password
    }
});

const getAttachments = (templateName) => {
    switch (templateName) {
        case 'confirm-email':
            return [{
                filename: 'email.png',
                path: './public/images/email.png',
                cid: 'email_logo'
            },]
        case 'forgot-password-email':
            return [];
        default:
            return [];
    }
}

const sendMail = async (to, subject, templateName, data) => {
    const template = fs.readFileSync(`./templates/${templateName}.ejs`, 'utf-8');
    const compiledTemplate = ejs.compile(template);
    const attachments = getAttachments(templateName);

    const mailOptions = {
        from: email,
        to: to,
        subject: subject,
        html: compiledTemplate(data),
        attachments: attachments
    };
    let info = await transporter.sendMail(mailOptions);
    transporter.close();
    return info;
}


module.exports = {
    sendMail,
}