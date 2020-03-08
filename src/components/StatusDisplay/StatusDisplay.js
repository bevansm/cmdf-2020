import React, {Component} from "react";
import {VictoryChart, VictoryArea, VictoryTheme, VictoryAxis} from "victory";
import {Button, Divider, Menu, Popover} from "antd";
import {getDays} from "../../utils/APIUtils";
import {CenteredSpinner} from "../shared/CenteredSpinner";
import {FieldEnum} from "../../constants/APIResponses";
import {StatusPopoverContent} from "./StatusPopoverContent";

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
        const topChild = (<div style={{textAlign: "center", marginBottom: 8}}>
            <div style={{display: "inline-block"}}>
                <Popover content={<StatusPopoverContent/>}
                         placement="bottom">
                    <Button>What are profit and revenue?</Button>
                </Popover>
            </div>
        </div>);
        if (!this.state.data) return <div>
            {topChild}
            <CenteredSpinner/>
        </div>;
        const graphs = [FieldEnum.SPENDING, FieldEnum.TO_SAVE, FieldEnum.TO_SUPPLIES];
        return (
            <div>
                {topChild}
                <Menu onClick={(e) => this.setState({current: e.key})}
                      selectedKeys={[this.state.current]}
                      mode={"horizontal"}>
                    {graphs.map((field) => this.renderHeader(field))}
                </Menu>
                {this.renderGraph()}
            </div>
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
            x: data[FieldEnum.DAY],
            y: data[field]
        }));

        return <VictoryChart
            theme={VictoryTheme.material}>
            <VictoryArea data={data}/>
            <VictoryAxis/>
        </VictoryChart>;

    }

}
