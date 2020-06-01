import React, {Component} from 'react';
import Header from "../header";
import Spinner from "../spinner";
import {compose} from "../../utils";
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import withLibraryService from "../../hoc";
import {
    authorsRequested,
    authorsLoaded,
    authorsShowAddWindow,
    authorsShowEditWindow,
    authorUpdateAddSurnameField,
    authorUpdateAddNameField,
    authorUpdateAddPatronymicField,
    authorUpdateEditSurnameField,
    authorUpdateEditNameField,
    authorUpdateEditPatronymicField,
    authorUpdateSelectedItem
    } from "../../actions/authors-actions";
import "./authors-page.css";

class AuthorsPage extends Component {

    // necessary for error handling and pointless, in my opinion, for rendering to the global state
    state = {
        formError : {
            addSurname : "",
            addName : "",
            addPatronymic : "",
            editSurname : "",
            editName : "",
            editPatronymic : "",
        },
        isAddSurnameError : false,
        isAddNameError : false,
        isAddPatronymicError : false,
        isEditSurnameError : false,
        isEditNameError : false,
        isEditPatronymicError : false,
    };

    //regular expressions for checking entered data
    regExpEng = new RegExp('^[A-Z][a-z]+$');
    regExpRus = new RegExp('^[А-Я][а-я]+$');

    //error messages
    errorSurnameMessage = "The surname must start with a capital letter and not contain numbers or punctuation marks. Example: Smirnova.";
    errorNameMessage = "The surname must start with a capital letter and not contain numbers or punctuation marks. Example: Nina.";
    errorPatronymicMessage = "The patronymic must start with a capital letter and not contain numbers or punctuation marks. Example: Sergeevna.";

    componentDidMount() {
        this.props.onRequest();
        this.getAllAuthors();
    }

    validate = (word, messageField, isErrorField, errorMess) => {
        const isErrorEng = !this.regExpEng.test(word);
        const isErrorRus = !this.regExpRus.test(word);
        const isError = isErrorEng && isErrorRus;
        const message = isError ? errorMess : "";
        this.changeErrorState(messageField, isErrorField, message, isError);
    };

    changeErrorState = (messageField, isErrorField, message, value) => {
        this.setState({
            formError : {
                [messageField] : message
            },
            [isErrorField] : value
        })
    };

    getAllAuthors = async () => {
        const {libraryService} = this.props;
        const authors = await libraryService.getAllAuthors();
        this.props.onLoaded(authors);
    };

    changeAddSurname = event => {
        event.preventDefault();
        this.validate(event.target.value, "addSurname", "isAddSurnameError", this.errorSurnameMessage);
        this.props.changeAddSurname(event.target.value);
    };

    changeAddName = event => {
        event.preventDefault();
        this.validate(event.target.value, "addName", "isAddNameError", this.errorNameMessage);
        this.props.changeAddName(event.target.value);
    };

    changeAddPatronymic = event => {
        event.preventDefault();
        this.validate(event.target.value, "addPatronymic", "isAddPatronymicError", this.errorPatronymicMessage);
        this.props.changeAddPatronymic(event.target.value);
    };

    changeEditSurname = event => {
        event.preventDefault();
        this.validate(event.target.value, "editSurname", "isEditSurnameError", this.errorSurnameMessage);
        this.props.changeEditSurname(event.target.value);
    };

    changeEditName = event => {
        event.preventDefault();
        this.validate(event.target.value, "editName", "isEditNameError", this.errorNameMessage);
        this.props.changeEditName(event.target.value);
    };

    changeEditPatronymic = event => {
        event.preventDefault();
        this.validate(event.target.value, "editPatronymic", "isEditPatronymicError", this.errorPatronymicMessage);
        this.props.changeEditPatronymic(event.target.value);
    };

    onAddClick = async event => {
        event.preventDefault();
        if(!this.props.isEditWindow) {
            const value = this.props.isAddWindow;
            if(value) {
                this.changeErrorState("addSurname", "isAddSurnameError", "", false);
                this.changeErrorState("addName", "isAddNameError", "", false);
                this.changeErrorState("addPatronymic", "isAddPatronymicError", "", false);
                this.props.changeAddSurname("");
                this.props.changeAddName("");
                this.props.changeAddPatronymic("");
            }
            this.props.changeAddWindow(!value);
        } else {
            alert("You have opened edit window");
        }
    };

