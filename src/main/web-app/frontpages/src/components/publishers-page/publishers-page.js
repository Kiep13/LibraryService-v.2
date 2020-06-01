import React, {Component} from "react";
import "./publisher-page.css";
import Header from "../header";
import {compose} from "../../utils";
import {connect} from "react-redux";
import withLibraryService from "../../hoc";
import Spinner from '../spinner';
import {
    publishersRequested,
    publishersLoaded,
    publishersShowAddWindow,
    publishersShowEditWindow,
    publishersUpdateAddField,
    publishersUpdateEditField,
    publishersUpdateSelectedItem
} from "../../actions/publishers-actions";
import {Redirect} from "react-router-dom";

class PublishersPage extends Component {

    // necessary for error handling and pointless, in my opinion, for rendering to the global state
    state = {
        formError : {
            addPublisher : "",
            editPublisher : "",
        },
        isAddPublisherError : false,
        isEditPublisherError : false
    };

    //error message
    errorPublisherMessage = "The length of the publisher's name must be at least 3";

    componentDidMount() {
        this.props.onRequest();
        this.getAllPublishers();
    }

    getAllPublishers = async () => {
        const publishers = await this.props.libraryService.getAllPublishers();
        this.props.onLoaded(publishers);
    };

    validatePublisher= (publisher, messageField, isErrorField, errorMess) => {
        const isError = publisher.length < 3;
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

    changeAddPublisher = event => {
        event.preventDefault();
        this.validatePublisher(event.target.value, "addPublisher", "isAddPublisherError", this.errorPublisherMessage);
        this.props.changeAddField(event.target.value);
    };

    changeEditPublisher = event => {
        event.preventDefault();
        this.validatePublisher(event.target.value, "editPublisher", "isEditPublisherError", this.errorPublisherMessage);
        this.props.changeEditField(event.target.value);
    };

    onAddButtonClick = async event => {
        event.preventDefault();
        if(!this.props.isEditWindow) {
            const value = this.props.isAddWindow;
            if(value) {
                this.changeErrorState("addPublisher", "isAddPublisherError", "", false);
                this.props.changeAddField("");
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

        if(this.props.selectedItem != null) {
            await this.props.libraryService.deletePublisher(this.props.selectedItem);
            this.props.onRequest();
            this.getAllPublishers();
        } else {
            alert("You did not choose genre!");
        }
    };

    addPublisher = async event => {
        event.preventDefault();

        await this.validatePublisher(this.props.addPublisher, "addPublisher", "isAddPublisherError", this.errorPublisherMessage);
        if(!this.state.isAddPublisherError) {
            const publisher = {
                publisher : this.props.addPublisher
            };

            await this.props.libraryService.addPublisher(publisher);
            this.props.onRequest();
            this.getAllPublishers();
        }
    };

    editPublisher = async event => {
        event.preventDefault();

        await this.validatePublisher(event.target.value, "editPublisher", "isEditPublisherError", this.errorPublisherMessage);
        if(!this.state.isEditPublisherError) {
            if(this.props.selectedItem != null) {
                const publisher = {
                    id : this.props.selectedItem,
                    publisher : this.props.editPublisher
                };

                await this.props.libraryService.editPublisher(publisher);
                this.props.onRequest();
                this.getAllPublishers();
            } else {
                alert("You did not choose genre!");
            }
        }
    };

    selectedRow = (id, text) => {
        this.props.changeItem({id, text});
        this.changeErrorState("editPublisher", "isEditPublisherError", "", false);
    };

    render() {

        if(!this.props.isLoggedIn) {
            return <Redirect to='/authorization'/>
        }

        if(this.props.loading) {
            return <Spinner/>;
        }

        const rows = this.props.publishers.map(({id, publisher}) => {
            return (
                <tr key={id}>
                    <td><input type="radio" name="object_id" value={id} onClick={() => {this.selectedRow(id, publisher)}}/></td>
                    <td>{publisher}</td>
                </tr>
            )
        });

        const styleAddBlock = this.state.isAddPublisherError ? "form-control d-inline-block form-label red-box" : "form-control d-inline-block form-label";
        const addWindow = !this.props.isAddWindow ? null :
            <div id="add-publisher-block">
                <div className="card card-body mb-2">
                    <form onSubmit={this.addPublisher}>
                        <div className="publishers-form  d-flex">
                            <input type="text" placeholder="Write new publisher here..." className={styleAddBlock} onChange={this.changeAddPublisher} value={this.props.addPublisher}/>
                            <button type="submit" className="btn btn-info auth-button  form-button mt-0 ml-2">Add</button>
                        </div>
                        {this.state.isAddPublisherError ? <div className="red-text">{this.state.formError.addPublisher}</div> : null}
                    </form>
                </div>
            </div>;

        const styleEditBlock = this.state.isEditPublisherError ? "form-control d-inline-block form-label red-box" : "form-control d-inline-block form-label";
        const editWindow = !this.props.isEditWindow ? null :
            <div id="edit-publisher-block">
                <div className="card card-body">
                    <form onSubmit={this.editPublisher}>
                        <div className="publishers-form  d-flex">
                            <input type="text" placeholder="Write new genre here..." className={styleEditBlock} onChange={this.changeEditPublisher} value={this.props.editPublisher}/>
                            <button type="submit" className="btn btn-info auth-button  form-button mt-0 ml-2">Update</button>
                        </div>
                        {this.state.isEditPublisherError ? <div className="red-text">{this.state.formError.editPublisher}</div> : null}
                    </form>
                </div>
            </div>;

        return (
            <div>
                <Header/>

                <main role="main">

                    <div className="container publishers-page">
                        <h1>Publishers</h1>

                        <div className="publishers-tools">
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

                        <table className="table">
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
        );
    }

}

const mapStateToProps = ({publishersList, authorizationBlock}) => {
    return {
        isLoggedIn : authorizationBlock.isLoggedIn,
        publishers : publishersList.publishers,
        loading : publishersList.loading,
        isAddWindow : publishersList.isAddWindow,
        isEditWindow : publishersList.isEditWindow,
        addPublisher : publishersList.addPublisher,
        editPublisher : publishersList.editPublisher,
        selectedItem : publishersList.selectedItem
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRequest : () => {dispatch(publishersRequested())},
        onLoaded : (newPublishers) => {dispatch(publishersLoaded(newPublishers))},
        changeAddWindow : (value) => {dispatch(publishersShowAddWindow(value))},
        changeEditWindow : (value) => {dispatch(publishersShowEditWindow(value))},
        changeAddField : (value) => {dispatch(publishersUpdateAddField(value))},
        changeEditField : (value) => {dispatch(publishersUpdateEditField(value))},
        changeItem : (item) => {dispatch(publishersUpdateSelectedItem(item))}
    }
};

export default compose(
        withLibraryService(),
        connect(mapStateToProps, mapDispatchToProps)
    )(PublishersPage);
