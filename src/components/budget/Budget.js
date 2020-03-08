import React, { Component } from "react";
import {Popover, Typography} from "antd";
import { PageEnum } from "../../constants/PageEnum";
import { PageTemplate } from "../shared/PageTemplate"
import {BudgetPopoverContent} from "./BudgetPopoverContent";

const { Text } = Typography;

export class Budget extends Component {
    render() {
        return <PageTemplate nextPage={PageEnum.PLAN} title="Weekly Budget">
            <Popover content={<BudgetPopoverContent/>}>

            </Popover>
            <Text>This is a placeholder.</Text>
        </PageTemplate>;
    }
}
