import React, {Component} from 'react';
import './homepage.css';
import {Link} from 'react-router-dom';
import Spinner from "../spinner";
import {compose} from "../../utils";
import {connect} from "react-redux";
import withLibraryService from "../../hoc";
import {
    bookFundRequested,
    bookFundLoaded
} from "../../actions/book-fund-actions";
import {librariesLoaded} from "../../actions/libraries-actions";
import {homePageClear,
        homePageUpdateTitleMask,
        homePageUpdateAuthorMask,
        homePageUpdateGenreMask,
        homePageUpdatePublisherMask,
        homePageUpdateLibraryId,
        homePageUpdateSortField,
        homePageUpdateSearchOptions,
        homePageClearSearchOptions,
        homePageUpdateSearchWindow} from "../../actions/homepage-actions";


class HomePage extends Component{

    fieldsNames = [
        {key : 'title', value : 'Title'},
        {key : 'author', value : 'Author'},
        {key : 'genre', value : 'Genre'},
        {key : 'year', value : 'Year'},
        {key : 'publisher', value : 'Publisher'},
        {key : 'pages', value : 'Pages'},
        {key : 'library', value : 'Library'},
        {key : 'address', value : 'Address'},
        {key : 'telephone', value : 'Telephone'},
    ];

    componentDidMount() {
        this.props.onRequest();
        this.props.clear();
        this.getLibraries();
        this.getBookFund();
    }

    glueAuthor = (author) => {
        const { surname, name, patronymic} = author;
        return surname + " " + name + " " + patronymic;
    };

    solveTypeSorting = (field) => {
        switch(field) {
            case 'title' :
                return (a, b) => {
                    return  a.book.title.localeCompare(b.book.title);
                };
            case 'author' :
                return (a, b) => {
                    const authorA = this.glueAuthor(a.book.author);
                    const authorB = this.glueAuthor(b.book.author);
                    return authorA.localeCompare(authorB);
                };
            case 'genre' :
                return (a, b) => {
                    const genreA = a.book.genre.name;
                    const genreB = b.book.genre.name;
                    return genreA.localeCompare(genreB);
                };
            case 'year' :
                return (a, b) => {
                    const yearA = +a.book.year;
                    const yearB = +b.book.year;
                    if(yearA > yearB) return 1;
                    if(yearA === yearB) return 0;
                    return -1;
                };
            case 'publisher' :
                return (a, b) => {
                    const publisherA = a.book.publisher.publisher;
                    const publisherB = b.book.publisher.publisher;
                    return publisherA.localeCompare(publisherB);
                };
            case 'pages' :
                return (a, b) => {
                    const pagesA = +a.book.amount_pages;
                    const pagesB = +b.book.amount_pages;
                    if(pagesA > pagesB) return 1;
                    if(pagesA === pagesB) return 0;
                    return -1;
                };
            case 'library' :
                return (a, b) => {
                    return  a.library.name.localeCompare(b.library.name);
                };
            case 'address' :
                return (a, b) => {
                    return  a.library.address.localeCompare(b.library.address);
                };
            case 'telephone' :
                return (a, b) => {
                    return  a.library.telephone.localeCompare(b.library.telephone);
                };
            default :
                return (a, b) => {
                    return a.book.title.localeCompare(b.book.title);
                }
        }
    };

    filterUsingSearchOptions = (book_fund) => {
        console.log(this.props.officialSearchOptions);
        const {titleMask, authorMask, genreMask, publisherMask} = this.props.officialSearchOptions;
        const title_mask = titleMask.toLowerCase();
        const author_mask = authorMask.toLowerCase();
        const genre_mask = genreMask.toLowerCase();
        const publisher_mask = publisherMask.toLowerCase();
        return book_fund.filter(({book}) => {
            const author = book.author.surname + book.author.name + " " + book.author.patronymic;
            return ~book.title.toLowerCase().indexOf(title_mask) &&
                   ~author.toLowerCase().indexOf(author_mask) &&
                   ~book.genre.name.toLowerCase().indexOf(genre_mask) &&
                   ~book.publisher.publisher.toLowerCase().indexOf(publisher_mask);

        });
    };

    getLibraries = async () => {
        const libraries = await this.props.libraryService.getAllLibraries();
        this.props.onLoadedLibraries(libraries);
    };

    getBookFund = async () => {
        const bookFund = await this.props.libraryService.getBookFund();
        this.props.onLoaded(bookFund);
    };

    changeLibrary = event => {
        event.preventDefault();
        this.props.changeLibrary(event.target.value);
    };

    changeSortField = event => {
        event.preventDefault();
        this.props.changeSortField(event.target.value);
    };

    changeSearchWindow = event => {
        event.preventDefault();
        this.props.changeSearchWindow(!this.props.isSearchWindow)
    };

    changeTitleMask = event => {
        event.preventDefault();
        this.props.changeTitleMask(event.target.value);
    };

    changeAuthorMask = event => {
        event.preventDefault();
        this.props.changeAuthorMask(event.target.value);
    };

    changeGenreMask = event => {
        event.preventDefault();
        this.props.changeGenreMask(event.target.value);
    };

    changePublisherMask = event => {
        event.preventDefault();
        this.props.changePublisherMask(event.target.value);
    };

    changeSearchOptions = event => {
        event.preventDefault();
        this.props.changeSearchOptions();
    };

    clearSearchOptions = event => {
        event.preventDefault();
        this.props.clearSearchOptions();
    }

