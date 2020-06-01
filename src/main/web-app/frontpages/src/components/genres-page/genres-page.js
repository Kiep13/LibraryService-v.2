import React, {Component} from 'react';
import './genres-page.css';

import Header from '../header';
import Spinner from '../spinner';
import {Redirect} from 'react-router-dom';
import {compose} from "../../utils";
import {connect} from "react-redux";
import withLibraryService from "../../hoc";
import {genresRequested,
        genresLoaded,
        genreShowAddWindow,
        genreShowEditWindow,
        genreUpdateAddField,
        genreUpdateEditField,
        genreUpdateSelectedItem} from "../../actions/genres-actions";

class GenresPage extends Component{

    // necessary for error handling and pointless, in my opinion, for rendering to the global state
    state = {
        formError : {
            addGenre : "",
            editGenre : "",
        },
        isAddGenreError : false,
        isEditGenreError : false
    };

    //regular expressions for checking entered data
    regExpEng = new RegExp('^[A-Z][a-z]+$');
    regExpRus = new RegExp('^[А-Я][а-я]+$');

    //error message
    errorGenreMessage = "The genre must start with a capital letter and not contain numbers or punctuation marks. Example: romance.";
    componentDidMount() {
        this.props.onRequest();
        this.getAllGenres();
    }

    getAllGenres  = async () => {
        const {libraryService} = this.props;
        const genres = await libraryService.getAllGenres();
        this.props.onLoaded(genres);
    };

