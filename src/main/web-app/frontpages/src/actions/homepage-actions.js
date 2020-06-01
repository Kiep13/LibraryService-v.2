export const homePageClear = () => {
    return {
        type : 'CLEAR_HOMEPAGE'
    }
};

export const homePageClearSearchOptions = () => {
    return {
        type : 'CLEAR_SEARCH_OPTIONS'
    }
};

export const homePageUpdateLibraryId = (value) => {
    return {
        type : 'UPDATE_HOMEPAGE_LIBRARY_ID',
        payload : value
    }
};

export const homePageUpdateSortField = (value) => {
    return {
        type : 'UPDATE_HOMEPAGE_SORT_FIELD',
        payload : value
    }
};

export const homePageUpdateSearchWindow = (value) => {
    return {
        type : 'UPDATE_HOMEPAGE_SEARCH_WINDOW',
        payload : value
    }
};

export const homePageUpdateTitleMask = (value) => {
    return {
        type : 'UPDATE_HOMEPAGE_TITLE_MASK',
        payload : value
    }
};

export const homePageUpdateAuthorMask = (value) => {
    return {
        type : 'UPDATE_HOMEPAGE_AUTHOR_MASK',
        payload : value
    }
};

export const homePageUpdateGenreMask = (value) => {
    return {
        type : 'UPDATE_HOMEPAGE_GENRE_MASK',
        payload : value
    }
};

export const homePageUpdatePublisherMask = (value) => {
    return {
        type : 'UPDATE_HOMEPAGE_PUBLISHER_MASK',
        payload : value
    }
};

export const homePageUpdateSearchOptions = () => {
    return {
        type : 'UPDATE_HOMEPAGE_SEARCH_OPTIONS'
    }
};