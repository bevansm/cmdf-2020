import React, {Component} from "react";
import {Spin} from "antd";

export class CenteredSpinner extends Component {
    render() {
        return (
            <div style={{textAlign: "center"}}>
                <div style={{display: "inline-block"}}>
                    <Spin size={"large"}/>
                </div>
            </div>
        );
    }
}