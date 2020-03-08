import React, {Component} from "react";
import {Button, Layout, PageHeader, Card, Divider, Typography} from "antd";
import {CaretRightOutlined} from "@ant-design/icons";

const {Header, Content} = Layout;

const {Title} = Typography;

/**
 * @param title - title of the page (optional)
 * @param nextPage - link to the next page (optional)
 */
export class PageTemplate extends Component {
    // static contextType = staticContext;

    constructor(props) {
        super(props);
        this.getButton = this.getButton.bind(this);
        // const location = useLocation();
        // console.log(location);
        // const expectedOrigins = ExpectedOriginsEnum["/"];
        //
        // const from = location.state || {from: {pathname: PageEnum.DEFAULT}};
        // if (!expectedOrigins.includes(from.pathname)) useHistory().push(PageEnum.LOGIN);
    }

    render() {
        return (
            <div style={{height: "100%", minHeight: "100%"}}>
                <Layout style={{background: "transparent"}}>
                    <Content style={{padding: 16, height: "100%"}}>
                        <Card style={{marginBottom: 8}}>
                            <img src={`logo.png`}
                                 alt="logo"
                                 width="75%"
                                 height="75%"
                                 className="center"
                                 style={{maxWidth: 900, maxHeight: 100}}/>
                        </Card>
                        <div style={{marginBottom: 8}}>
                            <Card hoverable={true}>
                                <div style={{textAlign: "center"}}>
                                    <div style={{display: "inline-block"}}>
                                        <Title level={4}>{this.props.title}</Title>
                                    </div>
                                </div>
                                <Divider/>
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
