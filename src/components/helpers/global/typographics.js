import React from "react";
import Translate from 'react-translate-component';
import {clsx} from "../../../utils";

const Text = ({text, content = "global.text", additionalData = {}, className, color, defaultClassName, ...rest }) => {
    return <Translate className={clsx(defaultClassName, className, color && `clr--${color}`)} content={content} with={{...additionalData, text}} {...rest} />
};

const TextConstructor = (defaultClassName, component = "span") => ({...rest}) => (
    <Text defaultClassName={defaultClassName} component={component} {...rest} />
);

export const HeadingBold = TextConstructor("heading-bold", "h1");
export const Heading = TextConstructor("heading", "h2");

export const SubheadingBold = TextConstructor("subheading-bold");
export const Subheading = TextConstructor("subheading");

export const BodyBold = TextConstructor("body-bold");
export const Body = TextConstructor("body");

export const MetadataBold = TextConstructor("metadata-bold");
export const Metadata = TextConstructor("metadata");

export const Span = TextConstructor("", "span");