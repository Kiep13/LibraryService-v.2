export const authorsRequested = () => {
    return {
        type : 'FETCH_AUTHORS_REQUEST'
    }
};

export const authorsLoaded = (newAuthors) => {
    return {
        type : 'FETCH_AUTHORS_SUCCESS',
        payload : newAuthors
    }
};

export const authorsShowAddWindow = (value) => {
    return {
        type : 'SHOW_ADD_AUTHORS_WINDOW',
        payload : value
    }
};

export const authorsShowEditWindow = (value) => {
    return {
        type : 'SHOW_EDIT_AUTHORS_WINDOW',
        payload : value
    }
};

export const authorUpdateAddSurnameField = (value) => {
    return {
        type : 'UPDATE_AUTHOR_ADD_SURNAME_FIELD',
        payload : value
    }
};

export const authorUpdateAddNameField = (value) => {
    return {
        type : 'UPDATE_AUTHOR_ADD_NAME_FIELD',
        payload : value
    }
};

export const authorUpdateAddPatronymicField = (value) => {
    return {
        type : 'UPDATE_AUTHOR_ADD_PATRONYMIC_FIELD',
        payload : value
    }
};

export const authorUpdateEditSurnameField = (value) => {
    return {
        type : 'UPDATE_AUTHOR_EDIT_SURNAME_FIELD',
        payload : value
    }
};

export const authorUpdateEditNameField = (value) => {
    return {
        type : 'UPDATE_AUTHOR_EDIT_NAME_FIELD',
        payload : value
    }
};

export const authorUpdateEditPatronymicField = (value) => {
    return {
        type : 'UPDATE_AUTHOR_EDIT_PATRONYMIC_FIELD',
        payload : value
    }
};

export const authorUpdateSelectedItem = (item) => {
    return {
        type : 'UPDATE_AUTHOR_SELECTED_ITEM',
        payload : item
    }
};

