import React from "react";
import {translateStr, useClassSetter} from "../../../../utils";
import {Card, FlexBox, Heading, MetadataBold} from "../../global";
import {TransparentTextBtn} from "../../btn";
import {ArrowRightIcon} from "../../../../svg";

export const DashboardCard = ({title, additionalData, link, linkContent, children}) => {
    const i18n = translateStr("dashboard");
    const [baseClass, setClass] = useClassSetter("dashboard-card");

    return(
        <Card className={baseClass}>
            <FlexBox className={setClass("title-wrapper")} justify="space-between">
                <Heading
                    content={i18n(title)}
                    additionalData={additionalData}
                    className={setClass("title")}
                />
                {link && linkContent && (
                    <TransparentTextBtn
                        to={link}
                        content={i18n(linkContent)}
                        textComponent={MetadataBold}
                        iconRight={ArrowRightIcon}
                    />
                )}
            </FlexBox>
            <div className={setClass("content-wrapper")}>
                {children}
            </div>
        </Card>
    )
};