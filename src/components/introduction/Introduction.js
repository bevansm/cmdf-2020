import React, { Component } from "react";
import {Typography } from "antd";
import { PageEnum } from "../../constants/PageEnum";
import { PageTemplate } from "../shared/PageTemplate"
import {UserContext} from "../../constants/Context";

const { Title, Text } = Typography;

export class Introduction extends Component {
    static contextType = UserContext;

    render() {
    return <PageTemplate nextPage={PageEnum.CONCEPTS} title="Introduction">
        <Title level={2}>{`Welcome, ${this.context}!`}</Title>
        
        <Text>You will be helping Mia the cat to run her doughnut shop using your financial skills! First, you will help her budget her weekly spendings. Then you will help her operate the shop each day, reviewing how much you have spent and earned. In the end, you can compare how the actuals match up with your budget.</Text>
    </PageTemplate>;
  }
}
