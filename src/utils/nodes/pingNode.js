import {connectToNode} from "./connectToNode";
import {getNodes} from "./nodesStorageHandlers";

export const pingNode = async (node) => {
    const start = new Date().getTime();

    try{
        await connectToNode(node);
    } catch(err) {
        return 0;
    }

    return new Date().getTime() - start;
};

export const pingAllNodes = async (list) => {
    const defaultNodesList = JSON.parse(process.env.REACT_APP_NODES);
    const defaultNodesUrls = defaultNodesList.map(el => el.url);

    if(!list) list = defaultNodesList;

    const newList = [];

    let fastestNodePing = 0;
    let fastestNodeId = 0;

    for(let id in list){
        const node = list[id];
        const ping = await pingNode(node);
        const isDefaultNode = defaultNodesUrls.includes(node.url);

        if(!fastestNodePing || fastestNodePing > ping){
            fastestNodePing = ping;
            fastestNodeId = id;
        }

        newList[id] = { ...node, id, ping, isDefaultNode };
    }

    return { newList, fastestNodeId };
};


//func for node forms (checks before saving new node or changes)
export const checkNodePing = async (node) => {
    let ping = 0;

    try{
        ping = await pingNode(node);
    } catch(err){}

    if(!ping) throw new Error("nodeNotRespond");

    const savedNodes = getNodes();
    await connectToNode(savedNodes.list[savedNodes.activeNode]);

    return ping;
};