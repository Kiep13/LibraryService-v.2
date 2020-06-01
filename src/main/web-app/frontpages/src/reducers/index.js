import updateGenresList from "./update-genres";
import updateAuthorsList from "./update-authors";
import updatePublishersList from "./update-publishers";
import updateLibraries from "./update-libraries";
import updateBooksList from "./update-books";
import updateBookFundList from "./update-book-fund";
import updateError from "./updare-error"
import updateRegistration from "./update-registration";
import updateAuthorization from "./update-authorization";
import updateHomePage from "./update-homepage";

const reducer = (state, action) => {
    return {
        genresList : updateGenresList(state, action),
        authorsList : updateAuthorsList(state, action),
        publishersList : updatePublishersList(state, action),
        librariesList : updateLibraries(state, action),
        booksList : updateBooksList(state, action),
        bookFundList : updateBookFundList(state, action),
        homePage : updateHomePage(state, action),
        registrationBlock : updateRegistration(state, action),
        authorizationBlock : updateAuthorization(state, action),
        error : updateError(state, action)
    }
};

export default reducer;