
import React from 'react'
import { Col, Row } from "antd";
import ReviewsTable from './ReviewsTable';

function Reviews() {
  return (
    <div>
      <Row>
        <Col lg={{span:24}}>
          <ReviewsTable/>
        </Col>
      </Row>
    </div>
  )
}

export default Reviews