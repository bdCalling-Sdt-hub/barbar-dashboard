import { Col, Divider, Pagination, Row } from "antd";
import React from "react";
import "./Notification.css";

function Notification() {
  return (
    <div>
      <Row>
        <h2 style={{ fontSize: "30px", marginBottom: "30px" }}>
          All Notifications
        </h2>

        {[...Array(5).keys()].map((_, index) => {
          return (
            <Col lg={{ span: 24 }}>
              <div
                className="single-notification"
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #535770",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <div className="user-image" style={{ marginRight: "50px" }}>
                  <img
                    style={{
                      height: "70px",
                      width: "70px",
                      borderRadius: "100%",
                      border: "2px solid gray",
                    }}
                    src="https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg"
                  />
                </div>
                <div className="">
                  <p>
                    <span>Sanchez haro manuel</span> start a new trip at 5pm.
                    Trip No.56. Trip started from Mexico city.....
                  </p>
                  <p style={{ color: "gray", marginTop: "10px" }}>1hr ago</p>
                </div>
              </div>

              <Divider />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Notification;
