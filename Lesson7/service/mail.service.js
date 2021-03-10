const mailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { ROOT_EMAIL, ROOT_EMAIL_PASSWORD } = require('../config/config');
const templates = require('../email-templates/index');
const { errorMessage: { WRONG_EMAIL_ACTION } } = require('../message');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const sendEmail = async (userEmail, action, context) => {
    try {
        const templateInfo = templates[action];

        if (!templateInfo) {
            throw new Error(WRONG_EMAIL_ACTION);
        }

        const html = await templateParser.render(templateInfo.templateName, context);

        return transporter.sendMail({
            from: 'Test',
            to: userEmail,
            subject: templateInfo.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendEmail
};
