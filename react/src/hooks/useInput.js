import {useRef, useCallback} from "react";

function useRegularInput() {
    const input = useRef({});
    const onInput = useCallback(event => {
        const name = event.target.name;
        const value = event.target.value;
        if (value) input.current[name] = value;
        else delete input.current[name]; 
        //console.log(input.current);
    }, []);
    return [onInput, input];
}

function useFileInput(filePath) {
    const file = useRef();
    const onFile = useCallback(event => {
        const inputFile = event.target.files[0];
        inputFile.filePath = filePath;
        file.current = inputFile;
    }, [filePath]);
    return [onFile, file];
}

function useConfirmInput() {
    const confirm = useRef(false);
    const onConfirm = useCallback(() => {
        confirm.current = true
    }, []);
    return [onConfirm, confirm];
}

export {useRegularInput, useConfirmInput, useFileInput};
