import React, { Component } from "react";
import {Divider, Typography} from "antd";
import { PageEnum } from "../../constants/PageEnum";
import { PageTemplate } from "../shared/PageTemplate"
import {StatusDisplay} from "../StatusDisplay/StatusDisplay";

const { Text } = Typography;

export class Endgame extends Component {
    render() {
        return <PageTemplate nextPage={PageEnum.LOGIN} title="Game Over">
            <Text>You have overspent! Your account information has been wiped, but you can see your statistics below. Create a new account to play again!</Text>
            <Divider/>
            <StatusDisplay/>
        </PageTemplate>;
    }
}
