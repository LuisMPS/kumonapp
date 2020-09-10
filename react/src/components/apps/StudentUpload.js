import React, {useState} from "react";
import UploadForm from "../forms/UploadForm";
import Placeholder from "./StudentUploadPhoto.jpg";

function StudentUpload(props) {
    const {filePath, fileStartSource, ...rest} = props;
    const {render} = rest;
    const [source, setSource] = useState({src: fileStartSource, timestamp: Date.now()});
    return (<>
        {render && render(source)}
        <UploadForm filePath = {filePath} 
        onSuccess = {[
            {id: "source-changer", handler: source => setSource({src: source, timestamp: Date.now()})}
        ]}/>
    </>);
}


function StudentUploadPhoto({fileStartSource}) {
    const placeholderPath = Placeholder;
    const path = "https://kumonadmin-app.s3.us-east-2.amazonaws.com";
    const onPhotoError = event => event.target.src = placeholderPath; 
    return <StudentUpload filePath = "photo" fileStartSource = {fileStartSource}
    render = {photoSource => {
        return <img src = {photoSource.src ? `${path}/${photoSource.src}?timestamp=${photoSource.timestamp}`: placeholderPath} 
        alt = "alumno" onError = {onPhotoError} />
    }}/>
}

function StudentUploadReport({fileStartSource, reportPath}) {
    const path = "https://kumonadmin-app.s3.us-east-2.amazonaws.com";
    const filePath = `report/${reportPath}`;
    return <StudentUpload filePath = {filePath} fileStartSource = {fileStartSource}
    render = {reportSource => {
        return reportSource.src 
        ? <a href = {`${path}/${reportSource.src}`} download = "boleta">Descargado: {new Date().toISOString()}</a>
        : <p>No has subido ninguna boleta aún...</p>
    }} 
    />
}

export default StudentUpload;
export {StudentUploadPhoto, StudentUploadReport};