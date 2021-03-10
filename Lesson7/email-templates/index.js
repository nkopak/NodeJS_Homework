const { emailAction } = require('../constants');

module.exports = {
    [emailAction.USER_REGISTERED]: {
        templateName: 'userRegistered',
        subject: 'You have been registered'
    },

    [emailAction.USER_DELETED]: {
        templateName: 'userDeleted',
        subject: 'You have been deleted'
    },
};
