import React, {Component} from "react";
import {Typography, Form, Popover, Button, InputNumber} from "antd";
import {PageEnum} from "../../constants/PageEnum";
import {PageTemplate} from "../shared/PageTemplate"
import {CenteredSpinner} from "../shared/CenteredSpinner";
import {getDayData} from "../../utils/APIUtils";
import {FieldEnum} from "../../constants/APIResponses";
import {CostPopoverContent} from "./CostPopoverContent";
import Icon from '@ant-design/icons';
import {costs} from "../../constants/Costs";

const {Text, Title} = Typography;

export class Planner extends Component {
    constructor(props) {
        super(props);

        this.renderMenu = this.renderMenu.bind(this);

    }

    componentDidMount() {
        getDayData(this);
    }

    render() {
        const title = this.state && this.state.data ? `Day ${this.state.data[FieldEnum.DAY]} Planning` : `Day Planning`;
        return (
            <PageTemplate nextPage={PageEnum.ANIM} title={title}>
                <div style={{textAlign: "center", marginBottom: 8}}>
                    <div style={{display: "inline-block"}}>
                        <Popover content={<CostPopoverContent/>}
                                 placement="bottom">
                            <Button>What type of costs are there?</Button>
                        </Popover>
                    </div>
                </div>
                {this.renderMenu()}
            </PageTemplate>
        );
    }

    renderMenu() {
        if (!this.state || !this.state.data) return <CenteredSpinner/>;
        return (
            <Form>
                {costs.map((cost) => this.renderCost(cost))}
            </Form>
        );
    }

    renderCost(costName) {
        // require(`../../icons/${costName}.svg`) ||
        return (
            <div>
                <Form.Item
                    label=""
                    name={costName}
                    rules={[{required: true, message: 'Please provide a budget.'}]}>
                    <div style={{float: "left", marginRight: 8}}>
                        <img src={"/favicon.ico"}/>
                    </div>
                    <InputNumber
                        required
                        min={0}
                        step={1}
                        value={this.state[costName] || 0}
                        onChange={(value) => this.setState({[costName]: value})}
                        defaultValue={0}/>
                </Form.Item>
            </div>
        );
    }

}
