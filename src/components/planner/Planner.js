import React, {Component} from "react";
import {Typography, Spin} from "antd";
import {PageEnum} from "../../constants/PageEnum";
import {PageTemplate} from "../shared/PageTemplate"
import axios from "axios";

const {Text} = Typography;

export class Planner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasData: false
        }
    }

    componentDidMount() {
        const body = null;
        const config = {
            crossDomain: true,
            params: body,
            headers:  { 'Content-Type': 'application/json' }
        };

        axios.get("", config)
            .then((result) => {
                const data = result.data;
                // TODO
                this.setState({hasData: true});
            })
            .catch((err)=> console.log(err));
    }

    render() {
        const title = this.state.hasData ? `Day ${this.state.day} Planning` : `Day Planning`;
        const children = this.state.hasData ?  <Text>This is a placeholder.</Text> :
            <div style={{textAlign: "center"}}>
                <div style={{display: "inline-block"}}>
                    <Spin size={"large"}/>
                </div>
            </div>
        return (
            <PageTemplate nextPage={PageEnum.ANIM} title={title}>
                {children}
        </PageTemplate>
    );
    }
}
