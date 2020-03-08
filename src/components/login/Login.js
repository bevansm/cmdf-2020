import React, { Component } from "react";
import {Typography } from "antd";
import { PageEnum } from "../../constants/PageEnum";
import { PageTemplate } from "../shared/PageTemplate"

const { Text } = Typography;

export class Login extends Component {
    render() {
        return <PageTemplate nextPage={PageEnum.INTRO} title="Register">
            <Text>This is a placeholder.</Text>
        </PageTemplate>;
    }
}
