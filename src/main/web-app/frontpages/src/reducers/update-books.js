const updateBooksList = (state, action) => {

    const initialState = {
        books : [],
        loading : true,
        isAddWindow : false,
        isEditWindow : false,
        addBook : {
            addTitle : "",
            addAuthor : {},
            addGenre : {},
            addYear : "",
            addPublisher : {},
            addAmountOfPages : ""
        },
        editBook : {
            editTitle : "",
            editAuthor : {},
            editGenre : {},
            editYear : "",
            editPublisher : {},
            editAmountOfPages : ""
        },
        initialBook : {
            initAuthor : {},
            initGenre : {},
            initPublisher : {},
        },
        selectedItem : null
    };

    if(state === undefined) {
        return initialState;
    }

    switch (action.type) {
        case 'FETCH_BOOKS_REQUEST':
            return {
                ...state.booksList,
                books : [],
                loading: true,
            };
        case 'FETCH_BOOKS_SUCCESS' :
            return {
                ...initialState,
                books : action.payload,
                loading : false,
                addBook: {
                    ...initialState.addBook,
                    addAuthor : state.booksList.initialBook.initAuthor,
                    addGenre : state.booksList.initialBook.initGenre,
                    addPublisher : state.booksList.initialBook.initPublisher
                }
            };
        case 'FETCH_AUTHORS_SUCCESS':
            return {
                ...state.booksList,
                addBook : {
                    ...state.booksList.addBook,
                    addAuthor : action.payload[0]
                },
                initialBook: {
                    ...state.booksList.initialBook,
                    initAuthor: action.payload[0]
                }
            };
        case 'FETCH_GENRES_SUCCESS':
            return {
                ...state.booksList,
                addBook : {
                    ...state.booksList.addBook,
                    addGenre : action.payload[0]
                },
                initialBook: {
                    ...state.booksList.initialBook,
                    initGenre: action.payload[0]
                }
            };
        case 'FETCH_PUBLISHERS_SUCCESS':
            return {
                ...state.booksList,
                addBook : {
                    ...state.booksList.addBook,
                    addPublisher : action.payload[0]
                },
                initialBook: {
                    ...state.booksList.initialBook,
                    initPublisher: action.payload[0]
                }
            };
        case 'SHOW_ADD_BOOKS_WINDOW':
            return {
                ...state.booksList,
                isAddWindow: action.payload
            };
        case 'SHOW_EDIT_BOOKS_WINDOW':
            return {
                ...state.booksList,
                isEditWindow: action.payload
            };
        case 'UPDATE_BOOKS_ADD_TITLE_FIELD' :
            return {
                ...state.booksList,
                addBook: {
                    ...state.booksList.addBook,
                    addTitle : action.payload
                }
            };
        case 'UPDATE_BOOKS_ADD_AUTHOR_FIELD' :
            return {
                ...state.booksList,
                addBook: {
                    ...state.booksList.addBook,
                    addAuthor : action.payload
                }
            };
        case 'UPDATE_BOOKS_ADD_GENRE_FIELD' :
            return {
                ...state.booksList,
                addBook: {
                    ...state.booksList.addBook,
                    addGenre : action.payload
                }
            };
        case 'UPDATE_BOOKS_ADD_YEAR_FIELD' :
            return {
                ...state.booksList,
                addBook: {
                    ...state.booksList.addBook,
                    addYear : action.payload
                }
            };
        case 'UPDATE_BOOKS_ADD_PUBLISHER_FIELD' :
            return {
                ...state.booksList,
                addBook: {
                    ...state.booksList.addBook,
                    addPublisher : action.payload
                }
            };
        case 'UPDATE_BOOKS_ADD_PAGES_FIELD' :
            return {
                ...state.booksList,
                addBook: {
                    ...state.booksList.addBook,
                    addAmountOfPages : action.payload
                }
            };
        case 'UPDATE_BOOKS_EDIT_TITLE_FIELD' :
            return {
                ...state.booksList,
                editBook: {
                    ...state.booksList.editBook,
                    editTitle : action.payload
                }
            };
        case 'UPDATE_BOOKS_EDIT_AUTHOR_FIELD' :
            return {
                ...state.booksList,
                editBook: {
                    ...state.booksList.editBook,
                    editAuthor : action.payload
                }
            };
        case 'UPDATE_BOOKS_EDIT_GENRE_FIELD' :
            return {
                ...state.booksList,
                editBook: {
                    ...state.booksList.editBook,
                    editGenre : action.payload
                }
            };
        case 'UPDATE_BOOKS_EDIT_YEAR_FIELD' :
            return {
                ...state.booksList,
                editBook: {
                    ...state.booksList.editBook,
                    editYear: action.payload
                }
            };
        case 'UPDATE_BOOKS_EDIT_PUBLISHER_FIELD' :
            return {
                ...state.booksList,
                editBook: {
                    ...state.booksList.editBook,
                    editPublisher : action.payload
                }
            };
        case 'UPDATE_BOOKS_EDIT_PAGES_FIELD' :
            return {
                ...state.booksList,
                editBook: {
                    ...state.booksList.editBook,
                    editAmountOfPages : action.payload
                }
            };
        case 'UPDATE_BOOKS_SELECTED_ITEM' :
            console.log(action.payload);
            return {
                ...state.booksList,
                editBook: action.payload.book,
                selectedItem : action.payload.id
            };
        default :
            return state.booksList
    }

};

export default updateBooksList;