    validateGenre = (genre, messageField, isErrorField, errorMess) => {
        const isErrorEng = !this.regExpEng.test(genre);
        const isErrorRus = !this.regExpRus.test(genre);
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

    changeAddGenre = event => {
        event.preventDefault();
        this.validateGenre(event.target.value, "addGenre", "isAddGenreError", this.errorGenreMessage);
        this.props.onAddFieldChange(event.target.value);
    };

    changeEditGenre = event => {
        event.preventDefault();
        this.validateGenre(event.target.value, "editGenre", "isEditGenreError", this.errorGenreMessage);
        this.props.onEditFieldChange(event.target.value);
    };

    onAddButtonClick = async event => {
        event.preventDefault();
        if(!this.props.isEditWindow) {
            const value = this.props.isAddWindow;
            if(value) {
                this.changeErrorState("addGenre", "isAddGenreError", "", false);
                this.props.onAddFieldChange("");
            }
            this.props.changeAddWindow(!value);
        } else {
            alert("You have opened edit window");
        }
    };

    onEditButtonClick = async event => {
        event.preventDefault();
        if(!this.props.isAddWindow) {
            if (this.props.selectedItem != null) {
                const value = this.props.isEditWindow;
                this.props.changeEditWindow(!value);
            } else {
                alert("You did not choose genre!");
            }
        } else {
            alert("You have opened add window");
        }
    };

    onDeleteButtonClick = async event => {
        event.preventDefault();

        if (this.props.selectedItem != null) {
            await this.props.libraryService.deleteGenre(this.props.selectedItem);
            this.props.onRequest();
            this.getAllGenres();
        } else {
            alert("You did not choose genre!");
        }
    };

    addGenre = async event => {
        event.preventDefault();

        const genre = this.props.addGenreField;
        await this.validateGenre(genre, "addGenre", "isAddGenreError", this.errorGenreMessage);
        if(!this.state.isAddGenreError) {
            const genre = {
                name : this.props.addGenreField
            };

            await this.props.libraryService.addGenre(genre);
            this.props.onRequest();
            this.getAllGenres();
        }
    };

   editGenre = async event => {
        event.preventDefault();

        if(!this.state.isEditGenreError) {
            if (this.props.selectedItem != null) {
                const genre = {
                    id: this.props.selectedItem,
                    name: this.props.editGenreField
                };

                await this.props.libraryService.editGenre(genre);
                this.props.onRequest();
                this.getAllGenres();
            } else {
                alert("You did not choose genre!");
            }
        }
    };

    selectedRow = (id, text) => {
        this.props.onItemChange({id, text});
        this.changeErrorState("editGenre", "isEditGenreError", "", false);
    };

    render () {

        if(!this.props.isLoggedIn) {
            return <Redirect to='/authorization'/>
        }

        if(this.props.loading) {
            return <Spinner/>
        }

        const rows = this.props.genres.map(({id, name}) => {
            return (
                <tr key={id}>
                    <td><input type="radio" name="object_id" className="" value={id} onClick={() => {this.selectedRow(id, name)}}/></td>
                    <td>{name}</td>
                </tr>
            )
        });

        const styleAddBlock = this.state.isAddGenreError ? "form-control d-inline-block form-label red-box" : "form-control d-inline-block form-label";
        const addWindow  = !this.props.isAddWindow ? null :
            <div id="add-genre-block">
                <div className="card card-body mb-2">
                    <form onSubmit={this.addGenre}>
                        <div className="genre-form d-flex">
                            <input type="text" placeholder="Write new genre here..." className={styleAddBlock} onChange={this.changeAddGenre} value={this.props.addGenreField}/>
                            <button type="submit" className="btn btn-info form-button mt-0 ml-2">Add</button>
                        </div>
                        {this.state.isAddGenreError ? <div className="red-text">{this.state.formError.addGenre}</div> : null}
                    </form>
                </div>
            </div>;

        const styleEditBlock = this.state.isEditGenreError ? "form-control d-inline-block form-label red-box" : "form-control d-inline-block form-label";
        const editWindow = !this.props.isEditWindow ? null :
            <div id="edit-genre-block">
                <div className="card card-body">
                    <form onSubmit={this.editGenre}>
                        <div className="genre-form d-flex">
                            <input type="text" placeholder="Write new genre here..." className={styleEditBlock} onChange={this.changeEditGenre} value={this.props.editGenreField}/>
                            <button type="submit" className="btn btn-info form-button mt-0 ml-2">Update</button>
                        </div>
                        {this.state.isEditGenreError ? <div className="red-text">{this.state.formError.editGenre}</div> : null}
                    </form>
                </div>
            </div>;

        return (
            <div>
                <Header/>

                <main role="main">

                    <div className="container genres-page">
                        <h1>Genres</h1>

                        <div className="genres-tools">
                            <button className="btn btn-outline-danger float-right my-1 item-control" onClick={this.onDeleteButtonClick}>
                                <i className="fa fa-trash-o"/>
                            </button>

                            <button className="btn btn-outline-warning float-right my-1 item-control" onClick={this.onEditButtonClick}>
                                <i className="fa fa-pencil"/>
                            </button>

                            <button className="btn btn-outline-success float-right my-1 item-control" onClick={this.onAddButtonClick}>
                                <i className="fa fa-plus"/>
                            </button>
                        </div>

                        <br/>
                        <br/>

                        {addWindow}

                        {editWindow}

                        <table className="table mt-2">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
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

const mapStateToProps = ({genresList, authorizationBlock}) => {
    return {
        isLoggedIn : authorizationBlock.isLoggedIn,
        genres : genresList.genres,
        loading : genresList.loading,
        error : genresList.error,
        isAddWindow :genresList.isAddWindow,
        isEditWindow : genresList.isEditWindow,
        addGenreField : genresList.addGenreField,
        editGenreField: genresList.editGenreField,
        selectedItem: genresList.selectedItem
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRequest : () => {dispatch(genresRequested())},
        onLoaded : (newGenres) => {dispatch(genresLoaded(newGenres))},
        changeAddWindow : (value) => {dispatch(genreShowAddWindow(value))},
        changeEditWindow : (value) => {dispatch(genreShowEditWindow(value))},
        onAddFieldChange : (value) => {dispatch(genreUpdateAddField(value))},
        onEditFieldChange : (value) => {dispatch(genreUpdateEditField(value))},
        onItemChange : (item) => {dispatch(genreUpdateSelectedItem(item))}
    }
};

export default compose(
    withLibraryService(),
    connect(mapStateToProps, mapDispatchToProps)
    )(GenresPage);