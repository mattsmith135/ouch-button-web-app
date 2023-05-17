import { Component } from "react";
import FileDropzone from "./FileDropzone";
import Pagination from "./Pagination";

class Upload extends Component {
    constructor(props) {
        super(props); 
    }

    render() {
        return (
            <div className="upload">
                <div className="upload-wrapper">
                    <div className="upload-header">
                        <h1 className="upload-header__heading">Upload your ouch button files</h1>
                        <p classname="upload-header__text">
                            If you have files from an ouch button that you would like in the portal, you can upload them here.
                            Once the file upload is complete, you will be directed to a page displaying the data. 
                            Not sure what we're talking about? For assistance <a href="">click here</a>.
                        </p>
                    </div>
                    <div className="upload-content">
                        <FileDropzone />    
                    </div> 
                    <Pagination />
                </div>
            </div>
        )
    }
}

export default Upload; 