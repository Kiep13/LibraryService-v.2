const updateRegistration = (state, action) => {

    const initialState = {
        loginField : "",
        passwordField : "",
        repeatPasswordField : ""
    };

    if(state === undefined) {
      return initialState;
    }

    switch(action.type) {
        case 'CLEAR_REGISTRATION_FIELDS':
            return initialState;
        case 'UPDATE_REGISTRATION_LOGIN_FIELD':
            return {
                ...state.registrationBlock,
                loginField: action.payload
            };
        case 'UPDATE_REGISTRATION_PASSWORD_FIELD':
            return {
                ...state.registrationBlock,
                passwordField: action.payload
            };
        case 'UPDATE_REGISTRATION_REPEAT_PASSWORD_FIELD':
            return {
                ...state.registrationBlock,
                repeatPasswordField: action.payload
            };
        default:
            return state.registrationBlock
    }

};

export default updateRegistration;