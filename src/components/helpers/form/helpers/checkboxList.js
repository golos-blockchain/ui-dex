import React from "react";
import {fieldHook} from "../hooks";
import {Box, Col, Row} from "../../global";
import {Checkbox} from "./checkbox";

export const CheckboxList = ({id, list, ...props}) => {
    let { name, value, disabled, onChange, fieldStateClass } = fieldHook(props);

    const handleChange = ({name: itemName}) => {
        if(!onChange) return;
        if(!value) value = [];

        if(value.includes(itemName)) {
            value = value.filter(symbol => symbol !== itemName);
        } else {
            value.push(itemName);
        }

        onChange({name, value});
    };

    return(
        <Row>
            {list.map(el => (
                <Col key={el.name} md={6}>
                    <Box mt={1}>
                        <Checkbox
                            name={el.name}
                            content={el.content}
                            text={el.text}
                            value={value.includes(el.name)}
                            onChange={handleChange}
                            className={fieldStateClass === "error" && "error"}
                            disabled={disabled}
                        />
                    </Box>
                </Col>
            ))}
        </Row>
    );
};