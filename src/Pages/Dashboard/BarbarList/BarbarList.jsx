import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import React from "react";
import BarbarInfo from "./BarbarInfo";
import styles from "./BarbarList.module.css";
import { SearchOutlined } from '@ant-design/icons';

function BarbarList() {
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

  return (
    <div className="dashboardContainer">
      <Row style={{ marginBottom: "50px" }}>
        <h2 className={styles.h2Design}>
          Barbar List
        </h2>
        <Col lg={{ span: 24 }} style={{ marginTop: "30px" }}>
          <div className='' style={{ display: "flex", gap: "15px" }}>
            <Input className={styles.searchMessageInput} size="large" placeholder="Search by name/email/phone" prefix={<SearchOutlined style={{ color: "#CFCFD0" }} />} />
            <Button className={styles.searchMessageInput} style={{ height: "50px", width: "300px", backgroundColor: "#F66D0F", color: "#fff", fontSize: "20px" }}>Search</Button>
          </div>
        </Col>
      </Row>
      <BarbarInfo />
    </div>
  );
}

export default BarbarList;
