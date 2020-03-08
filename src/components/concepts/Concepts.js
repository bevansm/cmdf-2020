import React, { Component } from "react";
import { Typography } from "antd";
import { PageEnum } from "../../constants/PageEnum";
import { PageTemplate } from "../shared/PageTemplate"

const { Title, Paragraph, Text } = Typography;

export class Concepts extends Component {
  render() {
    return <PageTemplate nextPage={PageEnum.BUDGET} title="Key Concepts">
         <Paragraph>
          As you grow your donut business with Mia, you will also learn the following basic financial literacy concepts:
        </Paragraph>

        <Paragraph>
          <ul>
            <li>
              Budgeting
            </li>
            <li>
              Expenses, revenues, net profit
            </li>
            <li>
              Needs, wants
            </li>
            <li>
              Savings, planning for the future
            </li>
          </ul>
        </Paragraph>
    </PageTemplate>;
  }
}
