const getFieldState = ({value, error, comment, globalError, disabled}) => {
    let fieldStateClass = "";
    let message = "";
    let messageParams = {};

    if(error){
        fieldStateClass = "error";
        message = `errors.${error.type}`;
        messageParams = error.params;
    } else if(globalError) {
        fieldStateClass = "error";
    } else if(value) {
        fieldStateClass = "success";
    }

    if(disabled && value){
        message = "";
    }

    return { fieldStateClass, message, messageParams };
};

export const fieldHook = ({formData, ...props}) => {
    if(!formData) return {...props, ...getFieldState(props)};

    const {name, disabled: initialDisabled} = props;
    const {data, errors, isLoading} = formData.state;

    const disabled = formData.props.disableForm || initialDisabled || isLoading;

    const value = data[name] || data[name] === 0 ? data[name] : "";
    const error = errors && errors[name];
    const globalError = errors && errors.request;
    const onChange = formData.onChange;

    let {fieldStateClass, message, messageParams} = getFieldState({disabled, value, error, globalError});

    return {...props, value, error, disabled, onChange, isLoading, fieldStateClass, message, messageParams};
};