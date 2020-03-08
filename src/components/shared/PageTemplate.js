import React, { Component } from "react";
import { Button, Layout, PageHeader } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

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
      <div height={"100%"}>
        <Layout>
          <Header>
            <PageHeader title={this.props.title} />
          </Header>
          <Content style={{margin: 16, height: 500}}>{this.props.children}</Content>
          <Footer style={{"textAlign": "right"}}>
            {this.getButton()}
          </Footer>
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
