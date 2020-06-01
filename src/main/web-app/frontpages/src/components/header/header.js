import React, {Component} from 'react';
import './header.css';

import {Link} from 'react-router-dom';
import {compose} from "../../utils";
import { withRouter } from "react-router";
import {connect} from "react-redux";
import {logOut} from "../../actions/authorization-actions";

class Header extends Component {

    logOut = () => {
        this.props.history.push('/');
        this.props.logOut();
    };

    render() {
        return (
            <div>
                <header className="blog-header py-3">
                    <div
                        className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                        <i className="fa fa-book"/>
                        <h5 className="my-0 mr-md-auto font-weight-normal">LibraryService</h5>
                        <nav className="my-2 my-md-0 mr-md-3">
                            <Link to="./book-fund" className="p-2 text-dark">Book fund</Link>
                            <Link to="./libraries" className="p-2 text-dark">Libraries</Link>
                            <Link to="./books" className="p-2 text-dark">Books</Link>
                            <Link to="./genres" className="p-2 text-dark">Genres</Link>
                            <Link to="./authors" className="p-2 text-dark">Authors</Link>
                            <Link to="./publishers" className="p-2 text-dark">Publishers</Link>
                            <button className="p-2 text-dark" onClick={this.logOut}>Exit</button>
                        </nav>
                    </div>
                </header>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut : () => {dispatch(logOut())}
    }
};

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(Header);