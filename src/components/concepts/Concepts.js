import React, { Component } from "react";
import {Divider, Typography} from "antd";
import { PageEnum } from "../../constants/PageEnum";
import { PageTemplate } from "../shared/PageTemplate"

const { Paragraph } = Typography;

export class Concepts extends Component {

    render() {
    return <PageTemplate nextPage={PageEnum.BUDGET} title="Key Concepts">
        <img src="cockateil.gif" alt="professor bird" width="25%" height="25%" className="center"/>
        <Divider/>
        <Paragraph>
          As you grow your donut business with Mia, you will learn about a few basic financial literacy concepts:
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
