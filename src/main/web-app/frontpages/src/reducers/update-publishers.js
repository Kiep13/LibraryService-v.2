const updatePublishersList = (state, action) => {

    const initialState = {
        publishers : [],
        loading : true,
        addPublisher : "",
        editPublisher : "",
        selectedItem : null
    };

    if(state === undefined) {
        return initialState;
    }

    switch(action.type) {
        case 'FETCH_PUBLISHERS_REQUEST':
            return {
                ...initialState,
                publishers : [],
                loading: true,
            };
        case 'FETCH_PUBLISHERS_SUCCESS':
            return {
                ...initialState,
                publishers : action.payload,
                loading: false
            };
        case 'SHOW_ADD_PUBLISHERS_WINDOW':
            return {
                ...state.publishersList,
                isAddWindow: action.payload
            };
        case 'SHOW_EDIT_PUBLISHERS_WINDOW':
            return {
                ...state.publishersList,
                isEditWindow: action.payload
            };
        case 'UPDATE_PUBLISHER_ADD_FIELD':
            return {
                ...state.publishersList,
                addPublisher: action.payload
            };
        case 'UPDATE_PUBLISHER_EDIT_FIELD':
            return {
                ...state.publishersList,
                editPublisher: action.payload
            };
        case 'UPDATE_PUBLISHER_SELECTED_ITEM':
            return {
                ...state.publishersList,
                editPublisher: action.payload.text,
                selectedItem: action.payload.id
            };
        default :
            return state.publishersList;
    }

};

export default updatePublishersList;