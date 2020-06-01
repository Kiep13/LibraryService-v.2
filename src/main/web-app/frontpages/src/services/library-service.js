import axios from "axios";

export default class LibraryService {

    _urlBase = "http://localhost:8080/";

    getAllGenres  = async () => {
        let genres = [];

        await axios.get(`${this._urlBase}genres`)
            .then(response => {
                if(response.data != null) {
                    genres = response.data;
                }
            });
        
        return genres;
    };

    getAllAuthors =  async () => {
        let authors = [];

        await  axios.get(`${this._urlBase}authors`)
            .then(response => {
                if(response.data != null) {
                    authors = response.data;
                }
            });

        return authors;
    };

    getAllPublishers = async() => {
        let publishers = [];

        await axios.get(`${this._urlBase}publishers`)
            .then(response => {
                if(response.data != null) {
                    publishers = response.data;
                }
            });

        return publishers;
    };

    getAllBooks = async() => {
        let books = [];

        await axios.get(`${this._urlBase}books`)
            .then(response => {
                if(response.data != null) {
                    books = response.data;
                }
            });

        return books;
    };

    getAllLibraries = async () => {
        let libraries = [];

        await axios.get(`${this._urlBase}libraries`)
            .then(response => {
                if(response.data != null) {
                    libraries = response.data;
                }
            });

        return libraries;
    };

    getBookFund = async () => {
        let book_fund = [];

        await axios.get(`${this._urlBase}bookfund`)
            .then(response => {
                if(response.data != null) {
                    book_fund = response.data;
                }
            });

        return book_fund;
    };



    addGenre = async (genre) => {
        let result = false;

        await axios.post(`${this._urlBase}genre-add`, genre)
            .then(response => {
                console.log(response);
                console.log(response.data);
                if(result.data != null) {
                    result = true;
                }
            });

        return result;
    };

    addAuthor = async (author) => {
        let result = false;

        await axios.post(`${this._urlBase}author-add`, author)
            .then(response => {
                if(response.data === "") {
                    result = true;
                }
            });

        return result;
    };

    addPublisher = async (publisher) => {
        let result = false;

        await axios.post(`${this._urlBase}publisher-add`, publisher)
            .then(response => {
                if(response.data != null) {
                    result = response.data;
                }
            });

        return result;
    };

    addBook = async (book) => {
        let result = false;

        await axios.post(`${this._urlBase}book-add`, book)
            .then(response => {
                if(response.data != null) {
                    result = response.data;
                }
            });

        return result;
    };

    addLibrary = async (library) => {
        let result = false;

        await axios.post(`${this._urlBase}library-add`, library)
            .then(response => {
                if(response.data != null) {
                    result = response.data;
                }
            });

        return result;
    };

    addBookFund = async (bookFund) => {
        let result = false;

        await axios.post(`${this._urlBase}bookfund-add`, bookFund)
            .then(response => {
                if(response.data != null) {
                    result = true;
                }
            });

        return result;
    };



    editGenre = async (genre) => {
        let result = false;

        await axios.put(`${this._urlBase}genre-edit`, genre)
            .then(responce => {
                if(responce.data === "") {
                    result = true;
                }
            });

        return result;
    };

    editAuthor = async (author) => {
        let result = false;

        await axios.put(`${this._urlBase}author-edit`, author)
            .then((response => {
                if(response.data === "") {
                    result = true;
                }
            }));

        return result;
    };

    editPublisher = async (publisher) => {
        let result = false;

        await axios.put(`${this._urlBase}publisher-edit`, publisher)
            .then(response => {
                if(response.data != null) {
                    result = true;
                }
            });

        return result;
    };

    editBook = async (book) => {
        let result = false;

        await axios.put(`${this._urlBase}book-edit`, book)
            .then(response => {
                if(response.data != null) {
                    result = true;
                }
            });

        return result;
    };

    editLibrary = async (library) => {
        let result = false;

        await axios.put(`${this._urlBase}library-edit`, library)
            .then(response => {
                if(response.data != null) {
                    result = true;
                }
            });

        return result;
    };

    editBookFund = async (bookFund) => {
        let result = false;

        await axios.put(`${this._urlBase}bookfund-edit`, bookFund)
            .then(response => {
                if(response.data != null) {
                    result = true;
                }
            });

        return result;
    };



    deleteGenre = async (id) => {
        let result = false;

        await axios.delete(`http://localhost:8080/genre-delete/${id}`)
            .then(response => {
                if(response.data === "") {
                    response = true;
                }
            });

        return result;
    };

    deleteAuthor = async (id) => {
        let result = false;

        await axios.delete(`${this._urlBase}author-delete/${id}`)
            .then(response => {
                if (response.data === "") {
                    response = true;
                }
            });

        return result;
    };

    deletePublisher = async (id) => {
        let result = false;

        await axios.delete(`${this._urlBase}publisher-delete/${id}`)
            .then(response => {
                if(response.data != null){
                    result = true;
                }
            });

        return result;
    };

    deleteBook = async (id) => {
        let result = false;

        await axios.delete(`${this._urlBase}book-delete/${id}`)
            .then(response => {
                if(response.data != null){
                    result = true;
                }
            });

        return result;
    };

    deleteLibrary = async (id) => {
        let result = false;

        await axios.delete(`${this._urlBase}library-delete/${id}`)
            .then(response => {
                if(response.data != null){
                    result = true;
                }
            });

        return result;
    };

    deleteBookFund = async (id) => {
        let result = false;

        await axios.delete(`${this._urlBase}bookfund-delete/${id}`)
            .then(response => {
                if(response.data != null){
                    result = true;
                }
            });

        return result;
    };

    addAdmin = async (admin)  => {
        let result = false;

        await axios.post(`${this._urlBase}registration`, admin)
            .then(response => {
                if(response.status === 201) {
                    result = true;
                }
            });

        return result;
    };

    logIn = async (admin) => {
        let result = false;

        await axios.put(`${this._urlBase}log-in`, admin)
            .then(response => {
                if(response.data.length === 1) {
                    result = true;
                }
            });

        return result;
    }

};