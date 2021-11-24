import React from "react";
import {clsx} from "../../../utils";

export const Section = ({className, fullHeight, children}) => <section className={clsx(className, fullHeight && "full-height")}>{children}</section>