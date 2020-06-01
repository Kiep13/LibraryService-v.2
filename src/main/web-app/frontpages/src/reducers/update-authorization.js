const updateAuthorization = (state, action) => {

    const initialState = {
        isLoggedIn : false,
        loginField : "",
        passwordField : ""
    };

    if(state === undefined) {
        return initialState;
    }

    switch(action.type) {
        case 'LOG_IN' :
            return {
                ...state.authorizationBlock,
                isLoggedIn : true
            };
        case 'LOG_OUT' :
            return {
                ...state.authorizationBlock,
                isLoggedIn : false
            };
        case 'CLEAR_AUTHORIZATION_FIELDS':
            return initialState;
        case 'UPDATE_AUTHORIZATION_LOGIN_FIELD':
            return {
                ...state.authorizationBlock,
                loginField: action.payload
            };
        case 'UPDATE_AUTHORIZATION_PASSWORD_FIELD':
            return {
                ...state.authorizationBlock,
                passwordField: action.payload
            };
        default:
            return state.authorizationBlock
    }

};

export default updateAuthorization;