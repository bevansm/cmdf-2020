import React, { Component } from "react";
import {VictoryChart, VictoryArea} from "victory";
import {Menu} from "antd";
import {getDays} from "../../utils/APIUtils";
import {CenteredSpinner} from "../shared/CenteredSpinner";
import {FieldEnum} from "../../constants/APIResponses";

export class StatusDisplay extends Component {
    constructor(props) {
        super(props);

        this.renderHeader = this.renderHeader.bind(this);
        this.renderGraph = this.renderGraph.bind(this);

        this.state = {
            current: FieldEnum.SPENDING
        };
    }

    componentDidMount() {
        getDays(this);
    }

    render() {
        if (!this.state.data) return <CenteredSpinner/>;
        const graphs = [FieldEnum.SPENDING, FieldEnum.TO_SAVE, FieldEnum.TO_SUPPLIES];
        return (
            <Menu onClick={(e) => this.setState({current: e.key})}
                  selectedKeys={[this.state.current]}
                    mode={"horizontal"}>
                {graphs.map((field) => this.renderHeader(field))}
            </Menu>
        );
    }

    renderHeader(field) {
        const header = field.toLowerCase()
            .split(' ')
            .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
            .join(' ');

        return <Menu.Item key={field}>
            {header}
        </Menu.Item>
    }

    renderGraph() {
        const field = this.state.current;
        const data = this.state.data.map((data) => ({
            day: data[FieldEnum.DAY],
            field: data[field]
        }));

        return <VictoryChart>
            <VictoryArea data={this.state.data}>

            </VictoryArea>
        </VictoryChart>;

    }

}
