import {getStorage} from "../../../../../utils";

export const oldPasswordValidation = {
    message: "passwordIsWrong",
    test: function(val){
        if(!val) return true;
        console.log(val);

        return getStorage("user").priv === val;
    }
};