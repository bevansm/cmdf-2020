import React, {Component} from "react";
import {Typography} from "antd";
import {PageEnum} from "../../constants/PageEnum";
import {PageTemplate} from "../shared/PageTemplate"
import {CenteredSpinner} from "../shared/CenteredSpinner";
import {getDayData} from "../../utils/APIUtils";

const {Text} = Typography;

export class Planner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasData: false
        }
    }

    componentDidMount() {
        getDayData(this);
    }

    render() {
        const title = this.state.hasData ? `Day ${this.state.day} Planning` : `Day Planning`;
        const children = this.state.hasData ? <Text>This is a placeholder.</Text> : <CenteredSpinner/>;
        return (
            <PageTemplate nextPage={PageEnum.ANIM} title={title}>
                {children}
            </PageTemplate>
        );
    }
}
