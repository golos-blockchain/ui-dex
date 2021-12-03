import {getStorage, setStorage} from "../storage";
import {connectToNode} from "./connectToNode";
import {handleUserAuth} from "../dataHandlers";
import {setUserData} from "../../redux/actions/userData";
import {setActiveNode} from "../../redux/actions/nodes";

export const connectToNodeOnClick = id => async () => {
    const savedNodes = getStorage("nodes");
    savedNodes.activeNode = id;

    try{
        await connectToNode(savedNodes.list[id]);

        const user = getStorage("user");
        if(user) await handleUserAuth(user).then(setUserData);
    } catch(err){}

    setStorage("nodes", savedNodes);
    setActiveNode(id);
};