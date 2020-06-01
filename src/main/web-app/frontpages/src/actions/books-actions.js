export const booksRequested = () => {
    return {
        type : 'FETCH_BOOKS_REQUEST'
    }
};

export const booksLoaded = (newBooks) => {
    return {
        type : 'FETCH_BOOKS_SUCCESS',
        payload : newBooks
    }
};

export const booksShowAddWindow = (value) => {
    return {
        type : 'SHOW_ADD_BOOKS_WINDOW',
        payload : value
    }
};

export const booksShowEditWindow = (value) => {
    return {
        type : 'SHOW_EDIT_BOOKS_WINDOW',
        payload : value
    }
};

export const booksUpdateAddTitleField = (value) => {
    return {
        type : 'UPDATE_BOOKS_ADD_TITLE_FIELD',
        payload : value
    }
};

export const booksUpdateAddAuthorField = (value) => {
    return {
        type : 'UPDATE_BOOKS_ADD_AUTHOR_FIELD',
        payload : value
    }
};

export const booksUpdateAddGenreField = (value) => {
    return {
        type : 'UPDATE_BOOKS_ADD_GENRE_FIELD',
        payload : value
    }
};

export const booksUpdateAddYearField = (value) => {
    return {
        type : 'UPDATE_BOOKS_ADD_YEAR_FIELD',
        payload : value
    }
};

export const booksUpdateAddPublisherField = (value) => {
    return {
        type : 'UPDATE_BOOKS_ADD_PUBLISHER_FIELD',
        payload : value
    }
};

export const booksUpdateAddPagesField = (value) => {
    return {
        type : 'UPDATE_BOOKS_ADD_PAGES_FIELD',
        payload : value
    }
};

export const booksUpdateEditTitleField = (value) => {
    return {
        type : 'UPDATE_BOOKS_EDIT_TITLE_FIELD',
        payload : value
    }
};

export const booksUpdateEditAuthorField = (value) => {
    return {
        type : 'UPDATE_BOOKS_EDIT_AUTHOR_FIELD',
        payload : value
    }
};

export const booksUpdateEditGenreField = (value) => {
    return {
        type : 'UPDATE_BOOKS_EDIT_GENRE_FIELD',
        payload : value
    }
};

export const booksUpdateEditYearField = (value) => {
    return {
        type : 'UPDATE_BOOKS_EDIT_YEAR_FIELD',
        payload : value
    }
};

export const booksUpdateEditPublisherField = (value) => {
    return {
        type : 'UPDATE_BOOKS_EDIT_PUBLISHER_FIELD',
        payload : value
    }
};

export const booksUpdateEditPagesField = (value) => {
    return {
        type : 'UPDATE_BOOKS_EDIT_PAGES_FIELD',
        payload : value
    }
};

export const booksUpdateSelectedItem = (item) => {
    return {
        type : 'UPDATE_BOOKS_SELECTED_ITEM',
        payload : item
    }
};


