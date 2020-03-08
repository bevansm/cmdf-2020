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
        return (<Tooltip title="Click to learn more!"
                         trigger={"hover"}
                         placement={"right"}>
            <Button icon={<InfoCircleOutlined/>}
                    href={link}
                    size="small"
                    type="link"
                    shape="circle">
                <Text style={{fontSize: 10}} type={"secondary"}>Learn More</Text>
            </Button>
        </Tooltip>);
    }

    renderButtons() {
        const options = this.props.quiz.options;
        return (
            <Radio.Group
                onChange={this.onClick}
                style={{float: "left"}}>
                {options.map((option) =>
                    <div key={option}>
                        <Radio.Button value={option} key={option} size={"large"} style={{marginBottom: 8}}>
                            {option}
                        </Radio.Button>
                        <br/>
                    </div>)}
            </Radio.Group>
        )
    }

    onClick(value) {
        const quiz = this.props.quiz;
        if (value === quiz.correctOption) this.props.onEnd(quiz.rightPoints);
        else this.props.onEnd(quiz.wrongPoints);
    }
}
