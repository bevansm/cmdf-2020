import React, { Component } from "react";
import {Typography } from "antd";
import { PageTemplate } from "../shared/PageTemplate"

const { Text } = Typography;

export class Animation extends Component {
  render() {
    return <PageTemplate>
        <img src="bird1.gif" alt="bird1" width="800px" height ="500px" class="center"></img>
    </PageTemplate>;
  }
}

