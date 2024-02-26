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
import React, { useState } from "react";
import SalonInfo from "./SalonInfo";
import styles from "./SalonList.module.css";
import { SearchOutlined } from '@ant-design/icons';

function SalonList() {
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');
  
  const handleSearch=()=>{
    setSearch(keyword);
  }

  return (
    <div className="dashboardContainer">
      <Row style={{ marginBottom: "50px" }}>
        <h2 className={styles.h2Design}>
          Salon List
        </h2>
        <Col lg={{ span: 24 }} style={{ marginTop: "30px" }}>
          <div className='' style={{ display: "flex", gap: "15px" }}>
            <Input onChange={(e)=>setKeyword(e.target.value)} className={styles.searchMessageInput} size="large" placeholder="Search by name/email/phone" prefix={<SearchOutlined style={{ color: "#CFCFD0" }} />} />
            <Button onClick={handleSearch} className={styles.searchMessageInput} style={{ height: "50px", width: "300px", backgroundColor: "#F66D0F", color: "#fff", fontSize: "20px" }}>Search</Button>
          </div>
        </Col>
      </Row>
      <SalonInfo search={keyword} />
    </div>
  );
}

export default SalonList;
