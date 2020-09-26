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

function useFileInput() {
    const file = useRef();
    const onFile = useCallback(event => {
        if (!event.target.files[0]) return;
        const inputFile = event.target.files[0];
        file.current = inputFile;
    }, []);
    return [onFile, file];
}

function useConfirmInput() {
    const confirm = useRef(false);
    const onConfirm = useCallback(() => {
        confirm.current = true
    }, []);
    return [onConfirm, confirm];
}

function useDummyInput() {
    const dummy = useRef(true);
    const onDummy = useCallback(() => null, []);
    return [onDummy, dummy];
}

export {useRegularInput, useConfirmInput, useFileInput, useDummyInput};
