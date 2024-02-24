import React from 'react'
import TrashTable from './TrashTable'
import { Col, Row } from "antd";

function Trash() {
  return (
    <div>
      <Row>
        <Col lg={{span:24}}>
          <TrashTable/>
        </Col>
      </Row>
    </div>
  )
}

export default Trash