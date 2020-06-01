import React from 'react';
import {Route, Switch} from 'react-router-dom';

import HomePage from "../homepage";
import AuthorizationPage from "../authorization";
import Registration from '../registration';
import GenresPage from "../genres-page";
import AuthorsPage from "../authors-page";
import PublishersPage from "../publishers-page";
import LibrariesPage from "../libraries-page";
import BooksPage from "../books-page";
import BookFundPage from "../bookfund-page";
import ErrorIndicator from "../error-indicator";

const App = () => {
    return (
        <Switch>
            <Route path='/' component={HomePage} exact/>
            <Route path='/authorization' component={AuthorizationPage}/>
            <Route path='/registration' component={Registration}/>
            <Route path='/genres' component={GenresPage}/>
            <Route path='/authors' component={AuthorsPage}/>
            <Route path='/publishers' component={PublishersPage}/>
            <Route path='/libraries' component={LibrariesPage}/>
            <Route path='/books' component={BooksPage}/>
            <Route path='/book-fund' component={BookFundPage}/>
            <Route path='/error' component={ErrorIndicator}/>
        </Switch>
    )
};

export default App;