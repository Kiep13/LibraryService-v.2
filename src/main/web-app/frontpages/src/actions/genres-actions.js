export const genresRequested = () => {
    return {
        type : 'FETCH_GENRES_REQUEST'
    }
};

export const genresLoaded = (newGenres) => {
    return {
        type : 'FETCH_GENRES_SUCCESS',
        payload : newGenres
    }
};

export const genreShowAddWindow = (value) => {
    return {
        type : 'SHOW_ADD_GENRE_WINDOW',
        payload : value
    }
};

export const genreShowEditWindow = (value) => {
    return {
        type : 'SHOW_EDIT_GENRE_WINDOW',
        payload : value
    }
};

export const genreUpdateAddField = (value) => {
    return {
        type : 'UPDATE_GENRE_ADD_FIELD',
        payload : value
    }
};

export const genreUpdateEditField = (value) => {
    return {
        type : 'UPDATE_GENRE_EDIT_FIELD',
        payload : value
    }
};

export const genreUpdateSelectedItem = (item) => {
    return {
        type : 'UPDATE_GENRE_SELECTED_ITEM',
        payload : item
    }
};
