import React, {Component} from "react";
import {Typography, Form, Popover, Button, InputNumber, Divider, Row, Col, Descriptions, notification} from "antd";
import {PageEnum} from "../../constants/PageEnum";
import {PageTemplate} from "../shared/PageTemplate"
import {CenteredSpinner} from "../shared/CenteredSpinner";
import {getDayData, sendDay} from "../../utils/APIUtils";
import {FieldEnum} from "../../constants/APIResponses";
import {CostPopoverContent} from "./CostPopoverContent";
import {CostsEnum, needCosts, wantCosts} from "../../constants/Costs";
import {getTotalCostsNoTax, roundToTwo} from "../../utils/Utils";
import {taxes} from "../../constants/Constants";

const {Text, Title} = Typography;

export class Planner extends Component {
    constructor(props) {
        super(props);

        this.renderMenu = this.renderMenu.bind(this);
        this.renderDescriptions = this.renderDescriptions.bind(this);
        this.renderCost = this.renderCost.bind(this);

        this.state = {};
    }

    componentDidMount() {
        getDayData(this);
    }

    render() {
        const title = this.state.data ? `Day ${this.state.data[FieldEnum.DAY]} Planning` : `Day Planning`;
        const disableNext =
            needCosts.reduce((prev, curr) => prev || this.state[curr] === null || this.state[curr] === "", false)
            || wantCosts.reduce((prev, curr) => prev || this.state[curr] === null || this.state[curr] === "", false);
        const self = this;
        return (
            <PageTemplate nextPage={PageEnum.ANIM}
                          title={title}
                          onNext={() => sendDay(self, self.state)}
                          disableNext={disableNext}>
                <div style={{textAlign: "center", marginBottom: 8}}>
                    <div style={{display: "inline-block"}}>
                        <Popover content={<CostPopoverContent/>}
                                 placement="bottom">
                            <Button>What type of costs are there?</Button>
                        </Popover>
                    </div>
                </div>
                <Divider/>
                {this.renderMenu()}
            </PageTemplate>
        );
    }

    renderMenu() {
        if (!this.state || !this.state.data) return <CenteredSpinner/>;
        const data = this.state.data;
        return (
            <div>
                <div style={{marginBottom: 8}}>
                    <Text style={{marginBottom: 8}}>
                        {`You have $${data[FieldEnum.SAVINGS]} in the bank, and you are expected to earn $${data[FieldEnum.PAYCHECK]} today.`}
                    </Text>
                    <br/>
                    <Text style={{marginBottom: 8}}>
                        {`Remember that your spending budget is $${data[FieldEnum.TO_SAVE]} and your supplies budget is $${data[FieldEnum.TO_SUPPLIES]}!`}
                    </Text>
                </div>
                <Divider/>
                <Form hideRequiredMark={true}>
                    <div style={{textAlign: "center", marginBottom: 8}}>
                        <Text><strong>Needs</strong></Text>
                    </div>
                    {needCosts.map((cost) => this.renderCost(cost))}
                    <Divider/>
                    <div style={{textAlign: "center", marginBottom: 8}}>
                        <Text><strong>Wants</strong></Text>
                    </div>
                    {wantCosts.map((cost) => this.renderCost(cost))}
                </Form>
                <Divider/>
                {this.renderDescriptions()}
            </div>
        );
    }

    renderCost(costName) {
        return (
            <Row key={costName} style={{marginBottom: 8}}>
                <Col span={4}>
                    <div style={{textAlign: "center", width: 30}}>
                        <div style={{display: "flex"}}>
                            <img src={`/icons/${costName}.png`}/>
                        </div>
                        {window.innerWidth > 500 ? <div style={{display: "flex"}}>
                                <Text style={{display: "table", margin: "0 auto"}}>{costName}</Text></div>
                            : null}
                    </div>
                </Col>
                <Col span={10} style={{display: "flex", "alignItems": "center"}}>
                    <Form.Item
                        label=""
                        name={costName}
                        rules={[{required: true, message: 'Please provide a count.'}]}>
                        <InputNumber
                            required
                            min={0}
                            step={1}
                            value={this.state[costName] || 0}
                            onChange={(value) => this.setState({[costName]: value})}
                            defaultValue={0}/>
                    </Form.Item>
                </Col>
                <Col span={2} style={{display: "flex", "alignItems": "center", marginBottom: 24}}>
                    {`$${roundToTwo(CostsEnum[costName] || 0)}`}
                </Col>
                <Col span={6}/>
                <Col span={2} style={{display: "flex", "alignItems": "center", marginBottom: 24}}>
                    {`$${roundToTwo((CostsEnum[costName] || 0) * (this.state[costName] || 0))}`}
                </Col>
            </Row>
        );
    }


    renderDescriptions() {
        const data = this.state.data;
        const costWithoutTax = getTotalCostsNoTax(this.state);
        const costWithTax = roundToTwo(costWithoutTax * taxes);
        const paycheckMinusSavings = data[FieldEnum.PAYCHECK] - costWithTax;
        console.log(costWithTax);
        console.log(costWithTax);
        console.log(costWithoutTax);
        console.log(paycheckMinusSavings);
        if (costWithTax > data[FieldEnum.TO_SUPPLIES]) this.errorPopup(`You've exceeded your supplies budget of $${data[FieldEnum.TO_SUPPLIES]}! Watch what you're spending!`);
        if (paycheckMinusSavings < data[FieldEnum.TO_SAVE]) this.errorPopup(`With what you're spending, you won't be able to save for your savings budget of $${data[FieldEnum.TO_SAVE]}!`);
        return (
            <Row>
                <Col span={20}/>
                <Col span={4}>
                    <Descriptions title={"Totals"} size={"25%"} column={1}>
                        <Descriptions.Item label={"Subtotal"} span={12}>{`$${costWithoutTax}`}</Descriptions.Item>
                        <Descriptions.Item label={"PST/GST"} span={12}>{`$${roundToTwo(taxes / 100)}%`}</Descriptions.Item>
                        <Descriptions.Item label={"Total"} span={12}>{`$${costWithTax}`}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        );
    }

    errorPopup(msg) {
        notification["error"]({
            placement: "bottomRight",
            message: 'Over budget!',
            description: msg
        });
    }
}
