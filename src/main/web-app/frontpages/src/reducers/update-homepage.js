const updateHomePage = (state ,action) => {

    const initialSearchOptions = {
        titleMask : "",
        authorMask : "",
        genreMask : "",
        publisherMask : ""
    };

    const initialState = {
        libraryId : "all",
        sortField : 'title',
        isSearchWindow : false,
        searchOptions : {
            titleMask : "",
            authorMask : "",
            genreMask : "",
            publisherMask : ""
        },
        officialSearchOptions : {
            titleMask : "",
            authorMask : "",
            genreMask : "",
            publisherMask : ""
        }
    };

    if(state === undefined) {
        return initialState;
    }

    switch(action.type) {
        case 'CLEAR_HOMEPAGE':
            return {
                ...initialState
            };
        case 'CLEAR_SEARCH_OPTIONS':
            return {
                ...state.homePage,
                searchOptions: initialSearchOptions,
                officialSearchOptions: initialSearchOptions,
                isSearchWindow: false

            };
        case 'UPDATE_HOMEPAGE_LIBRARY_ID' :
            return {
                ...state.homePage,
                libraryId: action.payload
            };
        case 'UPDATE_HOMEPAGE_SORT_FIELD' :
            return {
                ...state.homePage,
                sortField: action.payload
            };
        case 'UPDATE_HOMEPAGE_SEARCH_WINDOW' :
            return {
                ...state.homePage,
                isSearchWindow: action.payload
            };
        case 'UPDATE_HOMEPAGE_TITLE_MASK' :
            return {
                ...state.homePage,
                searchOptions : {
                    ...state.homePage.searchOptions,
                    titleMask : action.payload
                }
            };
        case 'UPDATE_HOMEPAGE_AUTHOR_MASK' :
            return {
                ...state.homePage,
                searchOptions : {
                    ...state.homePage.searchOptions,
                    authorMask : action.payload
                }
            };
        case 'UPDATE_HOMEPAGE_GENRE_MASK' :
            return {
                ...state.homePage,
                searchOptions : {
                    ...state.homePage.searchOptions,
                    genreMask : action.payload
                }
            };
        case 'UPDATE_HOMEPAGE_PUBLISHER_MASK' :
            return {
                ...state.homePage,
                searchOptions : {
                    ...state.homePage.searchOptions,
                    publisherMask : action.payload
                }
            };
        case 'UPDATE_HOMEPAGE_SEARCH_OPTIONS' :
            return {
                ...state.homePage,
                officialSearchOptions : state.homePage.searchOptions,
                isSearchWindow: false
            };
        default :
            return state.homePage;
    }

};

export default updateHomePage;