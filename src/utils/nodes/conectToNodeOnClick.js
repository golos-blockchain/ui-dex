import {getStorage, setStorage} from "../storage";
import {connectToNode} from "./connectToNode";
import {fetchUserData} from "../dataHandlers";
import {getUserData, setUserData, updateUserData} from "../../redux/actions/userData";
import {setActiveNode} from "../../redux/actions/nodes";

export const connectToNodeOnClick = id => async () => {
    const savedNodes = getStorage("nodes");
    savedNodes.activeNode = id;

    try{
        await connectToNode(savedNodes.list[id]);

        const userData = getUserData("user");

        if(userData){
            await fetchUserData(userData.name).then(updateUserData).then(setUserData)
        }
    } catch(err){}

    setStorage("nodes", savedNodes);
    setActiveNode(id);
};