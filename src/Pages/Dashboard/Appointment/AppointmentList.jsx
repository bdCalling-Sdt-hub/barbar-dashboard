import { Button, Col, Input, Row } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./Appointment.module.css";
import AppointmentListTable from "./AppointmentListTable";

function AppointmentList() {
  return (
    <>
      <Row style={{ marginBottom: "50px" }}>
        <h2 className={styles.h2Design}>Appointment list</h2>
        <Col lg={{ span: 24 }} style={{ marginTop: "30px" }}>
          <div className="" style={{ display: "flex", gap: "15px" }}>
            <Input
              className={styles.searchMessageInput}
              size="large"
              placeholder="Search"
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
      <AppointmentListTable />
    </>
  );
}

export default AppointmentList;
