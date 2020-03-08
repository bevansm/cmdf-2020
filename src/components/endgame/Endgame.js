import React, { Component } from "react";
import {Typography } from "antd";
import { PageEnum } from "../../constants/PageEnum";
import { PageTemplate } from "../shared/PageTemplate"

const { Text } = Typography;

export class Endgame extends Component {
    render() {
        console.log(this.context);
        return <PageTemplate nextPage={PageEnum.LOGIN} title="Game Over">
            <Text>You have overspent!</Text>
        </PageTemplate>;
    }
}
