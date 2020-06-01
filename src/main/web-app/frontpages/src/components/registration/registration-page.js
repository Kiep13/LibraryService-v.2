import React, {Component} from 'react';
import './registration-page.css';

import {compose} from "../../utils";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import withLibraryService from "../../hoc";
import { withRouter } from "react-router";
import {
    registrationsClearFields,
    registrationUpdateLoginField,
    registrationUpdatePasswordField,
    registrationUpdateRepeatPasswordField
} from "../../actions/registration-actions";

class RegistrationPage extends Component{

    // necessary for error handling and pointless, in my opinion, for rendering to the global state
    state = {
        isLoginError : false,
        isPasswordError : false,
        isRepeatPasswordError : false,
    };

    //regular expressions for checking entered data
    regExpLogin = new RegExp("^[A-Za-zА-Яа-я0-9]+$");
    regExpPassword = new RegExp("^[A-Za-zА-Яа-я0-9]+$");

    //error message
    errorLoginMessage = "The username must be at least 4 characters long";
    errorPasswordMessage = "The password must be at least 8 characters and must contain letters in different case and numbers";
    errorRepeatPasswordMessage = "Repeat password must match the value entered above";

    componentDidMount() {
        this.props.clearFields();
    }

    validateLogin = (login, isErrorField) => {
        let isError = !this.regExpLogin.test(login);
        isError = !isError ? (login.length < 4) : isError;
        this.changeErrorState(isErrorField,  isError);
    };

    validatePassword = (password, isErrorField) => {
        let isError = !this.regExpPassword.test(password);
        isError = !isError ? (password.length < 8) : isError;
        this.changeErrorState(isErrorField,  isError);
    };

    validateRepeatPassword = (repeatPassword, isErrorField) => {
        let isError = !this.regExpPassword.test(repeatPassword);
        isError = !isError ? ((repeatPassword.length < 8) || (repeatPassword.localeCompare(this.props.passwordField) !== 0)) : isError;
        this.changeErrorState(isErrorField,  isError);
    };

    changeErrorState = (isErrorField, value) => {
        this.setState({
            [isErrorField] : value
        })
    };

    loginChange = event => {
        event.preventDefault();
        this.validateLogin(event.target.value, "isLoginError");
        this.props.changeLogin(event.target.value);
    };

    passwordChange = event => {
        event.preventDefault();
        this.validatePassword(event.target.value, "isPasswordError");
        this.props.changePassword(event.target.value);
    };

    repeatPasswordChange = event => {
        event.preventDefault();
        this.validateRepeatPassword(event.target.value, "isRepeatPasswordError");
        this.props.changeRepeatPassword(event.target.value);
    };

    onSubmit = async event => {
        event.preventDefault();

        const {loginField, passwordField, repeatPasswordField} = this.props;
        await this.validateLogin(loginField, "isLoginError");
        await this.validatePassword(passwordField, "isPasswordError");
        await this.validateRepeatPassword(repeatPasswordField, "isRepeatPasswordError");
        const isError = this.state.isLoginError || this.state.isPasswordError || this.state.isRepeatPasswordError;

        if(!isError) {
            const admin = {
                login : loginField,
                password : passwordField
            };

            let result = await this.props.libraryService.addAdmin(admin);
            console.log(result);

            if(result) {
                this.props.history.push('/authorization');
            } else {
                alert("Get some problems when trying add user");
            }
        }
    };

    render () {

        const styleLoginField = this.state.isLoginError ? "form-control red-box" : "form-control";
        const stylePasswordField = this.state.isPasswordError ? "form-control red-box" : "form-control";
        const styleRepeatPasswordField = this.state.isRepeatPasswordError ? "form-control red-box" : "form-control";

        return (
            <div className="reg-screen">
                <div className="reg-block align-middle">

                    <div className="reg-header ml-4 pl-2 mr-5 pr-3 mt-2 d-flex">
                        <Link className="btn btn-outline-dark float-left item-control"
                            to="/authorization">
                            <i className="fa fa-arrow-left" aria-hidden="true"/>
                        </Link>
                        <h5 className="align-baseline">Registration</h5>
                    </div>


                    <form onSubmit={this.onSubmit}>
                        <label className="label-block">
                            Login
                            <input type="text" placeholder="Write your future login" className={styleLoginField} onChange={this.loginChange} value={this.props.loginField}/>
                        </label>
                        {this.state.isLoginError ? <div className="red-text">{this.errorLoginMessage}</div> : null}
                        <label className="label-block">
                            Password
                            <input type="password" placeholder="Write your future password" className={stylePasswordField} onChange={this.passwordChange} value={this.props.passwordField}/>
                        </label>
                        {this.state.isPasswordError ? <div className="red-text">{this.errorPasswordMessage}</div> : null}
                        <label className="label-block">
                            Confirm password
                            <input type="password" placeholder="Repeat your password" className={styleRepeatPasswordField} onChange={this.repeatPasswordChange} value={this.props.repeatField}/>
                        </label>
                        {this.state.isRepeatPasswordError ? <div className="red-text">{this.errorRepeatPasswordMessage}</div> : null}
                        <button type="submit" className="btn btn-info auth-button mb-3 mt-3">Registration</button>
                    </form>
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({registrationBlock}) => {
    return {
        loginField : registrationBlock.loginField,
        passwordField : registrationBlock.passwordField,
        repeatPasswordField : registrationBlock.repeatPasswordField
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearFields : () => {dispatch(registrationsClearFields())},
        changeLogin : (value) => {dispatch(registrationUpdateLoginField(value))},
        changePassword : (value) => {dispatch(registrationUpdatePasswordField(value))},
        changeRepeatPassword : (value) => {dispatch(registrationUpdateRepeatPasswordField(value))}
    }
};

export default  compose(
    withRouter,
    withLibraryService(),
    connect(mapStateToProps, mapDispatchToProps)
)(RegistrationPage);