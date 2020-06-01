import React, {Component} from "react";
import Header from "../header";
import Spinner from "../spinner";
import {compose} from "../../utils";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import withLibraryService from "../../hoc";
import {
    booksRequested,
    booksLoaded,
    booksShowAddWindow,
    booksShowEditWindow,
    booksUpdateAddTitleField,
    booksUpdateAddAuthorField,
    booksUpdateAddGenreField,
    booksUpdateAddYearField,
    booksUpdateAddPublisherField,
    booksUpdateAddPagesField,
    booksUpdateEditTitleField,
    booksUpdateEditAuthorField,
    booksUpdateEditGenreField,
    booksUpdateEditYearField,
    booksUpdateEditPublisherField,
    booksUpdateEditPagesField,
    booksUpdateSelectedItem
} from "../../actions/books-actions";
import {authorsLoaded} from "../../actions/authors-actions";
import {genresLoaded} from "../../actions/genres-actions";
import {publishersLoaded} from "../../actions/publishers-actions";
import "./books-page.css";

class BooksPage extends Component {

    // necessary for error handling and pointless, in my opinion, for rendering to the global state
    state = {
        isAddTitleError : false,
        isAddYearError : false,
        isAddPagesError : false,
        isEditTitleError : false,
        isEditYearError : false,
        isEditPagesError : false,
    };

    //regular expressions for checking entered data
    regExpNumber = new RegExp("^[0-9]+$");

    //error messages
    errorTitleMessage = "The length of the book title must be at least 2";
    errorYearMessage = "The year must be a four-digit integer no less than 1850 and no more than the current year";
    errorPagesMessage = "The number of pages must be an integer no less than 5 and no more than 2000";

    componentDidMount() {
        this.props.onRequest();
        this.getAllAuthors();
        this.getAllGenres();
        this.getAllPublishers();
        this.getAllBooks();
    }

    validateWord = (word, isErrorField) => {
        const isError = word.length < 3;
        this.changeErrorState(isErrorField, isError);
    };

    validateYear = (year, isErrorField) => {
        let isError = !this.regExpNumber.test(year);
        const date = new Date();
        isError = !isError ? ((year < 1850) || (year > date.getFullYear())) : isError;
        this.changeErrorState(isErrorField,  isError);
    };

    validatePages= (pages, isErrorField) => {
        let isError = !this.regExpNumber.test(pages);
        isError = !isError ? ((pages < 5) || (pages > 2000)) : isError;
        this.changeErrorState(isErrorField,  isError);
    };

    changeErrorState = (isErrorField, value) => {
        this.setState({
            [isErrorField] : value
        })
    };

    getAllAuthors = async () => {
        let authors = await this.props.libraryService.getAllAuthors();
        this.props.onLoadedAuthors(authors);
    };

    getAllGenres = async () => {
        let genres = await this.props.libraryService.getAllGenres();
        this.props.onLoadedGenres(genres);
    };

    getAllPublishers = async () => {
        let publishers = await this.props.libraryService.getAllPublishers();
        this.props.onLoadedPublishers(publishers);
    };

    getAllBooks = async () => {
        const books = await this.props.libraryService.getAllBooks();
        this.props.onLoaded(books);
    };

    findAuthor = (id) => {
        return this.props.authors.find((el) => el.id === +id);
    };

    findGenre = (id) => {
        return this.props.genres.find((el) => el.id === +id);
    };

    findPublisher = (id) => {
        return this.props.publishers.find((el) => el.id === +id);
    };

    changeAddTitle = event => {
        event.preventDefault();
        this.validateWord(event.target.value, "isAddTitleError");
        this.props.changeAddTitle(event.target.value);
    };

    changeAddAuthor = event => {
        event.preventDefault();
        this.props.changeAddAuthor(this.findAuthor(event.target.value));
    };

    changeAddGenre = event => {
        event.preventDefault();
        this.props.changeAddGenre(this.findGenre(event.target.value));
    };

    changeAddPublisher= event => {
        event.preventDefault();
        this.props.changeAddPublisher(this.findPublisher(event.target.value));
    };

    changeAddYear= event => {
        event.preventDefault();
        this.validateYear(event.target.value, "isAddYearError");
        this.props.changeAddYear(event.target.value);
    };

