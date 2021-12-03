import React, {Fragment} from "react";
import {connectToNode, checkNodePing, translateStr} from "../../../../utils";
import {initNodes, updateNodesList} from "../../../../redux/actions/nodes";
import {closeModal} from "../../../../redux/actions";
import {Body, Box, Heading} from "../../global";
import {Form, Input} from "../../form/helpers";
import {nodeSchema} from "../../form/validation";
import {RequestError} from "../../form/helpers/requestError";
import {BrandTextBtn, RedTextBtn} from "../../btn";
import {getNodes, saveNodes} from "../../../../utils/nodes";

const NodeForm = ({defaultData, request, btnContent}) => {
    const handleResult = (newList) => {
        const nodes = getNodes();

        nodes.list = newList;

        saveNodes(nodes);
        updateNodesList(newList);
        closeModal();
    };

    return(
        <Form
            defaultData={defaultData}
            schema={nodeSchema}
            request={request}
            handleResult={handleResult}
        >{formData => (
            <Fragment>
                <Input name="title" label="nodeTitle" formData={formData} />
                <Input name="url" label="nodeUrl" formData={formData} />
                <RequestError formData={formData} />
                <BrandTextBtn type="submit" content={btnContent} />
            </Fragment>
        )}</Form>
    )
};

export const EditNodeModal = ({defaultData}) => {
    const i18n = translateStr("settings");

    const req = async ({id, title, url}) => {
        const ping = await checkNodePing({title, url});
        const nodes = getNodes();
        const isActiveUrl = Number(nodes.activeNode) === Number(id);

        if(isActiveUrl && url !== defaultData.url){
            await connectToNode({title, url});
        }

        nodes.list[id] = { id, title, url, ping };

        return nodes.list;
    };

    return(
        <Fragment>
            <Heading content={i18n("editNode")} />
            <Box mt={2}>
                <NodeForm
                    defaultData={defaultData}
                    request={req}
                    btnContent={i18n("editNode")}
                />
            </Box>
        </Fragment>
    )
};

export const AddNodeModal = () => {
    const i18n = translateStr("settings");

    const req = async ({title, url}) => {
        const ping = await checkNodePing({title, url});
        const oldList = getNodes().list;

        const newItem = { id: oldList.length, title, url, ping };

        return [ ...oldList, newItem ];
    };

    return(
        <Fragment>
            <Heading content={i18n("addNode")} />
            <Box mt={2}>
                <NodeForm
                    request={req}
                    btnContent={i18n("addNode")}
                />
            </Box>
        </Fragment>
    )
};

export const DeleteNodeModal = ({id, url}) => {
    const i18n = translateStr("settings");

    const onClick = async () => {
        const nodes = getNodes();
        const list = nodes.list;

        if(Number(nodes.activeNode) === Number(id)){
            nodes.activeNode = 0;
            await connectToNode(list[0])
        }

        nodes.list = list.filter(el => el.id !== id);

        saveNodes(nodes);
        initNodes(nodes);
        closeModal();
    };

    return(
        <Fragment>
            <Heading content={i18n("deleteNode")} />
            <Box mt={1.5}>
                <Body content={i18n("deleteNodeDesc")} additionalData={{url}} />
            </Box>
            <Box mt={2}>
                <RedTextBtn content={i18n("deleteNode")} onClick={onClick} />
            </Box>
        </Fragment>
    )
}