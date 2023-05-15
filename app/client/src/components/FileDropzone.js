import React from 'react'; 
import { useDropzone } from 'react-dropzone';
import {ReactComponent as UploadIcon} from '../assets/upload-icon.svg'; 

function FileDropzone(props) {
    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept, 
        isDragReject
    } = useDropzone({
        accept: {
            'text/csv':['.csv'],
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

    return (
        <div className="file-dropzone-wrapper">
            <div
                className="file-dropzone"
                {...getRootProps({ isFocused, isDragAccept, isDragReject })}
                isdragaccept={isDragAccept.toString()}
                isdragreject={isDragReject.toString()}
                isfocused={isFocused.toString()}
            >
                <input {...getInputProps()} /> 
                <UploadIcon className="file-dropzone__icon" /> 
                <p className="file-dropzone__text">Drag 'n' drop some files here, or click to select files</p>
                <em>(Only *.csv files will be accepted)</em>
            </div>
            <aside className="uploaded-files">
                <h4 className="uploaded-files__heading">Accepted files</h4>
                <ul className="uploaded-files__list">{acceptedFileItems}</ul>
                <h4 className="uploaded-files__heading">Rejected files</h4>
                <ul className="uploaded-files__list">{fileRejectionItems}</ul>
            </aside>
        </div>
    )
}

export default FileDropzone; 