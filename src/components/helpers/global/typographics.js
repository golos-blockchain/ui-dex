import React from "react";
import Translate from 'react-translate-component';
import {clsx} from "../../../utils";

const Text = ({text, content = "global.text", additionalData = {}, className, color, defaultClassName, ...rest }) => {
    return <Translate className={clsx(defaultClassName, className, color && `clr--${color}`)} content={content} with={{...additionalData, text}} {...rest} />
};

const TextConstructor = (defaultClassName, component = "span") => ({...rest}) => (
    <Text defaultClassName={defaultClassName} component={component} {...rest} />
);

export const H1 = TextConstructor("h1", "h1");
export const H2 = TextConstructor("h2", "h2");

export const SubheadingBold = TextConstructor("subheading-bold");
export const Subheading = TextConstructor("subheading");

export const BodyBold = TextConstructor("body-bold");
export const Body = TextConstructor("body");

export const MetadataBold = TextConstructor("metadata-bold");
export const Metadata = TextConstructor("metadata");