    onEditClick = async event => {
        event.preventDefault();
        if(!this.props.isAddWindow) {
            if (this.props.selectedItem != null) {
                const value = this.props.isEditWindow;
                this.props.changeEditWindow(!value);
            } else {
                alert("You did not choose author!");
            }
        } else {
            alert("You have opened add window");
        }
    };

    onDeleteClick = async event => {
        event.preventDefault();

        if(this.props.selectedItem != null) {
            await this.props.libraryService.deleteAuthor(this.props.selectedItem);
            this.props.onRequest();
            this.getAllAuthors();
        } else {
            alert("You did not choose genre!");
        }
    };

    addAuthor = async event => {
        event.preventDefault();

        const {addSurname, addName, addPatronymic} = this.props.addAuthor;
        await this.validate(addSurname, "addSurname", "isAddSurnameError", this.errorSurnameMessage);
        await this.validate(addName, "addName", "isAddNameError", this.errorNameMessage);
        await this.validate(addPatronymic, "addPatronymic", "isAddPatronymicError", this.errorPatronymicMessage);
        const isError = this.state.isAddSurnameError || this.state.isAddNameError || this.state.isAddPatronymicError;

        if(!isError) {
            const author = {
                surname : addSurname,
                name : addName,
                patronymic : addPatronymic
            };

            await this.props.libraryService.addAuthor(author);
            this.props.onRequest();
            this.getAllAuthors();
        }
    };

    editAuthor = async event => {
        event.preventDefault();

        const isError = this.state.isEditSurnameError || this.state.isEditNameError || this.state.isEditPatronymicError;
        if(!isError) {
            const {editSurname, editName, editPatronymic} = this.props.editAuthor;

            const author = {
                id : this.props.selectedItem,
                surname : editSurname,
                name : editName,
                patronymic : editPatronymic
            };

            await this.props.libraryService.editAuthor(author);
            this.props.onRequest();
            this.getAllAuthors();
        }
    };

    selectedRow = (id, surname, name, patronymic) => {
        const author = {
            editSurname : surname,
            editName : name,
            editPatronymic : patronymic
        };
        const item = {
            id, author
        };
        this.props.onItemChange(item);
        this.changeErrorState("editSurname", "isEditSurnameError", "", false);
        this.changeErrorState("editName", "isEditNameError", "", false);
        this.changeErrorState("editPatronymic", "isEditPatronymicError", "", false);
    };

