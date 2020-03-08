import React, { Component } from "react";
import {Typography } from "antd";
import { PageEnum } from "../../constants/PageEnum";
import { PageTemplate } from "../shared/PageTemplate"

const { Text } = Typography;

export class Endgame extends Component {
    render() {
        return <PageTemplate nextPage={PageEnum.LOGIN} title="Game Over">
            <Text>You have overspent! Your account information has been wiped, but you can see your statistics below. Create a new account to play again!</Text>
        </PageTemplate>;
    }
}
