import {Component} from "react";
import React from "react";
import {clsx} from "../../../../utils";

export class Form extends Component {
    state = {
        data: this.props.defaultData || {},
        errors: this.props.defaultErrors || {},
        isLoading: false
    };

    focusOn = (fieldName) => {
        const field = document.getElementsByName(fieldName)[0];
        if(field) {
            field.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            field.focus();
        }
    };

    checkErrors = (name, data) => {
        const schema = this.props.schema;

        if(!schema) return {};

        let newError = "";
        let path = name;

        try {
            schema.validateSyncAt(name, data);
        } catch(err){
            const {path: customPath, type, message, params} = err;

            path = customPath || name;
            newError = {type: type || message, params};
        }

        return newError ? {[path]: newError} : {};
    };

    saveErrors = (name, error) => this.setState({errors: {[name]: error}});

    handleRequestError = (err) => {
        if(typeof err === "object"){
            this.saveErrors(err.field || "request", {type: err.message});
            return;
        }

        if(typeof err === "string"){
            if(err.includes("{")){
                const {field, msg: type, params} = JSON.parse(err);
                this.saveErrors(field, {type, params});

                return;
            } else {
                this.saveErrors("request", {type: err});
                return;
            }
        }

        console.error("Error!", err);

        if(!err) return;
    };

    onChange = (e) => {
        const obj = e.target ? e.target : e;

        const {name, value} = obj;

        let data = {...this.state.data, [name]: value};
        const modificators = this.props.modificators;

        if(modificators && modificators[name]) data = modificators[name](data, this);

        const errors = value ? this.checkErrors(name, data) : {};

        this.setState({data, errors});
    };

    submit = async (e) => {
        e.preventDefault();

        const schema = this.props.schema;

        if(Object.values(this.state.errors).length) {
            console.log("-----there is still errors!", this.state.errors);
            return;
        }

        if(schema){
            try{
                await schema.validate(this.state.data, {strict: true});
            } catch(err){
                console.log("-----validation errors!", err);
                this.saveErrors(err.path, {type: err.type || err.message, params: err.params});
                return;
            }
        }

        this.request();
    };

    request = () => {
        const data = this.state.data;
        const request = this.props.request;

        if(!request) return this.handleResult(data);

        this.setState({isLoading: true});

        request(data)
            .then(this.handleResult)
            .catch(this.handleRequestError)
            .finally(() => this.setState({isLoading: false}));
    };

    handleResult = (data) => {
        // console.log(data)

        const {defaultData, clearOnFinish, handleResult} = this.props;

        // if(popUp) initPopUp({status: "success", content: popUp});
        if(clearOnFinish) this.setState({data: defaultData || {}});
        if(!handleResult) return;

        handleResult(data, this);
    };


    render(){
        return(
            <form onSubmit={this.submit} className={clsx("form", this.props.className)}>
                {this.props.children(this)}
            </form>
        )
    }
}