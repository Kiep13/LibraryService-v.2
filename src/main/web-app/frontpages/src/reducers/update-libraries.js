const updateLibraries = (state, action) => {

    const initialState = {
        libraries : [],
        loading : true,
        isAddWindow : false,
        isEditWindow : false,
        addLibrary : {
            addName : "",
            addAddress : "",
            addTelephone : ""
        },
        editLibrary : {
            editName : "",
            editAddress : "",
            editTelephone : ""
        },
        selectedItem : null
    };

    if(state === undefined) {
        return initialState;
    }

    switch(action.type) {
        case 'FETCH_LIBRARIES_REQUEST' :
            return {
                ...initialState,
                loading: true,
            };
        case 'FETCH_LIBRARIES_SUCCESS' :
            return {
                ...initialState,
                libraries : action.payload,
                loading : false
            };
        case 'SHOW_ADD_LIBRARIES_WINDOW':
            return {
                ...state.librariesList,
                isAddWindow: action.payload
            };
        case 'SHOW_EDIT_LIBRARIES_WINDOW':
            return {
                ...state.librariesList,
                isEditWindow: action.payload
            };
        case 'UPDATE_LIBRARY_ADD_NAME_FIELD' :
            return {
                ...state.librariesList,
                addLibrary: {
                    ...state.librariesList.addLibrary,
                    addName : action.payload
                }
            };
        case 'UPDATE_LIBRARY_ADD_ADDRESS_FIELD' :
            return {
                ...state.librariesList,
                addLibrary: {
                    ...state.librariesList.addLibrary,
                    addAddress : action.payload
                }
            };
        case 'UPDATE_LIBRARY_ADD_TELEPHONE_FIELD' :
            return {
                ...state.librariesList,
                addLibrary: {
                    ...state.librariesList.addLibrary,
                    addTelephone : action.payload
                }
            };
        case 'UPDATE_LIBRARY_EDIT_NAME_FIELD' :
            return {
                ...state.librariesList,
                editLibrary: {
                    ...state.librariesList.editLibrary,
                    editName : action.payload
                }
            };
        case 'UPDATE_LIBRARY_EDIT_ADDRESS_FIELD' :
            return {
                ...state.librariesList,
                editLibrary: {
                    ...state.librariesList.editLibrary,
                    editAddress: action.payload
                }
            };
        case 'UPDATE_LIBRARY_EDIT_TELEPHONE_FIELD' :
            return {
                ...state.librariesList,
                editLibrary: {
                    ...state.librariesList.editLibrary,
                    editTelephone : action.payload
                }
            };
        case 'UPDATE_LIBRARY_SELECTED_ITEM' :
            return {
                ...state.librariesList,
                editLibrary: action.payload.library,
                selectedItem: action.payload.id
            };
        default:
            return state.librariesList
    }

};

export default updateLibraries;