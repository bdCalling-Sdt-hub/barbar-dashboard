import React from "react";
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
import { SearchOutlined } from "@ant-design/icons";
import styles from "./ProviderRequest.module.css";
import ProviderRequestInfo from "./ProviderRequestInfo";

function ProviderRequest() {
  return (
    <div>
      {" "}
      <Row style={{ marginBottom: "50px" }}>
        <h2 className={styles.h2Design}>Provider Request</h2>
        <Col lg={{ span: 24 }} style={{ marginTop: "30px" }}>
          <div className="" style={{ display: "flex", gap: "15px" }}>
            <Input
              className={styles.searchMessageInput}
              size="large"
              placeholder="search by name & ID"
              prefix={<SearchOutlined style={{ color: "#CFCFD0" }} />}
            />
            <Button
              className={styles.searchMessageInput}
              style={{
                height: "50px",
                width: "300px",
                backgroundColor: "#F66D0F",
                color: "#fff",
                fontSize: "20px",
              }}
            >
              Search
            </Button>
          </div>
        </Col>
      </Row>
      <ProviderRequestInfo />
    </div>
  );
}

export default ProviderRequest;
