const updateGenresList = (state, action) => {

    const initialState = {
        genres : [],
        loading : true,
        isAddWindow : false,
        isEditWindow : false,
        addGenreField : "",
        editGenreField : "",
        selectedItem : null
    };

    if(state === undefined) {
        return initialState
    }

    switch (action.type) {
        case 'FETCH_GENRES_REQUEST':
            return {
                ...initialState,
                loading: true,
            };
        case 'FETCH_GENRES_SUCCESS':
            return {
                ...initialState,
                genres : action.payload,
                loading: false
            };
        case 'SHOW_ADD_GENRE_WINDOW':
            return {
                ...state.genresList,
                isAddWindow: action.payload
            };
        case 'SHOW_EDIT_GENRE_WINDOW':
            return {
                ...state.genresList,
                isEditWindow: action.payload
            };
        case 'UPDATE_GENRE_ADD_FIELD':
            return {
                ...state.genresList,
                addGenreField: action.payload
            };
        case 'UPDATE_GENRE_EDIT_FIELD':
            return {
                ...state.genresList,
                editGenreField: action.payload
            };
        case 'UPDATE_GENRE_SELECTED_ITEM':
            return {
                ...state.genresList,
                editGenreField: action.payload.text,
                selectedItem: action.payload.id
            };
        default :
            return state.genresList;
    }
};

export default updateGenresList;