import React, {Component} from "react";
import "./bookfund-page.css";
import Spinner from "../spinner";
import Header from "../header";
import {Redirect} from 'react-router-dom';
import {compose} from "../../utils";
import {connect} from "react-redux";
import withLibraryService from "../../hoc";
import {
    bookFundRequested,
    bookFundLoaded,
    bookFundShowAddWindow,
    bookFundShowEditWindow,
    bookFundUpdateAddBookField,
    bookFundUpdateAddLibraryField,
    bookFundUpdateAddAmountField,
    bookFundUpdateEditBookField,
    bookFundUpdateEditLibraryField,
    bookFundUpdateEditAmountField,
    booksFundUpdateSelectedItem
} from "../../actions/book-fund-actions";
import {booksLoaded} from "../../actions/books-actions";
import {librariesLoaded} from "../../actions/libraries-actions";

class BookFundPage extends Component {

    // necessary for error handling and pointless, in my opinion, for rendering to the global state
    state = {
        isAddAmountError : false,
        isEditAmountError : false,
    };

    componentDidMount() {
        this.props.onRequest();
        this.getAllBooks();
        this.getAllLibraries();
        this.getBookFund();
    }

    //regular expressions for checking entered data
    regExpNumber = new RegExp("^[0-9]+$");

    //error message
    errorAmountMessage = "The amount of books must be in the range from 1 to 200";

    validateAmount = (amount, isErrorField) => {
        let isError = !this.regExpNumber.test(amount);
        isError = !isError ? ((amount < 0) || (amount > 200)) : isError;
        this.changeErrorState(isErrorField,  isError);
    };

    changeErrorState = (isErrorField, value) => {
        this.setState({
            [isErrorField] : value
        })
    };

    getAllBooks = async () => {
        const books = await this.props.libraryService.getAllBooks();
        this.props.onLoadedBooks(books);
    };

    getAllLibraries = async () => {
        const libraries = await this.props.libraryService.getAllLibraries();
        this.props.onLoadedLibraries(libraries);
    };

    getBookFund = async () => {
        const book_fund = await this.props.libraryService.getBookFund();
        this.props.onLoaded(book_fund);
    };

    findBook = (id) => {
        return this.props.books.find((el) => el.id === +id);
    };

    findLibrary = (id) => {
        return this.props.libraries.find((el) => el.id === +id);
    };

    changeAddBook= event => {
        event.preventDefault();
        this.props.changeAddBook(this.findBook(event.target.value));
    };

    changeAddLibrary = event => {
        event.preventDefault();
        this.props.changeAddLibrary(this.findLibrary(event.target.value));
    };

    changeAddAmount = event => {
        event.preventDefault();
        this.validateAmount(event.target.value, "isAddAmountError");
        this.props.changeAddAmount(event.target.value);
    };

    changeEditBook= event => {
        event.preventDefault();
        this.props.changeEditBook(this.findBook(event.target.value));
    };

    changeEditLibrary = event => {
        event.preventDefault();
        this.props.changeEditLibrary(this.findLibrary(event.target.value));
    };

    changeEditAmount = event => {
        event.preventDefault();
        this.validateAmount(event.target.value, "isEditAmountError");
        this.props.changeEditAmount(event.target.value);
    };

    onAddClick = async event => {
        event.preventDefault();
        if(!this.props.isEditWindow) {
            const value = this.props.isAddWindow;
            if(value) {
                this.changeErrorState("isAddAmountError", "", false);
                this.props.changeAddAmount("");
                this.props.changeAddBook(this.props.books[0]);
                this.props.changeAddLibrary(this.props.libraries[0]);
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
                alert("You did not choose record!");
            }
        } else {
            alert("You have opened add window");
        }
    };

    onDeleteClick = async event => {
        event.preventDefault();

        if(this.props.selectedItem != null) {
            await this.props.libraryService.deleteBookFund(this.props.selectedItem);
            this.props.onRequest();
            this.getBookFund();
        } else {
            alert("You did not choose record!");
        }
    };

    addBookFund = async event => {
        event.preventDefault();

        await this.validateAmount(this.props.addBookFund.addAmount, "isAddAmountError");

        if(!this.state.isAddAmountError) {
            const bookFund = {
                book : this.props.addBookFund.addBook,
                library : this.props.addBookFund.addLibrary,
                amount : +this.props.addBookFund.addAmount
            };

            await this.props.libraryService.addBookFund(bookFund);
            this.props.onRequest();
            this.getBookFund();
        }

    };

    editBookFund = async event => {
        event.preventDefault();

        const { editBook, editLibrary, editAmount } = this.props.editBookFund;
        await this.validateAmount(editAmount, "isEditAmountError");

        if(!this.state.isEditAmountError) {

            const bookFund = {
                id : this.props.selectedItem,
                book : editBook,
                library: editLibrary,
                amount : +editAmount
            };

            await this.props.libraryService.editBookFund(bookFund);
            this.props.onRequest();
            this.getBookFund();
        }
    };

    selectedRow = ({id, book, library, amount}) => {
        const book_fund = {
            editBook : book,
            editLibrary: library,
            editAmount: amount
        };
        this.props.changeItem({id, book_fund});
        this.changeErrorState("isEditAmountError", "", false);
    };

