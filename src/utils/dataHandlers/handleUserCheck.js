import {ApiRequest} from "../requests";

export const isUserExist = async (user) => {
    const userIsExist = await new ApiRequest().checkUserExistence(user);

    if(!userIsExist){
        const err = new Error();

        err.field = "to";
        err.message = "userNotExist";

        throw err;
    }
};