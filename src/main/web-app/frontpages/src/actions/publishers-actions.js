export const publishersRequested = () => {
    return {
        type : 'FETCH_PUBLISHERS_REQUEST'
    }
};

export const publishersLoaded = (newPublishers) => {
    return {
        type : 'FETCH_PUBLISHERS_SUCCESS',
        payload : newPublishers
    }
};

export const publishersShowAddWindow = (value) => {
    return {
        type : 'SHOW_ADD_PUBLISHERS_WINDOW',
        payload : value
    }
};

export const publishersShowEditWindow = (value) => {
    return {
        type : 'SHOW_EDIT_PUBLISHERS_WINDOW',
        payload : value
    }
};

export const publishersUpdateAddField = (value) => {
    return {
        type : 'UPDATE_PUBLISHER_ADD_FIELD',
        payload : value
    }
};

export const publishersUpdateEditField = (value) => {
    return {
        type : 'UPDATE_PUBLISHER_EDIT_FIELD',
        payload : value
    }
};

export const publishersUpdateSelectedItem = (item) => {
    return {
        type : 'UPDATE_PUBLISHER_SELECTED_ITEM',
        payload : item
    }
};