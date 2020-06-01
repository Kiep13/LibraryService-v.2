const updateError = (state, action) => {

    const initialState = false;

    if(state === undefined) {
        return initialState;
    }

    if (action.type === 'FETCH_FAILURE') {
        return action.payload;
    } else {
        return state.error;
    }

};

export default updateError;