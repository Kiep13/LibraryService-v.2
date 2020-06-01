const updateAuthorsList = (state, action) => {

    const initialState = {
        authors : [],
        loading : true,
        isAddWindow : false,
        isEditWindow : false,
        addAuthor : {
            addSurname : "",
            addName : "",
            addPatronymic : ""
        },
        editAuthor : {
            editSurname : "",
            editName : "",
            editPatronymic : ""
        },
        selectedItem : null
    };

    if(state === undefined) {
        return initialState
    }

    switch (action.type) {
        case 'FETCH_AUTHORS_REQUEST':
            return {
                ...initialState,
                loading: true,
            };
        case 'FETCH_AUTHORS_SUCCESS':
            return {
                ...initialState,
                authors : action.payload,
                loading: false
            };
        case 'SHOW_ADD_AUTHORS_WINDOW':
            return {
                ...state.authorsList,
                isAddWindow: action.payload
            };
        case 'SHOW_EDIT_AUTHORS_WINDOW':
            return {
                ...state.authorsList,
                isEditWindow: action.payload
            };
        case 'UPDATE_AUTHOR_ADD_SURNAME_FIELD':
            return {
                ...state.authorsList,
                addAuthor: {
                    ...state.authorsList.addAuthor,
                    addSurname : action.payload
                }
            };
        case 'UPDATE_AUTHOR_ADD_NAME_FIELD':
            return {
                ...state.authorsList,
                addAuthor: {
                    ...state.authorsList.addAuthor,
                    addName : action.payload
                }
            };
        case 'UPDATE_AUTHOR_ADD_PATRONYMIC_FIELD':
            return {
                ...state.authorsList,
                addAuthor: {
                    ...state.authorsList.addAuthor,
                    addPatronymic : action.payload
                }
            };
        case 'UPDATE_AUTHOR_EDIT_SURNAME_FIELD':
            return {
                ...state.authorsList,
                editAuthor: {
                    ...state.authorsList.editAuthor,
                    editSurname : action.payload
                }
            };
        case 'UPDATE_AUTHOR_EDIT_NAME_FIELD':
            return {
                ...state.authorsList,
                editAuthor: {
                    ...state.authorsList.editAuthor,
                    editName : action.payload
                }
            };
        case 'UPDATE_AUTHOR_EDIT_PATRONYMIC_FIELD':
            return {
                ...state.authorsList,
                editAuthor: {
                    ...state.authorsList.editAuthor,
                    editPatronymic : action.payload
                }
            };
        case 'UPDATE_AUTHOR_SELECTED_ITEM':
            return {
                ...state.authorsList,
                editAuthor: action.payload.author,
                selectedItem: action.payload.id
            };
        default :
            return state.authorsList;
    }
};

export default updateAuthorsList;