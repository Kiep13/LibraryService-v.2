import React, {Component} from "react";
import "./libraries-page.css";
import Header from "../header";
import Spinner from "../spinner";
import {compose} from "../../utils";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import withLibraryService from "../../hoc";
import {
    librariesRequested,
    librariesLoaded,
    librariesShowAddWindow,
    librariesShowEditWindow,
    librariesUpdateAddSurnameField,
    librariesUpdateAddNameField,
    librariesUpdateAddAddressField,
    librariesUpdateAddTelephoneField,
    librariesUpdateEditNameField,
    librariesUpdateEditAddressField,
    librariesUpdateEditTelephoneField,
    librariesUpdateSelectedItem
} from "../../actions/libraries-actions";

class LibrariesPage extends Component {

    // necessary for error handling and pointless, in my opinion, for rendering to the global state
    state = {
        formError : {
            addName : "",
            addAddress : "",
            addTelephone : "",
            editName : "",
            editAddress : "",
            editTelephone : "",
        },
        isAddNameError : false,
        isAddAddressError : false,
        isAddTelephoneError : false,
        isEditNameError : false,
        isEditAddressError : false,
        isEditTelephoneError : false,
    };

    //regular expressions for checking entered data
    regExpTelephone = new RegExp("^[0-9]{2}-[0-9]{2}-[0-9]{2}$");

    //error messages
    errorNameMessage = "The length of the library name must be at least 3";
    errorAddressMessage = "The address length must be at least 3";
    errorTelephoneMessage = "Phone format XX-XX-XX";

    componentDidMount() {
        this.props.onRequest();
        this.getAllLibraries();
    }

    getAllLibraries = async () => {
        const libraries = await this.props.libraryService.getAllLibraries();
        this.props.onLoaded(libraries);
    };

    validateTelephone = (telephone, messageField, isErrorField) => {
        const isError = !this.regExpTelephone.test(telephone);
        const message = isError ? this.errorTelephoneMessage : "";
        this.changeErrorState(messageField, isErrorField, message, isError);
    };

