import React, {Fragment} from "react";
import {Box, FlexBox, Heading, Subheading} from "../../global";
import {BrandTextBtn} from "../../btn";
import {translateStr} from "../../../../utils";
import {connect} from "react-redux";
import {connectNodes} from "../../../../redux/actions/nodes";
import {generateModal} from "../../../../redux/actions";
import {NodeTable} from "./nodeTable";
import {AddNodeModal} from "./nodeModals";

const Display = ({nodes}) => {
    const i18n = translateStr("settings");
    const list = nodes.list;

    const activeNode = [list[nodes.activeNode]];
    const activeIsUserNode = !activeNode[0].isDefaultNode;

    const nodesList = list.filter((el) => Number(el.id) !== Number(nodes.activeNode));
    const defaultNodesList = nodesList.filter(el => el.isDefaultNode);
    const userNodesList = nodesList.filter(el => !el.isDefaultNode);

    return(
        <Fragment>
            <FlexBox mt={1} justify="space-between" align="center">
                <Heading content={i18n("nodes")} />
                <BrandTextBtn content={i18n("addNode")} onClick={generateModal(<AddNodeModal />)} />
            </FlexBox>
            <Box className="custom-scroll" mt={.8}>
                <Subheading content={i18n("connected")} />
                <Box mt={1}>
                    <NodeTable
                        list={activeNode}
                        isUserNode={activeIsUserNode}
                        isActiveNode
                    />
                </Box>
            </Box>
            {!!defaultNodesList.length && (
                <Box className="custom-scroll" mt={1.7}>
                    <Subheading content={i18n("defaultNodesList")} />
                    <Box mt={1}>
                        <NodeTable list={defaultNodesList} />
                    </Box>
                </Box>
            )}
            {!!userNodesList.length && (
                <Box className="custom-scroll" mt={1.7}>
                    <Subheading content={i18n("userNodesList")} />
                    <Box mt={1}>
                        <NodeTable list={userNodesList} isUserNode />
                    </Box>
                </Box>
            )}
        </Fragment>
    )
};

export const Nodes = connect(connectNodes)(Display);