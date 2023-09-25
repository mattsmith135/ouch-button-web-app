import React, { useState } from 'react'; 
import { useDropzone } from 'react-dropzone';
import { ReactComponent as UploadIcon } from '../assets/upload-icon.svg'; 
import SearchableDropdown from './SearchableDropdown';
import axios from 'axios'; 

function FileDropzone() {
    const [file, setFile] = useState(null); 

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps,
    } = useDropzone({
        accept: {
            'text/plain':['.txt'],
            // 'text/csv':['.csv'],
        },
        onDrop: (acceptedFiles) => {
            // Store the first accepted file in the 'file' state variable
            if (acceptedFiles.length > 0) {
                setFile(acceptedFiles[0]);
            }
        }
    }); 

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => {
                    <li key={e.code}>{e.message}</li>
                })}
            </ul>
        </li>
    ));

    const handleFileUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append("filename", file.path); 
            formData.append("file", file); 
            const url = "http://localhost:5000/api/upload";

            try {
                await axios.post(url, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }); 
                console.log("File uploaded successfully"); 
            } catch (error) {
                console.error("Error uploading file:", error); 
            }
        } else {
            console.error("No file to upload"); 
        }
    }

    return (
        <div className="file-dropzone-wrapper">
            <div
                className="file-dropzone"
                {...getRootProps()}
            >
                <input {...getInputProps()} /> 
                <UploadIcon className="file-dropzone__icon" />
                <p className="file-dropzone__text">
                    Drag 'n' drop some files here, or click to select files
                </p>
                <em>(Only *.csv files will be accepted)</em>
                
            </div>
            <aside className="uploaded-files">
                <h4 className="uploaded-files__heading">Accepted files</h4>
                <ul className="uploaded-files__list">{acceptedFileItems}</ul>
                <h4 className="uploaded-files__heading">Rejected files</h4>
                <ul className="uploaded-files__list">{fileRejectionItems}</ul>
            </aside>
            <div>
                <label>Which client is this ouch button file for?</label>
                <SearchableDropdown />
            </div>
            <button onClick={handleFileUpload}>Upload File</button> 
        </div>
    )
}

export default FileDropzone; 