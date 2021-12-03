import {getStorage, setStorage} from "../storage";
import {connectToNode} from "./connectToNode";
import {initNodes} from "../../redux/actions/nodes";
import {pingAllNodes} from "./pingNode";

export const initNode = async () => {
    const currentTime = new Date().getTime();
    const dayUnixTime = 86400 * 1000;

    let savedNodes = getStorage("nodes");

    let list = [];
    let activeNode = 0;

    if(!savedNodes){
        const { newList, fastestNodeId } = await pingAllNodes();

        list = newList;
        activeNode = fastestNodeId;
    } else if(currentTime - savedNodes.lastPing > dayUnixTime){
        const { newList } = await pingAllNodes(savedNodes.list);

        list = newList;
        activeNode = savedNodes.activeNode;
    } else {
        list = savedNodes.list;
        activeNode = savedNodes.activeNode;
    }

    const nodes = { list, activeNode, lastPing: currentTime };

    await connectToNode(list[activeNode]);

    setStorage("nodes", nodes);
    initNodes(nodes);
};