import React, { Component } from "react";
import {Typography} from "antd";

const { Text } = Typography;

export class BudgetPopoverContent extends Component {
    render() {
        return <Text style={{marginBlock: 16}}>
            A budget is how much you expect to spend in the next while.
            Consider how much you know you can earn and how much you would like to set aside!
            It allows you and Mia to determine if you will have enough money for the items you need.</Text>;
    }
}
