import React, {Component} from "react";
import {Popover, Button, Typography, InputNumber, Form} from "antd";
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
        this.getBudget = this.getBudget.bind(this);

        this.state = {
            savingsBudget: "",
            suppliesBudget: ""
        };
    }

    static contextType = UserContext;

    componentDidMount() {
        getDayData(this);
    }

    render() {
        const content = this.state && this.state.data ? this.renderMenu() : <CenteredSpinner/>;
        const disableNext = this.state.savingsBudget === null || this.state.suppliesBudget === null
            || this.state.savingsBudget === "" || this.state.suppliesBudget === "";
        const self = this;
        return <PageTemplate nextPage={PageEnum.PLAN}
                             title="Weekly Budget"
                             onNext={() => setBudget(self, self.getBudget())}
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
                <Text>{`You have $${data[FieldEnum.SAVINGS]} in your bank account.`}</Text>
                <br/>
                <Text>{`$${weeklyCosts} will be deducted for weekly costs.`}</Text>
                <br/>
                <Text size={"small"}>{`Your previous budget was $${data[FieldEnum.BUDGET]}.`}</Text>
                <Form>
                    <Form.Item
                        label="How much would you like to budget for supplies?"
                        name={"supplies"}
                        rules={[{required: true, message: 'Please provide a budget.'}]}>
                        <InputNumber
                            name={"savings"}
                            precision={2}
                            required={true}
                            value={this.state.savingsBudget || 0}
                            onChange={(value) => this.setState({suppliesBudget: value})}
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
                            value={this.state.savingsBudget || 0}
                            onChange={(value) => this.setState({savingsBudget: value})}
                            min={0}/>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    getBudget() {
        const budget = this.state.savingsBudget + this.state.suppliesBudget;
        return budget;
    }
}
