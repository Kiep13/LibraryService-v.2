export const registrationsClearFields = () => {
    return {
        type : 'CLEAR_REGISTRATION_FIELDS'
    }
};

export const registrationUpdateLoginField = (value) => {
    return {
        type : 'UPDATE_REGISTRATION_LOGIN_FIELD',
        payload : value
    }
};

export const registrationUpdatePasswordField = (value) => {
    return {
        type : 'UPDATE_REGISTRATION_PASSWORD_FIELD',
        payload : value
    }
};

export const registrationUpdateRepeatPasswordField = (value) => {
    return {
        type : 'UPDATE_REGISTRATION_REPEAT_PASSWORD_FIELD',
        payload : value
    }
};
