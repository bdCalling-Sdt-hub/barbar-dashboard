import { Button, Col, Input, Pagination, Row } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./Appointment.module.css";
import img from "../../../Images/Photo.png";

function AppointmentReq() {
  const style = {
    cardStyle: {
      background: "#364153",
      padding: "15px",
      textAlign: "center",
      borderRadius: "10px",
    },
    cardBtn: {
      color: "white",
    },
  };
  const items = [
    [
      {
        id: 1,
        name: "Fahim",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 2,
        name: "Kate",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 3,
        name: "Berlin",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 4,
        name: "Tokyo",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 5,
        name: "Nairobi",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 6,
        name: "Denver",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 7,
        name: "Hulk",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 8,
        name: "Harry",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 9,
        name: "Jack",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 10,
        name: "Sparrow",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 11,
        name: "Professor",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 12,
        name: "M",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
    ],
  ];
  return (
    <div>
      <Row style={{ marginBottom: "50px" }}>
        <h2 className={styles.h2Design}>Appointment Request</h2>
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

      <div style={{ borderRadius: "10px" }}>
        <Row gutter={[16, 16]}>
          {[...Array(12).keys()].map((item) => {
            return (
              <>
                <Col span={6}>
                  <div style={style.cardStyle}>
                    <img src="https://i.ibb.co/xz0KcbZ/Photo.png" alt="" />
                    <h2 style={{ color: "#F66D0F", marginBottom: "5px" }}>
                      Jane Cooper
                    </h2>
                    <p style={{ padding: "15px 0px" }}>jane@gmail.com</p>
                    <div>
                      <button
                        className={style.cardBtn}
                        style={{
                          background: "transparent",
                          border: "1px solid #F66D0F",
                          padding: "10px 10px",
                          ...style.cardBtn,
                          marginRight: "10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        style={{
                          background: "#F66D0F",
                          ...style.cardBtn,
                          border: "1px solid #F66D0F",
                          padding: "10px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                </Col>
              </>
            );
          })}
        </Row>
        <Row
          style={{
            background: "#364153",
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          <Col lg={{ span: 12 }} style={{ marginBottom: "20px" }}>
            <h1
              style={{
                fontSize: "20px",
                color: "#F66D0F",
                marginTop: "18px",
                paddingLeft: "10px",
              }}
            >
              Showing 1-10 OF 250
            </h1>
          </Col>
          <Col lg={{ span: 8, offset: 4 }}>
            <Pagination
              defaultCurrent={1}
              total={5000}
              showQuickJumper={false}
              showSizeChanger={false}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AppointmentReq;
