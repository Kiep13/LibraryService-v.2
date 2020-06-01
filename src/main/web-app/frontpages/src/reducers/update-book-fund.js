const updateBookFundList = (state, action) => {

    const initialState = {
        book_fund : [],
        books : [],
        libraries : [],
        loading : true,
        isAddWindow : false,
        isEditWindow : false,
        addBookFund : {
            addBook : {},
            addLibrary : {},
            addAmount : ""
        },
        editBookFund : {
            editBook : {},
            editLibrary : {},
            editAmount : ""
        },
        initialBookFund : {
            initBook : {},
            initLibrary : {},
        },
        selectedItem : null
    };

    if(state === undefined) {
        return initialState;
    }

    switch(action.type) {
        case 'FETCH_BOOK_FUND_REQUEST' :
            return {
                ...initialState,
                loading: true,
            };
        case 'FETCH_BOOK_FUND_SUCCESS' :
            return {
                ...initialState,
                book_fund: action.payload,
                loading: false
            };
        case 'FETCH_BOOK_FUND_FAILURE' :
            return {
                ...state.bookFundList,
                book_fund: [],
                loading : false,
                error : true
            };
        case 'FETCH_BOOKS_SUCCESS' :
            return {
                ...state.bookFundList,
                addBookFund: {
                    ...state.bookFundList.addBookFund,
                    addBook : action.payload[0]
                },
                initialBookFund: {
                    ...state.bookFundList.initialBookFund,
                    initBook : action.payload[0]
                }
            };
        case 'FETCH_LIBRARIES_SUCCESS' :
            return {
                ...state.bookFundList,
                addBookFund: {
                    ...state.bookFundList.addBookFund,
                    addLibrary : action.payload[0]
                },
                initialBookFund: {
                    ...state.bookFundList.initialBookFund,
                    initLibrary : action.payload[0]
                }
            };
        case 'SHOW_ADD_BOOK_FUND_WINDOW':
            return {
                ...state.bookFundList,
                isAddWindow: action.payload
            };
        case 'SHOW_EDIT_BOOK_FUND_WINDOW':
            return {
                ...state.bookFundList,
                isEditWindow: action.payload
            };
        case 'UPDATE_BOOK_FUND_ADD_BOOK_FIELD' :
            return {
                ...state.bookFundList,
                addBookFund: {
                    ...state.bookFundList.addBookFund,
                    addBook : action.payload
                }
            };
        case 'UPDATE_BOOK_FUND_ADD_LIBRARY_FIELD' :
            return {
                ...state.bookFundList,
                addBookFund: {
                    ...state.bookFundList.addBookFund,
                    addLibrary : action.payload
                }
            };
        case 'UPDATE_BOOK_FUND_ADD_AMOUNT_FIELD' :
            return {
                ...state.bookFundList,
                addBookFund: {
                    ...state.bookFundList.addBookFund,
                    addAmount : action.payload
                }
            };
        case 'UPDATE_BOOK_FUND_EDIT_BOOK_FIELD' :
            return {
                ...state.bookFundList,
                editBookFund: {
                    ...state.bookFundList.editBookFund,
                    editBook : action.payload
                }
            };
        case 'UPDATE_BOOK_FUND_EDIT_LIBRARY_FIELD' :
            return {
                ...state.bookFundList,
                editBookFund: {
                    ...state.bookFundList.editBookFund,
                    editLibrary : action.payload
                }
            };
        case 'UPDATE_BOOK_FUND_EDIT_AMOUNT_FIELD' :
            return {
                ...state.bookFundList,
                editBookFund: {
                    ...state.bookFundList.editBookFund,
                    editAmount : action.payload
                }
            };
        case 'UPDATE_BOOK_FUND_SELECTED_ITEM' :
            return {
                ...state.bookFundList,
                editBookFund: action.payload.book_fund,
                selectedItem: action.payload.id
            };
        default:
            return state.bookFundList
    }

};

export default updateBookFundList;