    render() {

        if(!this.props.isLoggedIn) {
            return <Redirect to='/authorization'/>
        }

        if(this.props.loading){
            return <Spinner/>
        }

        const books = this.props.books.map(({id, title, year} )=> {
            return (
                <option key={id} value={id}>{title} ({year})</option>
            )
        });

        const libraries = this.props.libraries.map(({id, name}) => {
            return (
                <option key={id} value={id}>{name}</option>
            )
        });

        const rows = this.props.book_fund.map((el) => {

            const {id, book, library} = el;
            const {title, author, genre, year, publisher, amount_pages } = book;
            const {name, address, telephone} = library;

            return (
                <tr key={id}>
                    <td><input type="radio" name="object_id" value={id} onClick={() => {this.selectedRow(el)}}/></td>
                    <td>{title}</td>
                    <td>{author.surname} {author.name} {author.patronymic}</td>
                    <td>{genre.name}</td>
                    <td>{year}</td>
                    <td>{publisher.publisher}</td>
                    <td>{amount_pages}</td>
                    <td>{name}</td>
                    <td>{address}</td>
                    <td>{telephone}</td>
                </tr>
            )
        });

        const {addBook, addLibrary, addAmount} = this.props.addBookFund;
        const {editBook, editLibrary, editAmount} = this.props.editBookFund;

        const styleAddAmount = this.state.isAddAmountError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";

        const addWindow = !this.props.isAddWindow ? null :
            <div id="add-book-fund-block">
                <div className="card card-body mb-2">
                    <form onSubmit={this.addBookFund}>
                        <div className="book-fund-form">
                            <div className="row">
                                <div className="dropdown d-inline-block mb-2 form-label col ml-0 mr-1">
                                    <select id="add-books-list" className="form-control" onChange={this.changeAddBook} value={addBook.id}>
                                        {books}
                                    </select>
                                </div>
                                <div className="dropdown d-inline-block mb-2 form-label col ml-1 mr-0">
                                    <select id="add-libraries-list" className="form-control" onChange={this.changeAddLibrary} value={addLibrary.id}>
                                        {libraries}
                                    </select>
                                </div>
                            </div>
                            <input type="text" placeholder="Write year of new book here..." className={styleAddAmount} onChange={this.changeAddAmount} value={addAmount}/>
                            {this.state.isAddAmountError ? <div className="red-text mb-2">{this.errorAmountMessage}</div> : null}
                            <button type="submit" className="btn btn-info form-button mt-2">Add</button>
                        </div>
                    </form>
                </div>
            </div>;

        const styleEditAmount = this.state.isEditAmountError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";

        const editWindow = !this.props.isEditWindow ? null :
            <div id="edit-book-fund-block">
                <div className="card card-body mb-2">
                    <form onSubmit={this.editBookFund}>
                        <div className="book-fund-form">
                            <div className="row">
                                <div className="dropdown d-inline-block mb-2 form-label col ml-0 mr-1">
                                    <select id="edit-books-list" className="form-control" onChange={this.changeEditBook} value={editBook.id}>
                                        {books}
                                    </select>
                                </div>
                                <div className="dropdown d-inline-block mb-2 form-label col ml-1 mr-0">
                                    <select id="edit-libraries-list" className="form-control" onChange={this.changeEditLibrary} value={editLibrary.id}>
                                        {libraries}
                                    </select>
                                </div>
                            </div>

                            <input type="text" placeholder="Write year of new book here..." className={styleEditAmount} onChange={this.changeEditAmount} value={editAmount}/>
                            {this.state.isEditAmountError ? <div className="red-text mb-2">{this.errorAmountMessage}</div> : null}
                            <button type="submit" className="btn btn-info form-button mt-2">Update</button>
                        </div>
                    </form>
                </div>
            </div>;

        return (
            <div>
                <Header/>

                <main role="main">

                    <div className="container book-fund-page">
                        <h1>BookFund</h1>

                        <div className="book-fund-tools">
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
                                <th>Pages</th>
                                <th>Library</th>
                                <th>Address</th>
                                <th>Telephone</th>
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

const mapStateToProps = ({booksList, librariesList, bookFundList, authorizationBlock}) => {
    return {
        isLoggedIn : authorizationBlock.isLoggedIn,
        book_fund : bookFundList.book_fund,
        books : booksList.books,
        libraries : librariesList.libraries,
        loading : bookFundList.loading,
        isAddWindow : bookFundList.isAddWindow,
        isEditWindow : bookFundList.isEditWindow,
        addBookFund : bookFundList.addBookFund,
        editBookFund : bookFundList.editBookFund,
        selectedItem : bookFundList.selectedItem
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRequest : () => {dispatch(bookFundRequested())},
        onLoadedBooks : (newBooks) => {dispatch(booksLoaded(newBooks))},
        onLoadedLibraries : (newLibraries) => {dispatch(librariesLoaded(newLibraries))},
        onLoaded : (newBookFund) => {dispatch(bookFundLoaded(newBookFund))},
        changeAddWindow : (value) => {dispatch(bookFundShowAddWindow(value))},
        changeEditWindow : (value) => {dispatch(bookFundShowEditWindow(value))},
        changeAddBook : (value) => {dispatch(bookFundUpdateAddBookField(value))},
        changeAddLibrary : (value) => {dispatch(bookFundUpdateAddLibraryField(value))},
        changeAddAmount : (value) => {dispatch(bookFundUpdateAddAmountField(value))},
        changeEditBook : (value) => {dispatch(bookFundUpdateEditBookField(value))},
        changeEditLibrary : (value) => {dispatch(bookFundUpdateEditLibraryField(value))},
        changeEditAmount : (value) => {dispatch(bookFundUpdateEditAmountField(value))},
        changeItem : (item) => {dispatch(booksFundUpdateSelectedItem(item))}
    }
};

export default compose(
        withLibraryService(),
        connect(mapStateToProps, mapDispatchToProps)
    )(BookFundPage);