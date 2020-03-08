import React, { Component } from "react";
import { Typography } from "antd";
import { PageEnum } from "../../constants/PageEnum";
import { PageTemplate } from "../shared/PageTemplate"

const { Text } = Typography;

export class Concepts extends Component {
  render() {
    return <PageTemplate nextPage={PageEnum.BUDGET} title="Key Concepts">
        <Text>This is a placeholder.</Text>
    </PageTemplate>;
  }
}
