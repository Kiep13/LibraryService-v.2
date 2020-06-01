import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from 'react-redux';
import App from "./components/app";
import LibraryService from "./services/library-service";
import {LibraryServiceProvider} from './library-service-context'
import store from "./store";
import ErrorBoundary from "./components/error-boundary";


const libraryService = new LibraryService();
ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <LibraryServiceProvider value={libraryService}>
                <Router>
                    <App/>
                </Router>
            </LibraryServiceProvider>
        </ErrorBoundary>
    </Provider>
    ,document.getElementById('root'));

