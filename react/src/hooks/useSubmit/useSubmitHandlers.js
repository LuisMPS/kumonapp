import {useEffect} from "react";

class SubmitHandler {
    constructor() {
        this.handlers = {onSuccess: new Handlers(), onError: new Handlers(), onWait: new Handlers()};
    }
    onSuccess() { 
        return this.handlers.onSuccess; 
    }
    onError() { 
        return this.handlers.onError; 
    }
    onWait() {
        return this.handlers.onWait;
    }
}

class Handlers {
    constructor() { 
        this.handlers = new Map();
    }
    register(...handlers) {
        handlers.forEach(handler => this.handlers.set(handler.id, handler.handler));
    }
    unregister(...handlers) {
        handlers.forEach(handler => this.handlers.delete(handler.id));
    }
    execute(...params) {
        [...this.handlers.values()].forEach(handler => handler(...params));
    }
    handler(id) {
        return this.handlers.get(id);
    }
}

function useSubmitHandlers(submitHandler, handlers) {
    useEffect(() => {
        const {onSuccess = [], onError = [], onWait = []} = handlers.current || {};
        submitHandler.onSuccess().register(...onSuccess);
        submitHandler.onError().register(...onError);
        submitHandler.onWait().register(...onWait);
        return () => {
            submitHandler.onSuccess().unregister(...onSuccess);
            submitHandler.onError().unregister(...onError);
            submitHandler.onWait().unregister(...onWait);
        }
    }, [submitHandler, handlers]);
}

export {useSubmitHandlers, SubmitHandler}