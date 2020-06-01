export const bookFundRequested = () => {
    return {
        type : 'FETCH_BOOK_FUND_REQUEST'
    }
};

export const bookFundLoaded = (newBookFund) => {
    return {
        type : 'FETCH_BOOK_FUND_SUCCESS',
        payload : newBookFund
    }
};

export const bookFundShowAddWindow = (value) => {
    return {
        type : 'SHOW_ADD_BOOK_FUND_WINDOW',
        payload : value
    }
};

export const bookFundShowEditWindow = (value) => {
    return {
        type : 'SHOW_EDIT_BOOK_FUND_WINDOW',
        payload : value
    }
};

export const bookFundUpdateAddBookField = (value) => {
    return {
        type : 'UPDATE_BOOK_FUND_ADD_BOOK_FIELD',
        payload : value
    }
};

export const bookFundUpdateAddLibraryField = (value) => {
    return {
        type : 'UPDATE_BOOK_FUND_ADD_LIBRARY_FIELD',
        payload : value
    }
};

export const bookFundUpdateAddAmountField = (value) => {
    return {
        type : 'UPDATE_BOOK_FUND_ADD_AMOUNT_FIELD',
        payload : value
    }
};

export const bookFundUpdateEditBookField = (value) => {
    return {
        type : 'UPDATE_BOOK_FUND_EDIT_BOOK_FIELD',
        payload : value
    }
};

export const bookFundUpdateEditLibraryField = (value) => {
    return {
        type : 'UPDATE_BOOK_FUND_EDIT_LIBRARY_FIELD',
        payload : value
    }
};

export const bookFundUpdateEditAmountField = (value) => {
    return {
        type : 'UPDATE_BOOK_FUND_EDIT_AMOUNT_FIELD',
        payload : value
    }
};

export const booksFundUpdateSelectedItem = (item) => {
    return {
        type : 'UPDATE_BOOK_FUND_SELECTED_ITEM',
        payload : item
    }
};