    render() {

        if(!this.props.isLoggedIn) {
            return <Redirect to='/authorization'/>
        }

        if(this.props.loading) {
            return <Spinner/>
        }

        const rows = this.props.authors.map(({id, surname, name, patronymic}) => {
            return (
                <tr key={id}>
                    <td><input type="radio" name="object_id" value={id} onClick={() => {this.selectedRow(id, surname, name, patronymic)}}/></td>
                    <td>{surname}</td>
                    <td>{name}</td>
                    <td>{patronymic}</td>
                </tr>
            )
        });

        const {addSurname, addName, addPatronymic} = this.props.addAuthor;
        const {editSurname, editName, editPatronymic} = this.props.editAuthor;

        const styleAddSurname = this.state.isAddSurnameError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";
        const styleAddName = this.state.isAddNameError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";
        const styleAddPatronymic = this.state.isAddPatronymicError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";

        const addWindow = !this.props.isAddWindow ? null :
            <div id="add-author-block">
                <div className="card card-body mb-2">
                    <form onSubmit={this.addAuthor}>
                        <div className="authors-form">
                            <input type="text" placeholder="Write surname here..." className={styleAddSurname} onChange={this.changeAddSurname} value={addSurname}/>
                            {this.state.isAddSurnameError ? <div className="red-text mb-2">{this.state.formError.addSurname}</div> : null}
                            <input type="text" placeholder="Write name here..." className={styleAddName} onChange={this.changeAddName} value={addName}/>
                            {this.state.isAddNameError ? <div className="red-text mb-2">{this.state.formError.addName}</div> : null}
                            <input type="text" placeholder="Write patronymic here..." className={styleAddPatronymic} onChange={this.changeAddPatronymic} value={addPatronymic}/>
                            {this.state.isAddPatronymicError ? <div className="red-text mb-2">{this.state.formError.addPatronymic}</div> : null}
                            <button type="submit" className="btn btn-info form-button mt-2">Add</button>
                        </div>
                    </form>
                </div>
            </div>;

        const styleEditSurname = this.state.isEditSurnameError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";
        const styleEditName = this.state.isEditNameError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";
        const styleEditPatronymic = this.state.isEditPatronymicError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";

        const editWindow = !this.props.isEditWindow ? null :
            <div id="edit-author-block">
                <div className="card card-body mb-2">
                    <form onSubmit={this.editAuthor}>
                        <div className="authors-form">
                            <input type="text" placeholder="Write surname here..." className={styleEditSurname} onChange={this.changeEditSurname} value={editSurname}/>
                            {this.state.isEditSurnameError ? <div className="red-text mb-2">{this.state.formError.editSurname}</div> : null}
                            <input type="text" placeholder="Write name here..." className={styleEditName} onChange={this.changeEditName} value={editName}/>
                            {this.state.isEditNameError ? <div className="red-text mb-2">{this.state.formError.editName}</div> : null}
                            <input type="text" placeholder="Write patronymic here..." className={styleEditPatronymic} onChange={this.changeEditPatronymic} value={editPatronymic}/>
                            {this.state.isEditPatronymicError ? <div className="red-text mb-2">{this.state.formError.editPatronymic}</div> : null}
                            <button type="submit" className="btn btn-info form-button mt-2">Update</button>
                        </div>
                    </form>
                </div>
            </div>;

        return (

            <div>
                <Header/>

                <main role="main">

                    <div className="container authors-page">
                        <h1>Authors</h1>

                        <div className="authors-tools">
                            <button className="btn btn-outline-danger float-right my-1 item-control" onClick={this.onDeleteClick}>
                                <i className="fa fa-trash-o"/>
                            </button>

                            <button className="btn btn-outline-warning float-right my-1 item-control" onClick={this.onEditClick}>
                                <i className="fa fa-pencil"/>
                            </button>

                            <button className="btn btn-outline-success float-right my-1 item-control" onClick={this.onAddClick}>
                                <i className="fa fa-plus"/>
                            </button>
                        </div>

                        <br/>
                        <br/>

                        {addWindow}

                        {editWindow}

                        <table className="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Surname</th>
                                <th>Name</th>
                                <th>Patronymic</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows}
                            </tbody>
                        </table>
                    </div>

                </main>
            </div>
        )
    }
}

const mapStateToProps = ({authorsList, authorizationBlock}) => {
    return {
        isLoggedIn : authorizationBlock.isLoggedIn,
        authors : authorsList.authors,
        loading : authorsList.loading,
        isAddWindow : authorsList.isAddWindow,
        isEditWindow : authorsList.isEditWindow,
        addAuthor : authorsList.addAuthor,
        editAuthor : authorsList.editAuthor,
        selectedItem : authorsList.selectedItem
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRequest : () => {dispatch(authorsRequested())},
        onLoaded : (newAuthors) => {dispatch(authorsLoaded(newAuthors))},
        changeAddWindow : (value) => {dispatch(authorsShowAddWindow(value))},
        changeEditWindow : (value) => {dispatch(authorsShowEditWindow(value))},
        changeAddSurname : (value) => {dispatch(authorUpdateAddSurnameField(value))},
        changeAddName : (value) => {dispatch(authorUpdateAddNameField(value))},
        changeAddPatronymic : (value) => {dispatch(authorUpdateAddPatronymicField(value))},
        changeEditSurname : (value) => {dispatch(authorUpdateEditSurnameField(value))},
        changeEditName : (value) => {dispatch(authorUpdateEditNameField(value))},
        changeEditPatronymic : (value) => {dispatch(authorUpdateEditPatronymicField(value))},
        onItemChange : (item) => {dispatch(authorUpdateSelectedItem(item))}
    }
};

export default compose(
    withLibraryService(),
    connect(mapStateToProps, mapDispatchToProps)
    )(AuthorsPage);