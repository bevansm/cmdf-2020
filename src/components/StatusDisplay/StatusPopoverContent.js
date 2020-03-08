import React, { Component } from "react";
import {Typography} from "antd";

const { Text } = Typography;

export class StatusPopoverContent extends Component {
    render() {
        return <Text style={{marginBlock: 16}}>Revenue is the amount of money earned or the gross income. Net profit is the amount of money earned minus the amount spent. It will be the final value that is added to your bank account</Text>;
    }
}
