import React, { Component } from "react";
import {Typography} from "antd";

const { Text } = Typography;

export class CostPopoverContent extends Component {
    render() {
        return <Text style={{marginBlock: 16}}>There are fixed costs and variable costs. Fixed cost is an expense that does not change over time (e.g. rent) while variable costs change over time (e.g. the supplies we buy)</Text>;
    }
}
