export const logIn = () => {
    return {
        type : 'LOG_IN'
    }
};

export const logOut = () => {
    return {
        type : 'LOG_OUT'
    }
};

export const authorizationClearFields = () => {
    return {
        type : 'CLEAR_AUTHORIZATION_FIELDS'
    }
};

export const authorizationUpdateLoginField = (value) => {
    return {
        type : 'UPDATE_AUTHORIZATION_LOGIN_FIELD',
        payload : value
    }
};

export const authorizationUpdatePasswordField = (value) => {
    return {
        type : 'UPDATE_AUTHORIZATION_PASSWORD_FIELD',
        payload : value
    }
};

