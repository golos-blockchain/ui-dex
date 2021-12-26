import React from "react";
import {EmptyLayout} from "../../../layout";
import {Card} from "../../global";
import {LoginDisplay} from "./loginDisplay";

export const LoginScreen = () => (
    <EmptyLayout>
        <Card p={4}>
            <LoginDisplay />
        </Card>
    </EmptyLayout>
);