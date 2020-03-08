import React, { Component } from "react";
import {Typography} from "antd";

const { Text } = Typography;

export class BudgetPopoverContent extends Component {
    render() {
        return <Text>Budget is an estimation of the money you earn and plan for spending over a certain period of time. It allows you and Mia to determine if you will have enough money for the items you need.</Text>;
    }
}
