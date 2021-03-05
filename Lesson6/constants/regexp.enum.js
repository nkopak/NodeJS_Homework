module.exports = {
    EMAIL_REGEXP: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/),
    PASSWORD_REGEXP: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
    REGISTRATION_PLATES_REGEXP: new RegExp(/^[A-Z]{2}[0-9]{4}[A-Z]{2}$/)
};
