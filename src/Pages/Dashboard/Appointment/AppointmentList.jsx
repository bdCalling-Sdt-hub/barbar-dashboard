import { Button, Col, Input, Row } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./Appointment.module.css";
import AppointmentListTable from "./AppointmentListTable";

function AppointmentList() {
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');
  
  const handleSearch=()=>{
    setSearch(keyword);
  }
  return (
    <>
      <Row style={{ marginBottom: "50px" }}>
        <h2 className={styles.h2Design}>Appointment list</h2>
        <Col lg={{ span: 24 }} style={{ marginTop: "30px" }}>
          <div className="" style={{ display: "flex", gap: "15px" }}>
            <Input
              onChange={(e)=>setKeyword(e.target.value)}
              className={styles.searchMessageInput}
              size="large"
              placeholder="Search"
              prefix={<SearchOutlined style={{ color: "#CFCFD0" }} />}
            />
            <Button
            onClick={handleSearch}
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
      <AppointmentListTable search={search} />
    </>
  );
}

export default AppointmentList;
