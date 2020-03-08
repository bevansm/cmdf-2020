import React, { Component } from "react";
import {Typography } from "antd";
import { PageEnum } from "../../constants/PageEnum";
import { PageTemplate } from "../shared/PageTemplate"

const { Title } = Typography;
const { Text } = Typography;

export class Introduction extends Component {
  render() {
    return <PageTemplate nextPage={PageEnum.CONCEPTS} title="Introduction">
        <Title level={2}>Introduction</Title>
        
        <Text>This is a placeholder.</Text>
    </PageTemplate>;
  }
}