    validateWord = (word, messageField, isErrorField, errorMess) => {
        const isError = word.length < 3;
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

    changeAddName = event => {
        event.preventDefault();
        this.validateWord(event.target.value, "addName", "isAddNameError", this.errorNameMessage);
        this.props.changeAddName(event.target.value)
    };

    changeAddAddress = event => {
        event.preventDefault();
        this.validateWord(event.target.value, "addAddress", "isAddAddressError", this.errorAddressMessage);
        this.props.changeAddAddress(event.target.value)
    };

    changeAddTelephone = event => {
        event.preventDefault();
        this.validateTelephone(event.target.value, "addTelephone", "isAddTelephoneError");
        this.props.changeAddTelephone(event.target.value)
    };

    changeEditName = event => {
        event.preventDefault();
        this.validateWord(event.target.value, "editName", "isEditNameError", this.errorNameMessage);
        this.props.changeEditName(event.target.value)
    };

    changeEditAddress = event => {
        event.preventDefault();
        this.validateWord(event.target.value, "editAddress", "isEditAddressError", this.errorAddressMessage);
        this.props.changeEditAddress(event.target.value)
    };

    changeEditTelephone = event => {
        event.preventDefault();
        this.validateTelephone(event.target.value, "editTelephone", "isEditTelephoneError");
        this.props.changeEditTelephone(event.target.value)
    };

    onAddClick = async event => {
        event.preventDefault();
        if(!this.props.isEditWindow) {
            const value = this.props.isAddWindow;
            if(value) {
                this.changeErrorState("addName", "isAddNameError", "", false);
                this.changeErrorState("addAddress", "isAddAddressError", "", false);
                this.changeErrorState("addTelephone", "isAddTelephoneError", "", false);
                this.props.changeAddName("");
                this.props.changeAddAddress("");
                this.props.changeAddTelephone("");
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
                alert("You did not choose library!");
            }
        } else {
            alert("You have opened add window");
        }
    };

    onDeleteClick = async event => {
        event.preventDefault();

        if(this.props.selectedItem != null) {
            await this.props.libraryService.deleteLibrary(this.props.selectedItem);
            this.props.onRequest();
            this.getAllLibraries();
        } else {
            alert("You did not choose library!");
        }
    };

    addLibrary = async event => {
        event.preventDefault();

        const {addName, addAddress, addTelephone} = this.props.addLibrary;
        await this.validateWord(addName, "addName", "isAddNameError", this.errorNameMessage);
        await this.validateWord(addAddress, "addAddress", "isAddAddressError", this.errorAddressMessage);
        await this.validateTelephone(addTelephone, "addTelephone", "isAddTelephoneError");
        const isError = this.state.isAddNameError || this.state.isAddAddressError || this.state.isAddTelephoneError;

        if(!isError) {
            const library = {
                name : addName,
                address : addAddress,
                telephone : addTelephone
            };

            await this.props.libraryService.addLibrary(library);
            this.props.onRequest();
            this.getAllLibraries();
        }
    };


    editLibrary = async event => {
        event.preventDefault();

        const isError = this.state.isEditNameError || this.state.isEditAddressError || this.state.isEditTelephoneError;

        if(!isError) {
            const library = {
                id : this.props.selectedItem,
                name : this.props.editLibrary.editName,
                address : this.props.editLibrary.editAddress,
                telephone : this.props.editLibrary.editTelephone
            };

            await this.props.libraryService.editLibrary(library);
            this.props.onRequest();
            this.getAllLibraries();
        }
    };

    selectedRow = (id, name, address, telephone) => {
        const library = {
            editName : name,
            editAddress : address,
            editTelephone : telephone
        };
        this.props.changeItem({id, library});
        this.changeErrorState("editName", "isEditNameError", "", false);
        this.changeErrorState("editAddress", "isEditAddressError", "", false);
        this.changeErrorState("editTelephone", "isEditTelephoneError", "", false);
    };

    render () {

        if(!this.props.isLoggedIn) {
            return <Redirect to='/authorization'/>
        }

        if(this.props.loading) {
            return <Spinner/>
        }

        const rows = this.props.libraries.map(({id, name, address, telephone})=>{
            return(
                <tr key={id}>
                    <td><input type="radio" name="object_id" value={id} onClick={() => {this.selectedRow(id, name, address, telephone)}}/></td>
                    <td>{name}</td>
                    <td>{address}</td>
                    <td>{telephone}</td>
                </tr>
            )
        });

        const {addName, addAddress, addTelephone} = this.props.addLibrary;
        const {editName, editAddress, editTelephone} = this.props.editLibrary;

        const styleAddName = this.state.isAddNameError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";
        const styleAddAddress = this.state.isAddAddressError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";
        const styleAddTelephone = this.state.isAddTelephoneError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";

        const addWindow = !this.props.isAddWindow ? null :
            <div id="add-library-block">
                <div className="card card-body mb-2">
                    <form onSubmit={this.addLibrary}>
                        <div className="libraries-form">
                            <input type="text" placeholder="Write name of new library here..." className={styleAddName} onChange={this.changeAddName} value={addName}/>
                            {this.state.isAddNameError ? <div className="red-text mb-2">{this.state.formError.addName}</div> : null}
                            <input type="text" placeholder="Write address of new library here..." className={styleAddAddress} onChange={this.changeAddAddress} value={addAddress}/>
                            {this.state.isAddAddressError ? <div className="red-text mb-2">{this.state.formError.addAddress}</div> : null}
                            <input type="text" placeholder="Write telephone of new library here..." className={styleAddTelephone} onChange={this.changeAddTelephone} value={addTelephone}/>
                            {this.state.isAddTelephoneError ? <div className="red-text mb-2">{this.state.formError.addTelephone}</div> : null}
                            <button type="submit" className="btn btn-info form-button mt-2">Add</button>
                        </div>
                    </form>
                </div>
            </div>;

        const styleEditName = this.state.isEditNameError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";
        const styleEditAddress = this.state.isEditAddressError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";
        const styleEditTelephone = this.state.isEditTelephoneError ? "form-control mb-2 form-label red-box" : "form-control mb-2 form-label";

        const editWindow = !this.props.isEditWindow ? null :
            <div id="edit-library-block">
                <div className="card card-body mb-2">
                    <form onSubmit={this.editLibrary}>
                        <div className="libraries-form">
                            <input type="text" placeholder="Write new name of library here..." className={styleEditName} onChange={this.changeEditName} value={editName}/>
                            {this.state.isEditNameError ? <div className="red-text mb-2">{this.state.formError.editName}</div> : null}
                            <input type="text" placeholder="Write new address of library here..." className={styleEditAddress} onChange={this.changeEditAddress} value={editAddress}/>
                            {this.state.isEditAddressError ? <div className="red-text mb-2">{this.state.formError.editAddress}</div> : null}
                            <input type="text" placeholder="Write new telephone of library here..." className={styleEditTelephone} onChange={this.changeEditTelephone} value={editTelephone}/>
                            {this.state.isEditTelephoneError ? <div className="red-text mb-2">{this.state.formError.editTelephone}</div> : null}
                            <button type="submit" className="btn btn-info form-button mt-2">Update</button>
                        </div>
                    </form>
                </div>
            </div>;

        return (
            <div>
                <Header/>

                <main role="main">

                    <div className="container libraries-page">
                        <h1>Libraries</h1>

                        <div className="libraries-tools">
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
                                <th>Name</th>
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

const mapStateToProps = ({librariesList, authorizationBlock}) => {
    return {
        isLoggedIn : authorizationBlock.isLoggedIn,
        libraries : librariesList.libraries,
        loading : librariesList.loading,
        isAddWindow : librariesList.isAddWindow,
        isEditWindow : librariesList.isEditWindow,
        addLibrary : librariesList.addLibrary,
        editLibrary : librariesList.editLibrary,
        selectedItem : librariesList.selectedItem
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRequest : () => {dispatch(librariesRequested())},
        onLoaded : (newLibraries) => {dispatch(librariesLoaded(newLibraries))},
        changeAddWindow : (value) => {dispatch(librariesShowAddWindow(value))},
        changeEditWindow : (value) => {dispatch(librariesShowEditWindow(value))},
        changeAddSurname : (value) => {dispatch(librariesUpdateAddSurnameField(value))},
        changeAddName : (value) => {dispatch(librariesUpdateAddNameField(value))},
        changeAddAddress : (value) => {dispatch(librariesUpdateAddAddressField(value))},
        changeAddTelephone : (value) => {dispatch(librariesUpdateAddTelephoneField(value))},
        changeEditName : (value) => {dispatch(librariesUpdateEditNameField(value))},
        changeEditAddress : (value) => {dispatch(librariesUpdateEditAddressField(value))},
        changeEditTelephone : (value) => {dispatch(librariesUpdateEditTelephoneField(value))},
        changeItem : (item) => {dispatch(librariesUpdateSelectedItem(item))}
    }
};

export default compose(
    withLibraryService(),
    connect(mapStateToProps, mapDispatchToProps)
    )(LibrariesPage);