import React from 'react';
import {LibraryServiceConsumer} from "../library-service-context/";

const withLibraryService = () => (Wrapped) => {

    return (props) =>{
        return (
            <LibraryServiceConsumer>
                {
                    (libraryService) => {
                        return(<Wrapped {...props} libraryService={libraryService}/>)
                    }
                }
            </LibraryServiceConsumer>
        )
    }
};

export default withLibraryService;

