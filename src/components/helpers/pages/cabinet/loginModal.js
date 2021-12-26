import React from "react";
import {closeModal} from "../../../../redux/actions";
import {LoginDisplay} from "./loginDisplay";

export const LoginModal = () => <LoginDisplay onFinish={closeModal} />;