    render () {

        if(this.props.loading){
            return <Spinner/>
        }

        let book_fund = this.props.libraryId === "all" ? this.props.book_fund :
            this.props.book_fund.filter((el) => {
                return +el.library.id === +this.props.libraryId;
            });

        book_fund = this.filterUsingSearchOptions(book_fund);
        book_fund.sort(this.solveTypeSorting(this.props.sortField));



        const rows = book_fund.map((el) => {

            const {id, book, library} = el;
            const {title, author, genre, year, publisher, amount_pages } = book;
            const {name, address, telephone} = library;

            return (
                <tr key={id}>
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

        const sortItems = this.fieldsNames.map((el) => {
            return <option key={el.key} value={el.key}>{el.value}</option>
        });

        let librariesList = this.props.libraries.map((library) => {
            return <option key={library.id} value={library.id}>{library.name}</option>
        });

        librariesList = [ <option key="all" value="all">All</option>, ...librariesList];

        const {titleMask, authorMask, genreMask, publisherMask} = this.props.searchOptions;

        const searchWindow = !this.props.isSearchWindow ? null :
            <div className="card card-body mb-2 mt-2">
                <div className="home-form">
                    <div className="row">
                        <input type="text" placeholder="Specify title here..." className="form-control d-inline-block mb-2 form-label col ml-3 mr-2" onChange={this.changeTitleMask} value={titleMask}/>
                        <input type="text" placeholder="Specify author here..." className="form-control d-inline-block mb-2 form-label col ml-2 mr-3" onChange={this.changeAuthorMask} value={authorMask}/>
                    </div>
                    <div className="row">
                        <input type="text" placeholder="Specify genre here..." className="form-control d-inline-block mb-2 form-label col ml-3 mr-2" onChange={this.changeGenreMask} value={genreMask}/>
                        <input type="text" placeholder="Specify publisher here..." className="form-control d-inline-block mb-2 form-label col ml-2 mr-3" onChange={this.changePublisherMask} value={publisherMask}/>
                    </div>
                    <button className="btn btn-info form-button mt-2 float-left" onClick={this.clearSearchOptions}>Clear options</button>
                    <button className="btn btn-info form-button mt-2" onClick={this.changeSearchOptions}>Search</button>
                </div>
            </div>;

        return (
            <div>

                <div className="home-header">
                    <header className="blog-header py-3">
                        <div
                            className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                            <i className="fa fa-book home-logo large"/>
                            <h5 className="my-0 mr-md-auto font-weight-normal">LibraryService</h5>
                            <nav className="my-2 my-md-0 mr-md-3">
                                <Link to="/authorization" className="p-2 text-dark">Log in</Link>
                            </nav>
                        </div>
                    </header>
                </div>


                <main className="container home-content">

                    <h1 className="home-title">BookFund</h1>

                    <div className="home-tools d-flex">

                        <h5 className="d-inline-block home-library align-baseline">Library</h5>

                        <div className="dropdown home-dropdown d-inline-block home-ldropdown">
                            <select className="form-control" onChange={this.changeLibrary} value={this.props.libraryId}>
                                {librariesList}
                            </select>
                        </div>

                        <h5 className="d-inline-block home-sort">Sort by</h5>

                        <div className="dropdown home-dropdown d-inline-block home-sdropdown mr-auto">
                            <select className="form-control" onChange={this.changeSortField} value={this.props.sortField}>
                                {sortItems}
                            </select>
                        </div>

                        <button type="button" className="btn btn-info search-button" onClick={this.changeSearchWindow}>Search options</button>

                    </div>

                    {searchWindow}

                    <table className="table mt-2">
                        <thead>
                        <tr>
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

                </main>

            </div>
        )
    }
}

const mapStateToProps =({bookFundList, librariesList, homePage}) => {
    return {
        book_fund : bookFundList.book_fund,
        loading : bookFundList.loading,
        libraries : librariesList.libraries,
        libraryId : homePage.libraryId,
        sortField: homePage.sortField,
        isSearchWindow : homePage.isSearchWindow,
        searchOptions : homePage.searchOptions,
        officialSearchOptions: homePage.officialSearchOptions
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        clear : () => {dispatch(homePageClear())},
        onRequest : () => {dispatch(bookFundRequested())},
        onLoaded : (newBookFund) => {dispatch(bookFundLoaded(newBookFund))},
        onLoadedLibraries : (newLibraries) => {dispatch(librariesLoaded(newLibraries))},
        changeLibrary : (value) => {dispatch(homePageUpdateLibraryId(value))},
        changeSortField : (value) => {dispatch(homePageUpdateSortField(value))},
        changeSearchWindow : (value) => {dispatch(homePageUpdateSearchWindow(value))},
        changeTitleMask : (value) => {dispatch(homePageUpdateTitleMask(value))},
        changeAuthorMask : (value) => {dispatch(homePageUpdateAuthorMask(value))},
        changeGenreMask : (value) => {dispatch(homePageUpdateGenreMask(value))},
        changePublisherMask : (value) => {dispatch(homePageUpdatePublisherMask(value))},
        changeSearchOptions : () => {dispatch(homePageUpdateSearchOptions())},
        clearSearchOptions : () => {dispatch(homePageClearSearchOptions())}
    }
};

export default compose(
    withLibraryService(),
    connect(mapStateToProps, mapDispatchToProps)
)(HomePage);