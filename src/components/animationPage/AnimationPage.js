import React, {Component} from "react";
import {Button, Progress} from "antd";
import {PageTemplate} from "../shared/PageTemplate"
import {ClockCircleOutlined} from "@ant-design/icons";

export class AnimationPage extends Component {
    constructor(props) {
        super(props);

        this.renderProgress = this.renderProgress.bind(this);
        this.onEndDay = this.onEndDay.bind(this);
        this.addPoints = this.addPoints.bind(this);
        this.renderQuiz = this.renderQuiz(this);

        this.state = {
            quizzesCompleted: 0,
            quizzesTotal: 3,
            points: 0
        }
    }

    render() {
        return (
            <PageTemplate>
                <div style={{marginBottom: 8}}>
                    <img src="bird1.gif" alt="bird1" width="800px" height="500px" className="center"/>
                </div>
                {this.renderProgress()}
                <div id={"quiz"}>
                    {this.renderQuiz()}
                </div>
            </PageTemplate>);
    }

    renderProgress() {
        if (this.state.quizzesCompleted === this.state.quizzesTotal) return (
            <div style={{textAlign: "center", marginBottom: 8}}>
                <div style={{display: "inline-block"}}>
                    <Button onClick={this.onEndDay}
                            size={"medium"}
                            icon={<ClockCircleOutlined />}>
                        End Day
                    </Button>
                </div>
            </div>
        );
        const percentComplete = 100 * this.state.quizzesCompleted / this.state.quizzesTotal;
        return (
            <div style={{textAlign: "center", marginBottom: 8}}>
                <div style={{display: "inline-block"}}>
                    <Progress
                        type={"circle"}
                        percent={percentComplete}
                        status={"active"}
                        strokeColor={{
                            to: "#FFF8C8",
                            from: "#DEC3E1"
                        }}
                        status={"active"}
                        showInfo={false}
                        width={60}
                    />
                </div>
            </div>);
    }

    renderQuiz() {
        const quiz = "";
        setTimeout(() => {
            document.getElementById("quiz").appendChild(<Quiz/>)
        }, 15000);
    }

    addPoints(points) {
        this.setState((prev) => ({points: prev.points + points, quizzesCompleted: prev.quizzesCompleted + 1}));
    }

    onEndDay() {

    }
}

