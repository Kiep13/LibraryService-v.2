import React, {Component} from 'react';
import './authorization-page.css';

import {Link} from 'react-router-dom';
import withLibraryService from "../../hoc";
import {
    logIn,
    authorizationClearFields,
    authorizationUpdateLoginField,
    authorizationUpdatePasswordField
} from "../../actions/authorization-actions";
import { withRouter } from "react-router";
import {compose} from "../../utils";
import {connect} from "react-redux";

class AuthorizationPage extends Component {

    // necessary for error handling and pointless, in my opinion, for rendering to the global state
    state = {
        isLoginError : false,
        isPasswordError: true
    };

    //error message
    errorMessage = "Too short value";

    componentDidMount() {
        this.props.clearFields();
    }

    checkInput= (field, errorNameField) => {
      const isError = field.length < 4;
      this.setState({
          [errorNameField] : isError
      })
    };

    loginChange = event => {
        event.preventDefault();
        this.checkInput(event.target.value, ["isLoginError"]);
        this.props.changeLogin(event.target.value);
    };

    passwordChange = event => {
        event.preventDefault();
        this.checkInput(event.target.value, ["isPasswordError"]);
        this.props.changePassword(event.target.value);
    };

    onLogInClick = async event => {
        event.preventDefault();

        await this.checkInput(this.props.loginField, ["isLoginError"]);
        await this.checkInput(this.props.passwordField, ["isPasswordError"]);
        const isError = this.state.isLoginError || this.state.isPasswordError;

        if(!isError) {
            const admin = {
                login : this.props.loginField,
                password : this.props.passwordField
            };

            const result = await this.props.libraryService.logIn(admin);
            if(result) {
                this.props.logIn();
                this.props.history.push('/book-fund');
            } else {
                alert("Problems trying to log in")
            }
        }
    };

    render () {

        const styleLoginField = this.state.isLoginError ? "form-control red-box" : "form-control";
        const stylePasswordField = this.state.isPasswordError ? "form-control red-box" : "form-control";

        return (
            <div className="auth-screen">
                <div className="auth-block align-middle">

                    <div className="auth-header ml-4 pl-2 mr-5 pr-3 mt-2 d-flex">
                        <Link className="btn btn-outline-dark float-left item-control"
                              to="/">
                            <i className="fa fa-arrow-left" aria-hidden="true"/>
                        </Link>
                        <h5 className="align-baseline">Authorization</h5>
                    </div>

                    <form onSubmit={this.onLogInClick}>
                        <label className="label-block">
                            Login
                            <input type="text" name="title" placeholder="..." className={styleLoginField} onChange={this.loginChange} value={this.props.loginField}/>
                        </label>
                        {this.state.isLoginError ? <div className="red-text">{this.errorMessage}</div> : null}
                        <label className="label-block">
                            Password
                            <input type="password" name="anons" placeholder="..." className={stylePasswordField} onChange={this.passwordChange} value={this.props.passwordField}/>
                        </label>
                        {this.state.isPasswordError ? <div className="red-text">{this.errorMessage}</div> : null}
                        <div><button type="submit" className="btn btn-info mt-3">Log in</button></div>
                    </form>
                    <Link to="./registration" className="btn btn-info mb-3 mt-3">Registration</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({authorizationBlock}) => {
    return {
        loginField : authorizationBlock.loginField,
        passwordField : authorizationBlock.passwordField
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logIn : () => {dispatch(logIn())},
        clearFields : () => {dispatch(authorizationClearFields())},
        changeLogin : (value) => {dispatch(authorizationUpdateLoginField(value))},
        changePassword : (value) => {dispatch(authorizationUpdatePasswordField(value))}
    }
};

export default compose(
    withRouter,
    withLibraryService(),
    connect(mapStateToProps, mapDispatchToProps)
)(AuthorizationPage);