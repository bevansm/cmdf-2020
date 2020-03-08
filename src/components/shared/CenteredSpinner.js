import React, {Component} from "react";
import {Progress, Typography} from "antd";

const {Text} = Typography;

export class CenteredSpinner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 0
        };
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <div style={{display: "inline-block"}}>
                    <img src="catsleep.gif" alt="loading" width="100" height="100" className="center"/>
                    <Text type={"secondary"}>Loading Data...</Text>
                    <Progress percent={50} status="active"
                              strokeColor={"#BDD3F2"}
                              trailColor={"#DEC3E1"}/>
                </div>
            </div>
        );
    }
}