import React from 'react'; 
import { useDropzone } from 'react-dropzone';

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
        <div>
            <div
                className="file-dropzone-container"
                {...getRootProps({ isFocused, isDragAccept, isDragReject })}
                isdragaccept={isDragAccept.toString()}
                isdragreject={isDragReject.toString()}
                isfocused={isFocused.toString()}
            >
                <input {...getInputProps()} /> 
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>(Only *.csv files will be accepted)</em>
            </div>
            <aside>
            <h4>Accepted files</h4>
            <ul>{acceptedFileItems}</ul>
            <h4>Rejected files</h4>
            <ul>{fileRejectionItems}</ul>
            </aside>
        </div>
    )
}

export default FileDropzone; 