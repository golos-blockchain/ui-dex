import React from "react";
import {Input} from "./input";

export const NumberInput = ({min, max, step, ...props}) => <Input {...props} type="number" inputMode="decimal" inputParams={{min, max, step}} />;