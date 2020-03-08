import React, {Component} from "react";
import {Popover, Button, Typography, InputNumber, Form, Divider} from "antd";
import {PageEnum} from "../../constants/PageEnum";
import {PageTemplate} from "../shared/PageTemplate"
import {BudgetPopoverContent} from "./BudgetPopoverContent";
import {CenteredSpinner} from "../shared/CenteredSpinner";
import {getDayData, setBudget} from "../../utils/APIUtils";
import {UserContext} from "../../constants/Context";
import {weeklyCosts} from "../../constants/Constants";
import {FieldEnum} from "../../constants/APIResponses";

const {Text} = Typography;

export class Budget extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);

        this.state = {
            [FieldEnum.TO_SAVE]: "",
            [FieldEnum.TO_SUPPLIES]: ""
        };
    }

    static contextType = UserContext;

    componentDidMount() {
        getDayData(this);
    }

    render() {
        const content = this.state && this.state.data ? this.renderMenu() : <CenteredSpinner/>;
        const disableNext = this.state[FieldEnum.TO_SAVE] === null || this.state[FieldEnum.TO_SUPPLIES] === null ||
            this.state[FieldEnum.TO_SAVE] === "" || this.state[FieldEnum.TO_SUPPLIES] === "";
        const self = this;
        return <PageTemplate nextPage={PageEnum.PLAN}
                             title="Weekly Budget"
                             onNext={() => setBudget(self)}
                             disableNext={disableNext}>
            <div style={{textAlign: "center", marginBottom: 8}}>
                <div style={{display: "inline-block"}}>
                    <Popover content={<BudgetPopoverContent/>}
                             placement="bottom">
                        <Button>What is a budget?</Button>
                    </Popover>
                </div>
            </div>
            {content}
        </PageTemplate>;
    }

    renderMenu() {
        const data = this.state.data;
        return (
            <div>
                <Text>{`You have $${data[FieldEnum.SAVINGS]} in the bank, and you are expected to earn $${data[FieldEnum.PAYCHECK]} today.`}</Text>
                <br/>
                <Text>{`$${weeklyCosts} will be deducted for weekly costs.`}</Text>
                <br/>
                <Text size={"small"}>{`Your previous budget was $${data[FieldEnum.BUDGET]}.`}</Text>
                <Divider />
                <Form hideRequiredMark={true}>
                    <Form.Item
                        label="How much would you like to budget for supplies?"
                        name={"supplies"}
                        rules={[{required: true, message: 'Please provide a budget.'}]}>
                        <InputNumber
                            name={"savings"}
                            precision={2}
                            required={true}
                            value={this.state[FieldEnum.TO_SUPPLIES] || 0}
                            onChange={(value) => this.setState({[FieldEnum.TO_SUPPLIES]: value})}
                            min={0}/>
                    </Form.Item>
                    <Form.Item
                        label="How much would you like to budget for savings?"
                        name={"savings"}
                        rules={[{required: true, message: 'Please provide a budget.'}]}>
                        <InputNumber
                            name={"savings"}
                            precision={2}
                            required={true}
                            value={this.state[FieldEnum.TO_SAVE] || 0}
                            onChange={(value) => this.setState({[FieldEnum.TO_SAVE]: value})}
                            min={0}/>
                    </Form.Item>
                </Form>
                <img src="cat.gif" alt="cat1" width = "200px" height ="200px"></img>
            </div>
            
        );
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
}
