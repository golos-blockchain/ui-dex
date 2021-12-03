import golos from "golos-lib-js";
import {ApiRequest} from "../requests";

export const connectToNode = async node => {
    golos.config.set('websocket', node.url);
    await new ApiRequest().getConfig();
};