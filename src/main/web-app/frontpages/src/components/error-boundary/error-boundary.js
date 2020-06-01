import React, {Component} from "react";
import ErrorIndicator from "../error-indicator";
import {connect} from "react-redux";
import {errorFetch} from "../../actions/error-actions";

class ErrorBoundary extends Component {

    componentDidCatch(error, errorInfo) {
        this.props.fetchError(error);
    }

    render() {

        if(this.props.error) {
            return <ErrorIndicator/>;
        }
        return this.props.children;
    }

}

const mapStateToProps = ({error}) => {
    return {
        error : error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchError : (error) => {dispatch(errorFetch(error))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);