import React, {Component} from "react";
import {Typography, Form, Input, Divider} from "antd";
import {PageEnum} from "../../constants/PageEnum";
import {PageTemplate} from "../shared/PageTemplate"
import {appTitle} from "../../constants/Constants";

const {Text, Title} = Typography;

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }


    render() {
        return <PageTemplate nextPage={PageEnum.INTRO}
                             title="Register"
                             disableNext={!this.state.user}>
            <Title level={4}>
                {`Welcome to ${appTitle}!`}
            </Title>
            <Text type={"secondary"}>
                Login to meet Mia and begin your doughnut-filled adventure!
            </Text>
            <Divider/>
            <Form hideRequiredMark={true}>
                <Form.Item
                    name={"login"}
                    label={"User Email"}
                    rules={[{required: true, message: 'Please provide an email to begin!'}]}>
                    <Input
                        name={"usr_id"}
                        required={true}
                        value={this.state.user}
                        placeholder={"mias-cats@doughnuts.com"}
                        onChange={(event) => this.setState(
                            {user: event.target.value},
                            () => this.props.setUser(this.state.user))}/>
                </Form.Item>
            </Form>
            <img src="doughnut.gif" alt="doughnut" width="50%" height="50%" className="center"/>
        </PageTemplate>;
    }
}
