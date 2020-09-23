import React, {useState} from "react";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import UploadForm from "../forms/UploadForm";
import Placeholder from "./StudentUploadPhoto.jpg";
import {StyledButton} from "../styled/StyledButton";
import SnackbarCard from "../cards/SnackbarCard";
import Image from "../styled/Image";
import {Link, makeStyles} from "@material-ui/core";
import ProgressCard from "../cards/ProgressCard";

const useFormStyle = makeStyles({
    upload_form: {margin: "1rem 0rem"}
});

function StudentUpload(props) {
    const classes = useFormStyle();
    const {filePath, fileStartSource, ...rest} = props;
    const {render} = rest;
    const [source, setSource] = useState({src: fileStartSource, timestamp: Date.now()});
    return <>
        {render && render(source)}
        <UploadForm className = {classes.upload_form} submitProps = {[filePath]} 
        onSuccess = {[{id: "source-changer", handler: source => setSource({src: source, timestamp: Date.now()})}]}
        renders = {{
            renderButton: () => <StyledButton startIcon = {<CloudUploadIcon />} type = "submit">Subir</StyledButton>,
            renderSuccess: () => <SnackbarCard autoHideDuration = {3000} type = "success">Actualizado correctamente!</SnackbarCard>,
            renderError: () => <SnackbarCard autoHideDuration = {2500} type = "error">Error al subir!</SnackbarCard>,
            renderWait: progress => <ProgressCard color = "primary"
                value = {progress && progress.loaded && progress.total ? progress.loaded / progress.total * 100 : 0} />
        }}
        />
    </>;
}


function StudentUploadPhoto({fileStartSource}) {
    const placeholderPath = Placeholder;
    const path = "https://kumonadmin-app.s3.us-east-2.amazonaws.com";
    const onPhotoError = event => event.target.src = placeholderPath; 
    return <StudentUpload filePath = "photo" fileStartSource = {fileStartSource}
    render = {photoSource => {
        return <Image src = {photoSource.src ? `${path}/${photoSource.src}?timestamp=${photoSource.timestamp}`: placeholderPath} 
        alt = "alumno" onError = {onPhotoError} imageStyle = {{width: "50%"}}/>
    }}/>
}

function StudentUploadReport({fileStartSource, reportPath}) {
    const path = "https://kumonadmin-app.s3.us-east-2.amazonaws.com";
    const filePath = `report/${reportPath}`;
    return <StudentUpload filePath = {filePath} fileStartSource = {fileStartSource}
    render = {reportSource => {
        return reportSource.src 
        ? <Link href = {`${path}/${reportSource.src}`} download = "boleta">
            Descargado: {new Date().toLocaleString()}
        </Link>
        : <p>No has subido ninguna boleta aún...</p>
    }} 
    />
}

export default StudentUpload;
export {StudentUploadPhoto, StudentUploadReport};