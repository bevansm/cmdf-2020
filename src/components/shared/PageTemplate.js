import React, {Component} from "react";
import {Button, Layout, PageHeader, Card} from "antd";
import {CaretRightOutlined} from "@ant-design/icons";

const {Header, Content} = Layout;

/**
 * @param title - title of the page (optional)
 * @param nextPage - link to the next page (optional)
 */
export class PageTemplate extends Component {
    constructor(props) {
        super(props);
        this.getButton = this.getButton.bind(this);
    }

    render() {
        return (
            <div style={{height: "100%"}}>
                <Layout>
                    <Header>
                        <PageHeader title={this.props.title}/>
                    </Header>
                    <Content style={{padding: 16, height: window.innerHeight}} className={"body"}>
                        <div style={{marginBottom: 8}}>
                            <Card hoverable={true}>
                                <div style={{height: "100%"}}>
                                    {this.props.children}
                                </div>
                            </Card>
                        </div>
                        <div style={{"textAlign": "right"}}>
                            {this.getButton()}
                        </div>
                    </Content>
                </Layout>
            </div>
        );
    }

    getButton() {
        return this.props.nextPage ? (
            <Button
                href={this.props.nextPage}
                size={"small"}
                icon={<CaretRightOutlined/>}
                onClick={this.props.onNext}
                disabled={this.props.disableNext}
            >
                Next
            </Button>
        ) : null;
    }
}
