import React, {useState} from 'react'
import TrashTable from './TrashTable'
import { Col, Row, Input, Button } from "antd";
import { SearchOutlined } from '@ant-design/icons';
function Trash() {
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');
  
  const handleSearch=()=>{
    setSearch(keyword);
  }
  return (
    <div>


      <Row style={{ marginBottom: "50px" }}>
        <Col lg={{ span: 24 }}>
          <div className='' style={{ display: "flex", gap: "15px" }}>
            <Input onChange={(e)=>setKeyword(e.target.value)} style={{backgroundColor : "#364153"}} size="large" placeholder="Search by name/email/date" prefix={<SearchOutlined style={{ color: "#CFCFD0" }} />} />
            <Button onClick={handleSearch} style={{ height: "50px", width: "300px", backgroundColor: "#F66D0F", color: "#fff", fontSize: "20px" }}>Search</Button>
          </div>
        </Col>
      </Row>


      <Row>
        <Col lg={{span:24}}>
          <TrashTable search={search}/>
        </Col>
      </Row>
    </div>
  )
}

export default Trash