    changeAddAmountOfPages = event => {
        event.preventDefault();
        this.validatePages(event.target.value, "isAddPagesError");
        this.props.changeAddPages(event.target.value);
    };

    changeEditTitle = event => {
        event.preventDefault();
        this.validateWord(event.target.value, "isEditTitleError");
        this.props.changeEditTitle(event.target.value);
    };

    changeEditAuthor = event => {
        event.preventDefault();
        this.props.changeEditAuthor(this.findAuthor(event.target.value));
    };

    changeEditGenre = event => {
        event.preventDefault();
        this.props.changeEditGenre(this.findGenre(event.target.value));
    };

    changeEditPublisher= event => {
        event.preventDefault();
        this.props.changeEditPublisher(this.findPublisher(event.target.value));
    };

    changeEditYear= event => {
        event.preventDefault();
        this.validateYear(event.target.value, "isEditYearError");
        this.props.changeEditYear(event.target.value);
    };

    changeEditAmountOfPages = event => {
        event.preventDefault();
        this.validatePages(event.target.value, "isEditPagesError");
        this.props.changeEditPages(event.target.value);
    };

    onAddClick = async event => {
        event.preventDefault();
        if(!this.props.isEditWindow) {
            const value = this.props.isAddWindow;
            if(value) {
                this.changeErrorState("isAddTitleError", "", false);
                this.changeErrorState("isAddYearError", "", false);
                this.changeErrorState("isAddPagesError", "", false);
                this.props.changeAddTitle("");
                this.props.changeAddYear("");
                this.props.changeAddPages("");
                this.props.changeAddAuthor(this.props.authors[0]);
                this.props.changeAddPublisher(this.props.publishers[0]);
                this.props.changeAddGenre(this.props.genres[0]);
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
                alert("You did not choose book!");
            }
        } else {
            alert("You have opened add window");
        }
    };

    onDeleteClick = async event => {
        event.preventDefault();

        if(this.props.selectedItem != null) {
            await this.props.libraryService.deleteBook(this.props.selectedItem);
            this.props.onRequest();
            this.getAllBooks();
        } else {
            alert("You did not choose book!");
        }
    };

    addBook = async event => {
        event.preventDefault();

        const {addTitle, addAuthor, addGenre, addYear, addPublisher, addAmountOfPages} = this.props.addBook;
        await this.validateWord(addTitle, "isAddTitleError");
        await this.validateYear(addYear, "isAddYearError");
        await this.validatePages(addAmountOfPages, "isAddPagesError");
        const isError = this.state.isAddTitleError || this.state.isAddYearError || this.state.isAddPagesError;

        if(!isError) {
            const book = {
                title : addTitle,
                author : addAuthor,
                genre : addGenre,
                year : +addYear,
                publisher : addPublisher,
                amount_pages : +addAmountOfPages
            };

            await this.props.libraryService.addBook(book);
            this.props.onRequest();
            this.getAllBooks();
        }
    };

    editBook = async event => {
        event.preventDefault();

        const isError = this.state.isEditTitleError || this.state.isEditYearError || this.state.isEditPagesError;

        if(!isError) {
            const { editTitle, editAuthor, editGenre, editYear, editPublisher, editAmountOfPages} = this.props.editBook;
            const book = {
                id : this.props.selectedItem,
                title : editTitle,
                author : editAuthor,
                genre : editGenre,
                year : +editYear,
                publisher : editPublisher,
                amount_pages : +editAmountOfPages
            };

            await this.props.libraryService.editBook(book);
            this.props.onRequest();
            this.getAllBooks();
        }
    };

    selectedRow = (item) => {
        const {id, ...data} = item;
        const book = {
            editTitle : data.title,
            editAuthor : data.author,
            editGenre : data.genre,
            editYear : data.year,
            editPublisher : data.publisher,
            editAmountOfPages : data.amount_pages
        };
        this.props.changeItem({id, book});
        this.changeErrorState("isEditTitleError", "", false);
        this.changeErrorState("isEditYearError", "", false);
        this.changeErrorState("isEditPagesError", "", false);
    };

