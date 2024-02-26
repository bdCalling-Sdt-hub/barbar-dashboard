import React, { useState } from "react";
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
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');
  
  const handleSearch=()=>{
    setSearch(keyword);
  }
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
              onChange={(e)=>setKeyword(e.target.value)}
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
      <ProviderRequestInfo search={keyword} />
    </div>
  );
}

export default ProviderRequest;
