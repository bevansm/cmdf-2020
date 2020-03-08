import React, {Component} from "react";
import {Button, Progress, Tag} from "antd";
import {PageTemplate} from "../shared/PageTemplate"
import {ClockCircleOutlined} from "@ant-design/icons";
import {Quiz} from "./Quiz";
import {quizzes} from "../../constants/Quizes";
import {sendPoints} from "../../utils/APIUtils";

export class AnimationPage extends Component {
    constructor(props) {
        super(props);

        this.renderProgress = this.renderProgress.bind(this);
        this.onEndDay = this.onEndDay.bind(this);
        this.updateAfterQuiz = this.updateAfterQuiz.bind(this);
        this.populateQuiz = this.populateQuiz.bind(this);
        this.renderQuiz = this.renderQuiz.bind(this);
        this.renderPoints = this.renderPoints.bind(this);

        this.state = {
            quizzesCompleted: 0,
            quizzesTotal: 3,
            points: 0,
            quiz: null,
            submitted: false
        }
    }

    componentDidMount() {
        this.populateQuiz();
    }

    render() {
        return (
            <PageTemplate>
                <div style={{marginBottom: 8}}>
                    <img src={`bird${(this.state.quizzesCompleted % 3) + 1}.gif`} alt="bird" width="100%" height={"100%"} className="center"/>
                </div>
                {this.renderPoints()}
                {this.renderQuiz()}
                {this.renderProgress()}
            </PageTemplate>);
    }

    renderProgress() {
        let child;
        if (this.state.quizzesCompleted === this.state.quizzesTotal) {
            child = (
                <Button onClick={this.onEndDay}
                        size={"medium"}
                        icon={<ClockCircleOutlined/>}
                        disabled={this.state.submitted}>
                    End Day
                </Button>);
        } else {
            const percentComplete = 100 * this.state.quizzesCompleted / this.state.quizzesTotal;
            child = (
                <Progress
                    type={"circle"}
                    percent={percentComplete}
                    status={"active"}
                    strokeColor={{
                        "0%": "#FFF8C8",
                        "100%": "#DEC3E1"
                    }}
                    showInfo={false}
                    width={60}
                />)
        }
        return (
            <div style={{textAlign: "center", marginBottom: 8}}>
                <div style={{display: "inline-block"}}>
                    {child}
                </div>
            </div>);
    }

    renderPoints() {
        const points = this.state.points;
        const color = points < 0 ? "red" : points === 0 ? "orange" : "green";
        return (
            <div style={{textAlign: "center", marginBottom: 8}}>
                <div style={{display: "inline-block"}}>
                    <Tag color={color}>{`Sales Today: $${this.state.points}.00`}</Tag>
                </div>
            </div>);
    }

    populateQuiz() {
        const quiz = quizzes[0];
        this.setState({quiz: quiz});
    }

    renderQuiz() {
        if (!this.state.quiz) return null;
        return <Quiz
            onEnd={this.updateAfterQuiz}
            quiz={this.state.quiz}
            quizCurrent={this.state.quizzesCompleted + 1}
            quizzesTotal={this.state.quizzesTotal}/>
    }

    updateAfterQuiz(points) {
        this.setState(
            (prev) => ({points: prev.points + points, quizzesCompleted: prev.quizzesCompleted + 1, quiz: null}),
            () => setTimeout(() => this.state.quizzesCompleted !== this.state.quizzesTotal ? this.populateQuiz() : null, 5000));
    }

    onEndDay() {
        this.setState({submitted: true}, () => sendPoints(this));
    }
}