    render () {

        if(!this.props.isLoggedIn) {
            return <Redirect to='/authorization'/>
        }

        if(this.props.loading){
            return <Spinner/>
        }

        const authors = this.props.authors.map(({id, surname, name, patronymic} )=> {
            return (
                <option key={id} value={id}>{surname} {name} {patronymic}</option>
            )
        });

        const genres = this.props.genres.map(({id, name}) => {
            return (
                <option key={id} value={id}>{name}</option>
            )
        });

        const publishers = this.props.publishers.map(({id, publisher}) => {
            return (
                <option key={id} value={id}>{publisher}</option>
            )
        });

        const rows = this.props.books.map((el) => {

            const {id, title, author, genre, year, publisher, amount_pages} = el;

            return (
                <tr key={id}>
                    <td><input type="radio" name="object_id" value={id} onClick={() => {this.selectedRow(el)}}/></td>
                    <td>{title}</td>
                    <td>{author.surname} {author.name} {author.patronymic}</td>
                    <td>{genre.name}</td>
                    <td>{year}</td>
                    <td>{publisher.publisher}</td>
                    <td>{amount_pages}</td>
                </tr>
            )
        });

        const {addTitle, addAuthor, addGenre, addYear, addPublisher, addAmountOfPages} = this.props.addBook;
        const {editTitle, editAuthor, editGenre, editYear, editPublisher, editAmountOfPages} = this.props.editBook;

        const styleAddTitle = this.state.isAddTitleError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";
        const styleAddYear = this.state.isAddYearError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";
        const styleAddPages = this.state.isAddPagesError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";

        const addWindow = !this.props.isAddWindow ? null :
            <div id="add-book-block">
                <div className="card card-body mb-2">
                    <form onSubmit={this.addBook}>
                        <div className="books-form">
                            <input type="text" placeholder="Write title of new book here..." className={styleAddTitle} onChange={this.changeAddTitle} value={addTitle}/>
                            {this.state.isAddTitleError ? <div className="red-text mb-2">{this.errorTitleMessage}</div> : null}
                            <div className="row">

                                <div className="dropdown d-inline-block mb-2 form-label col ml-0 mr-1">
                                    <select id="add-author-list" className="form-control" onChange={this.changeAddAuthor} value={addAuthor.id}>
                                        {authors}
                                    </select>
                                </div>
                                <div className="dropdown d-inline-block mb-2 form-label col ml-1 mr-1">
                                    <select id="add-genre-list" className="form-control" onChange={this.changeAddGenre} value={addGenre.id}>
                                        {genres}
                                    </select>
                                </div>
                                <div className="dropdown d-inline-block mb-2 form-label col ml-1 mr-0">
                                    <select id="add-publisher-list" className="form-control" onChange={this.changeAddPublisher} value={addPublisher.id}>
                                        {publishers}
                                    </select>
                                </div>

                            </div>

                            <input type="text" placeholder="Write year of new book here..." className={styleAddYear} onChange={this.changeAddYear} value={addYear}/>
                            {this.state.isAddYearError ? <div className="red-text mb-2">{this.errorYearMessage}</div> : null}
                            <input type="text" placeholder="Write amount of pages of new book here..." className={styleAddPages} onChange={this.changeAddAmountOfPages} value={addAmountOfPages}/>
                            {this.state.isAddPagesError ? <div className="red-text mb-2">{this.errorPagesMessage}</div> : null}
                            <button type="submit" className="btn btn-info form-button mt-2">Add</button>
                        </div>
                    </form>
                </div>
            </div>;

        const styleEditTitle = this.state.isEditTitleError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";
        const styleEditYear = this.state.isEditYearError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";
        const styleEditPages = this.state.isEditPagesError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";

        const editWindow = !this.props.isEditWindow ? null :
            <div id="edit-book-block">
                <div className="card card-body mb-2">
                    <form onSubmit={this.editBook}>
                        <div className="books-form">
                            <input type="text" placeholder="Write title of new book here..." className={styleEditTitle}onChange={this.changeEditTitle} value={editTitle}/>
                            {this.state.isEditTitleError ? <div className="red-text mb-2">{this.errorTitleMessage}</div> : null}
                            <div className="row">
                                <div className="dropdown d-inline-block mb-2 form-label col ml-0 mr-1">
                                    <select id="edit-author-list" className="form-control" onChange={this.changeEditAuthor} value={editAuthor.id}>
                                        {authors}
                                    </select>
                                </div>
                                <div className="dropdown d-inline-block mb-2 form-label col ml-1 mr-1">
                                    <select id="edit-genre-list" className="form-control" onChange={this.changeEditGenre} value={editGenre.id}>
                                        {genres}
                                    </select>
                                </div>
                                <div className="dropdown d-inline-block mb-2 form-label col ml-1 mr-0">
                                    <select id="edit-publisher-list" className="form-control" onChange={this.changeEditPublisher} value={editPublisher.id}>
                                        {publishers}
                                    </select>
                                </div>
                            </div>
                            <input type="text" placeholder="Write year of new book here..." className={styleEditYear} onChange={this.changeEditYear} value={editYear}/>
                            {this.state.isEditYearError ? <div className="red-text mb-2">{this.errorYearMessage}</div> : null}
                            <input type="text" placeholder="Write amount of pages of new book here..." className={styleEditPages} onChange={this.changeEditAmountOfPages} value={editAmountOfPages}/>
                            {this.state.isEditPagesError ? <div className="red-text mb-2">{this.errorPagesMessage}</div> : null}
                            <button type="submit" className="btn btn-info form-button mt-2">Update</button>
                        </div>
                    </form>
                </div>
            </div>;

        return (
            <div>
                <Header/>

                <main role="main">

                    <div className="container books-page">
                        <h1>Books</h1>

                        <div className="books-tools">
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
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Year</th>
                                <th>Publisher</th>
                                <th>Amount of pages</th>
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

const mapStateToProps = ({authorsList, genresList, publishersList, booksList, authorizationBlock}) => {
    return {
        isLoggedIn : authorizationBlock.isLoggedIn,
        books : booksList.books,
        loading : booksList.loading,
        authors : authorsList.authors,
        genres : genresList.genres,
        publishers : publishersList.publishers,
        isAddWindow : booksList.isAddWindow,
        isEditWindow : booksList.isEditWindow,
        addBook : booksList.addBook,
        editBook : booksList.editBook,
        selectedItem : booksList.selectedItem
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRequest : () => {dispatch(booksRequested())},
        onLoadedAuthors : (newAuthors) => {dispatch(authorsLoaded(newAuthors))},
        onLoadedGenres : (newGenres) => {dispatch(genresLoaded(newGenres))},
        onLoadedPublishers : (newPublishers) => {dispatch(publishersLoaded(newPublishers))},
        onLoaded : (newBooks) => {dispatch(booksLoaded(newBooks))},
        changeAddWindow : (value) => {dispatch(booksShowAddWindow(value))},
        changeEditWindow : (value) => {dispatch(booksShowEditWindow(value))},
        changeAddTitle : (value) => {dispatch(booksUpdateAddTitleField(value))},
        changeAddAuthor : (value) => {dispatch(booksUpdateAddAuthorField(value))},
        changeAddGenre : (value) => {dispatch(booksUpdateAddGenreField(value))},
        changeAddYear : (value) => {dispatch(booksUpdateAddYearField(value))},
        changeAddPublisher : (value) => {dispatch(booksUpdateAddPublisherField(value))},
        changeAddPages : (value) => {dispatch(booksUpdateAddPagesField(value))},
        changeEditTitle : (value) => {dispatch(booksUpdateEditTitleField(value))},
        changeEditAuthor : (value) => {dispatch(booksUpdateEditAuthorField(value))},
        changeEditGenre : (value) => {dispatch(booksUpdateEditGenreField(value))},
        changeEditYear : (value) => {dispatch(booksUpdateEditYearField(value))},
        changeEditPublisher : (value) => {dispatch(booksUpdateEditPublisherField(value))},
        changeEditPages : (value) => {dispatch(booksUpdateEditPagesField(value))},
        changeItem : (item) => {dispatch(booksUpdateSelectedItem(item))}
    }
};

export default compose(
        withLibraryService(),
        connect(mapStateToProps, mapDispatchToProps)
    )(BooksPage);