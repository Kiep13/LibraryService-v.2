export const librariesRequested = () => {
    return {
        type : 'FETCH_LIBRARIES_REQUEST'
    }
};

export const librariesLoaded = (newLibraries) => {
    return {
        type : 'FETCH_LIBRARIES_SUCCESS',
        payload : newLibraries
    }
};

export const librariesShowAddWindow = (value) => {
    return {
        type : 'SHOW_ADD_LIBRARIES_WINDOW',
        payload : value
    }
};

export const librariesShowEditWindow = (value) => {
    return {
        type : 'SHOW_EDIT_LIBRARIES_WINDOW',
        payload : value
    }
};

export const librariesUpdateAddSurnameField = (value) => {
    return {
        type : 'UPDATE_LIBRARY_ADD_SURNAME_FIELD',
        payload : value
    }
};

export const librariesUpdateAddNameField = (value) => {
    return {
        type : 'UPDATE_LIBRARY_ADD_NAME_FIELD',
        payload : value
    }
};

export const librariesUpdateAddAddressField = (value) => {
    return {
        type : 'UPDATE_LIBRARY_ADD_ADDRESS_FIELD',
        payload : value
    }
};

export const librariesUpdateAddTelephoneField = (value) => {
    return {
        type : 'UPDATE_LIBRARY_ADD_TELEPHONE_FIELD',
        payload : value
    }
};

export const librariesUpdateEditNameField = (value) => {
    return {
        type : 'UPDATE_LIBRARY_EDIT_NAME_FIELD',
        payload : value
    }
};

export const librariesUpdateEditAddressField = (value) => {
    return {
        type : 'UPDATE_LIBRARY_EDIT_ADDRESS_FIELD',
        payload : value
    }
};

export const librariesUpdateEditTelephoneField = (value) => {
    return {
        type : 'UPDATE_LIBRARY_EDIT_TELEPHONE_FIELD',
        payload : value
    }
};

export const librariesUpdateSelectedItem = (item) => {
    return {
        type : 'UPDATE_LIBRARY_SELECTED_ITEM',
        payload : item
    }
};