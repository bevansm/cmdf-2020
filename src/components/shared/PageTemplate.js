import React, {Component} from "react";
import {Button, Layout, PageHeader, Card} from "antd";
import {CaretRightOutlined} from "@ant-design/icons";
import {ExpectedOriginsEnum, PageEnum} from "../../constants/PageEnum";
import {useHistory, useLocation} from "react-router-dom";
const {Header, Content} = Layout;

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
                    <Header>
                        <PageHeader title={this.props.title}/>
                    </Header>
                    <Content style={{padding: 16, height: "100%"}}>
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
