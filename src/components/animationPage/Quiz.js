import React, {Component} from "react";
import {Typography, Card, Divider, Button, Tooltip, Radio} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";

const {Text} = Typography;

export class Quiz extends Component {
    constructor(props) {
        super(props);

        this.renderButtons = this.renderButtons.bind(this);
        this.renderLink = this.renderLink.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    render() {
        console.log("hi!");
        const quiz = this.props.quiz;
        return (
            <div className={"fadeInUpBig, fadeOutDownBig"}>
                <Card
                    hoverable={true}
                    style={{marginBottom: 16}}
                    title={`Question ${this.props.quizCurrent} of ${this.props.quizzesTotal}`}>
                    <Text>{quiz.question}</Text>
                    <br/>
                    {this.renderLink()}
                    <Divider/>
                    {this.renderButtons()}
                </Card>
            </div>);
    }

    renderLink() {
        const link = this.props.quiz.link;
        if (!link) return null;
        return (<Tooltip title="Click to be redirected"
                         trigger={"hover"}
                         placement={"right"}>
            <Button icon={<InfoCircleOutlined/>}
                    href={link}
                    size="small"
                    type="link"
                    shape="circle">
                <Text style={{fontSize: 10}} type={"secondary"}>Learn More About This Topic</Text>
            </Button>
        </Tooltip>);
    }

    renderButtons() {
        const options = this.props.quiz.options;
        return (
            <Radio.Group
                onChange={this.onClick}
                style={{float: "right"}}>
                {options.map((option) =>
                    <Radio.Button value={option} key={option} size={"large"}>
                        {option}
                    </Radio.Button>)}
            </Radio.Group>
        )
    }

    onClick(value) {
        const quiz = this.props.quiz;
        if (value === quiz.correctOption) this.props.onEnd(quiz.rightPoints);
        else this.props.onEnd(quiz.wrongPoints);
    }
}
