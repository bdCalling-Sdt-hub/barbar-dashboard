/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import {
  Badge,
  Progress,
  Button,
  Form,
  Input,
  Select,
  Typography,
  Rate,
} from "antd";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import cardImg from "../../Images/Cards.png";
import img from "../../Images/image 1.png";
import styles from "./DrawerPage.module.css";
import { IoStar } from "react-icons/io5";

/* const { Title } = Typography;

const { Option } = Select; */

const DrawerPage = (props) => {
  const style = {
    cardType: {
      height: "150px",
      width: "250px",
      background: props.cardBg,
      borderRadius: "10px",
      position: "relative",
    },
    icon: {
      position: "absolute",
      bottom: "10px",
      left: "10px",
      background: "#fff",
      padding: "0 8px",
      paddingTop: "8px",
      borderRadius: "3px",
    },
    title: {
      color: "#8d8d8d",
      fontWeight: "normal",
    },
    editInput: {
      height: "45px",
    },
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>

      {props.editedCardData && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",

              paddingBottom: "30px",
            }}
          >
            <div style={style.cardType}>
              <div style={style.icon}>
                <img src={img} alt="" />
              </div>
            </div>
            <div>
              <div style={{ marginBottom: "8px" }}>
                <h4 style={style.title}>Valid Date</h4>
                <h4
                  style={{
                    fontWeight: "normal",
                  }}
                >
                  {props.editedCardData.validDate}
                </h4>
              </div>
              <div style={{ marginBottom: "8px" }}>
                <h4 style={style.title}>Card Holder</h4>
                <h4
                  style={{
                    fontWeight: "normal",
                  }}
                >
                  {props.editedCardData.cardHolder}
                </h4>
              </div>
              <div style={{ marginBottom: "8px" }}>
                <h4 style={style.title}>Card Number</h4>
                <h4
                  style={{
                    fontWeight: "normal",
                  }}
                >
                  {props.editedCardData.cardNumber}
                </h4>
              </div>
            </div>
          </div>

          <div>
            <Form onFinish={onFinish}>
              <div>
                <label style={{ color: "white" }} htmlFor="">
                  Your Name
                </label>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input
                    style={style.editInput}
                    defaultValue={props.editedCardData.cardHolder}
                  />
                </Form.Item>
              </div>
              <div>
                <label style={{ color: "white" }} htmlFor="">
                  Email
                </label>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    style={style.editInput}
                    defaultValue={"infosahinur@gmail.com"}
                  />
                </Form.Item>
              </div>
              <div>
                <label style={{ color: "white" }} htmlFor="">
                  Phone Number
                </label>
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Phone Number!",
                    },
                  ]}
                >
                  <Input
                    style={style.editInput}
                    defaultValue={"+8801788215840"}
                  />
                </Form.Item>
              </div>

              <div>
                <label style={{ color: "white" }} htmlFor="">
                  Card Number
                </label>
                <Form.Item
                  name="cardNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your card number!",
                    },
                  ]}
                >
                  <Input
                    style={style.editInput}
                    defaultValue={props.editedCardData.cardNumber}
                  />
                </Form.Item>
              </div>
              <div>
                <label style={{ color: "white" }} htmlFor="">
                  CVC
                </label>
                <Form.Item
                  name="cvc"
                  rules={[
                    {
                      required: true,
                      message: "Please input your cvc!",
                    },
                  ]}
                >
                  <Input style={style.editInput} defaultValue={548} />
                </Form.Item>
              </div>
              <div>
                <label style={{ color: "white" }} htmlFor="">
                  Expire Date
                </label>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Expire Date!",
                    },
                  ]}
                >
                  <Input
                    style={style.editInput}
                    defaultValue={props.editedCardData.validDate}
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <Button
                  style={{
                    background: "#F66D0F ",
                    color: "white",
                    width: "100%",
                    height: "45px",
                    marginTop: "40px",
                  }}
                  htmlType="submit"
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      )}

      {props.earningData && (
        <div>
          <div style={{ display: "flex", gap: "15px" }}>
            <div className={styles.appointmentMainContainer}>
              <div>
                <h3>Appointment Info</h3>
                <div className={styles.appointmentInfo}>
                  <div className={styles.appointmentInfoLeft}>
                    <p>Appointment Status :</p>
                    <p>Date & Time :</p>
                    <p>Total amount :</p>
                    <p>Barber payment :</p>
                  </div>
                  <div className={styles.appointmentInfoRight}>
                    <p>Completed</p>
                    <p>06 Sep, 2023- 4:30 PM</p>
                    <p>$120</p>
                    <p>$50</p>
                  </div>
                </div>
              </div>
              <hr />
              <div className={styles.userContainer}>
                <div>
                  <h3>User Info</h3>
                  <div className={styles.userInfo}>
                    <div>
                      {" "}
                      <img
                        src="https://i.ibb.co/x7CMg2K/Rectangle-2519.png"
                        alt=""
                      />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.userInfoLeft}>
                        <p>User name :</p>
                        <p>Contact no :</p>
                        <p>Address :</p>
                      </div>
                      <div className={styles.userInfoRight}>
                        <p>Brooklyn Simmons</p>
                        <p>(319) 555-0115</p>
                        <p>6391 Elgin St. Celina</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              position: "absolute",
              bottom: 10,
            }}
          >
            <Button
              block
              style={{
                background: "#F66D0F",
                color: "white",
                height: 50,
                width: "220px",
              }}
            >
              Download
            </Button>
            <Button
              block
              style={{
                background: "#F66D0F",
                color: "white",
                height: 50,
                width: "220px",
              }}
            >
              Print
            </Button>
          </div>
        </div>
      )}

      {props.bookingData && (
        <div>
          <div style={{ display: "flex", gap: "15px" }}>
            <div className={styles.appointmentMainContainer}>
              <div>
                <h3>Transaction Information</h3>
                <div className={styles.appointmentInfo}>
                  <div className={styles.appointmentInfoLeft}>
                    <p>Time :</p>
                    <p>Date :</p>
                    <p>Payment Method :</p>
                    <p>Payment Amount :</p>
                  </div>
                  <div className={styles.appointmentInfoRight}>
                    <p>12:00 PM</p>
                    <p>31 aug 2023</p>
                    <p>Debit Card</p>
                    <p>$ 200</p>
                  </div>
                </div>
              </div>
              <hr />
              <div className={styles.userContainer}>
                <div>
                  <h3>Client Info</h3>
                  <div className={styles.userInfo}>
                    <div>
                      {" "}
                      <img
                        src="https://i.ibb.co/x7CMg2K/Rectangle-2519.png"
                        alt=""
                      />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.userInfoLeft}>
                        <p>Client name :</p>
                        <p>Contact no :</p>
                        <p>Address :</p>
                      </div>
                      <div className={styles.userInfoRight}>
                        <p>Brooklyn Simmons</p>
                        <p>(319) 555-0115</p>
                        <p> Elgin St. Celina</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              position: "absolute",
              bottom: 10,
            }}
          >
            <Button
              block
              style={{
                background: "#F66D0F",
                color: "white",
                height: 50,
                width: "220px",
              }}
            >
              Download
            </Button>
            <Button
              block
              style={{
                background: "#F66D0F",
                color: "white",
                height: 50,
                width: "220px",
              }}
            >
              Print
            </Button>
          </div>
        </div>
      )}


      {props.providerRequestData && (
        <div>
          <div style={{ display: "flex", gap: "15px" }}>
            <div className={styles.appointmentMainContainer}>
              <div>
                <h3>Provider Information</h3>
                <div className={styles.appointmentInfo}>
                  <div className={styles.appointmentInfoLeft}>
                    <p>Business name</p>
                    <p>Provider name</p>
                    <p>Time</p>
                    <p>Date</p>
                  </div>
                  <div className={styles.appointmentInfoRight}>
                    <p>Hair Force Salon</p>
                    <p>Jane Cooper</p>
                    <p>12:00 PM</p>
                    <p>31 aug 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              position: "absolute",
              bottom: 10,
            }}
          >
            <Button
              block
              style={{
                background: "#F66D0F",
                color: "white",
                height: 50,
                width: "220px",
              }}
            >
              Cancel
            </Button>
            <Button
              block
              style={{
                background: "#F66D0F",
                color: "white",
                height: 50,
                width: "220px",
              }}
            >
              Approve
            </Button>
          </div>
        </div>
      )}


      {props.subscriptionData && (
        <div>
          <div style={{ display: "flex", gap: "15px" }}>
            <div className={styles.appointmentMainContainer}>
              <div>
                <h3>Transaction Information</h3>
                <div className={styles.appointmentInfo}>
                  <div className={styles.appointmentInfoLeft}>
                    <p>Time :</p>
                    <p>Date :</p>
                    <p>Payment Method :</p>
                    <p>Payment Amount :</p>
                  </div>
                  <div className={styles.appointmentInfoRight}>
                    <p>12:00 PM</p>
                    <p>31 aug 2023</p>
                    <p>Debit Card</p>
                    <p>$ 200</p>
                  </div>
                </div>
              </div>
              <hr />
              <div className={styles.userContainer}>
                <div>
                  <h3>Provider Info</h3>
                  <div className={styles.userInfo}>
                    <div>
                      {" "}
                      <img
                        src="https://i.ibb.co/x7CMg2K/Rectangle-2519.png"
                        alt=""
                      />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.userInfoLeft}>
                        <p>Provider name :</p>
                        <p>Contact no :</p>
                        <p>Address :</p>
                      </div>
                      <div className={styles.userInfoRight}>
                        <p>Brooklyn Simmons</p>
                        <p>(319) 555-0115</p>
                        <p> Elgin St. Celina</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              position: "absolute",
              bottom: 10,
            }}
          >
            <Button
              block
              style={{
                background: "#F66D0F",
                color: "white",
                height: 50,
                width: "220px",
              }}
            >
              Download
            </Button>
            <Button
              block
              style={{
                background: "#F66D0F",
                color: "white",
                height: 50,
                width: "220px",
              }}
            >
              Print
            </Button>
          </div>
        </div>
      )}


      {props.hostData && (
        <div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              borderBottom: "1px solid #B0B3DD",
            }}
          >
            <div>
              <img width={120} src="https://i.imgur.com/JFHjdNr.jpg" alt="" />
            </div>
            <div style={{ marginTop: "-7px" }}>
              <p style={{ fontSize: "20px" }}>{props.hostData?.name}</p>
              <p>INE: SNHRM570818MDFPM10</p>
              <p>Trip Completes: 5</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <AiFillStar color="#fba91d" />
                <span>4.8</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="">Email</label>
              <Input readOnly style={{ height: "45px" }} />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="">Phone</label>
              <Input readOnly style={{ height: "45px" }} />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="">Address</label>
              <Input readOnly style={{ height: "45px" }} />
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <h3>Payment Method</h3>
            <img width="80" style={{ margin: "10px 0" }} src={cardImg} alt="" />
            <div style={{ marginTop: "10px" }}>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="">Credit Card Number</label>
                <Input readOnly style={{ height: "45px" }} />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="">Account Number</label>
                <Input readOnly style={{ height: "45px" }} />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="">Account Holder Name</label>
                <Input readOnly style={{ height: "45px" }} />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              position: "absolute",
              bottom: 10,
            }}
          >
            <Button
              block
              style={{
                background: "#F66D0F",
                color: "white",
                height: 50,
                width: "270px",
              }}
            >
              Block
            </Button>
            <Button
              block
              style={{
                background: "#F66D0F",
                color: "white",
                height: 50,
                width: "270px",
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      )}

      {props.invoiceData && (
        <div>
          <div style={{ display: "flex", gap: "15px" }}>
            <div className={styles.appointmentMainContainer}>
              <div>
                <h3>Appointment Info</h3>
                <div className={styles.appointmentInfo}>
                  <div className={styles.appointmentInfoLeft}>
                    <p>Appointment Status :</p>
                    <p>Date & Time :</p>
                    <p>Payment Method :</p>
                    <p>Payment Amount :</p>
                  </div>
                  <div className={styles.appointmentInfoRight}>
                    <p>Completed</p>
                    <p>06 Sep, 2023- 4:30 PM</p>
                    <p>Debit Card</p>
                    <p>$ 200</p>
                  </div>
                </div>
              </div>
              <hr />
              <div className={styles.userContainer}>
                <div>
                  <h3>Client Info</h3>
                  <div className={styles.userInfo}>
                    <div>
                      {" "}
                      <img
                        src="https://i.ibb.co/x7CMg2K/Rectangle-2519.png"
                        alt=""
                      />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.userInfoLeft}>
                        <p>Client name :</p>
                        <p>Contact no :</p>
                        <p>Address :</p>
                      </div>
                      <div className={styles.userInfoRight}>
                        <p>Brooklyn Simmons</p>
                        <p>(319) 555-0115</p>
                        <p>6391 Elgin St. Celina</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className={styles.userContainer}>
                <div>
                  <h3>Provider Info</h3>
                  <div className={styles.userInfo}>
                    <div>
                      {" "}
                      <img
                        src="https://i.ibb.co/9h5XjNp/Rectangle-2519-1.png"
                        alt=""
                      />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.userInfoLeft}>
                        <p>Provider name :</p>
                        <p>Contact no :</p>
                        <p>Address :</p>
                      </div>
                      <div className={styles.userInfoRight}>
                        <p>Robert Fox</p>
                        <p>(205) 555-0100</p>
                        <p>New Jersey 45463</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              position: "absolute",
              bottom: 10,
            }}
          >
            <Button
              block
              style={{
                background: "#F66D0F",
                color: "white",
                height: 50,
                width: "220px",
              }}
            >
              Download
            </Button>
            <Button
              block
              style={{
                background: "#F66D0F",
                color: "white",
                height: 50,
                width: "220px",
              }}
            >
              Print
            </Button>
          </div>
        </div>
      )}


      {props.appointmentList && (
        <div>
          <div style={{ display: "flex", gap: "15px" }}>
            <div className={styles.appointmentMainContainer}>
              <div>
                <h3>Appointment Information</h3>
                <div className={styles.appointmentInfo}>
                  <div className={styles.appointmentInfoLeft}>
                    <p>Salon name :</p>
                    <p>Services :</p>
                    <p>Time :</p>
                    <p>Date :</p>
                    <p>Payment Method :</p>
                    <p>Payment Amount :</p>
                  </div>
                  <div className={styles.appointmentInfoRight}>
                    <p>Hair Force Salon</p>
                    <p>Haircut, Shaving</p>
                    <p>12:00 PM</p>
                    <p>31 aug 2023</p>
                    <p>Debit Card</p>
                    <p>$ 200</p>
                  </div>
                </div>
              </div>
              <hr />
              <div className={styles.userContainer}>
                <div>
                  <h3>User Info</h3>
                  <div className={styles.userInfo}>
                    <div>
                      {" "}
                      <img
                        src="https://i.ibb.co/x7CMg2K/Rectangle-2519.png"
                        alt=""
                      />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.userInfoLeft}>
                        <p>User name :</p>
                        <p>Contact no :</p>
                        <p>Address :</p>
                      </div>
                      <div className={styles.userInfoRight}>
                        <p>Brooklyn Simmons</p>
                        <p>(319) 555-0115</p>
                        <p>6391 Elgin St. Celina</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className={styles.userContainer}>
                <div>
                  <h3>Provider Info</h3>
                  <div className={styles.userInfo}>
                    <div>
                      {" "}
                      <img
                        src="https://i.ibb.co/9h5XjNp/Rectangle-2519-1.png"
                        alt=""
                      />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.userInfoLeft}>
                        <p>Provider name :</p>
                        <p>Contact no :</p>
                        <p>Address :</p>
                      </div>
                      <div className={styles.userInfoRight}>
                        <p>Robert Fox</p>
                        <p>(205) 555-0100</p>
                        <p>New Jersey 45463</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              position: "absolute",
              bottom: 10,
            }}
          >
            <Button
              block
              style={{
                background: "#F66D0F",
                color: "white",
                height: 50,
                width: "220px",
              }}
            >
              Cancel Appointment
            </Button>
            <Button
              block
              style={{
                background: "#F66D0F",
                color: "white",
                height: 50,
                width: "220px",
              }}
            >
              Print
            </Button>
          </div>
        </div>
      )}

      {props.userData && (
        <div className={styles.userContainer}>
          <div>
            <h3>User Info</h3>
            <div
              className={styles.userInfo}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                {" "}
                <img src="https://i.ibb.co/x7CMg2K/Rectangle-2519.png" alt="" />
              </div>
              <div className={styles.infoUserData}>
                <div className={styles.userInfoLeftUserData}>
                  <p>User name :</p>
                  <p>Contact no :</p>
                  <p>Address :</p>
                  <p>Services :</p>
                </div>
                <div className={styles.userInfoRightUserData}>
                  <p>{props?.userData?.name}</p>
                  <p>{props?.userData?.phone_number ? props?.userData?.phone_number : "No Data Found"}</p>
                  <p>{props?.userData?.address ? props?.userData?.address : "No Data Found"}</p>
                  <p>{props?.userData?.service ? props?.userData?.service : "No Data Found"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {props.salonData && (
        <div className={styles.userContainer}>
          <div>
            <h3>Salon Info</h3>
            <div className={styles.userInfo} style={{ display: "flex" }}>
              <div>
                {" "}
                <img src="https://i.ibb.co/x7CMg2K/Rectangle-2519.png" alt="" />
              </div>
              <div className={styles.infoUserData}>
                <div className={styles.salonInfoLeftUserData}>
                  <p>Salon name :</p>
                  <p>Contact no :</p>
                  <p>Address :</p>
                  <p>Services :</p>
                </div>
                <div className={styles.salonInfoRightUserData}>
                  <p>Apple Green</p>
                  <p>(+880) 1711 145865</p>
                  <p>6391 Elgin St. Celina</p>
                  <p>Haircut, shaving</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {props.providerData && (
        <div className={styles.userContainer}>
          <div style={{ marginBottom: "30px" }}>
            <h3>Provider Info</h3>
            <div className={styles.userInfo} style={{ display: "flex" }}>
              <div>
                {" "}
                <img src="https://i.ibb.co/x7CMg2K/Rectangle-2519.png" alt="" />
              </div>
              <div className={styles.infoUserData}>
                <div className={styles.salonInfoLeftUserData}>
                  <p>Provider name :</p>
                  <p>Contact no :</p>
                  <p>Address :</p>
                  <p>Services :</p>
                </div>
                <div className={styles.salonInfoRightUserData}>
                  <p>Apple Green</p>
                  <p>(+880) 1711 145865</p>
                  <p>6391 Elgin St. Celina</p>
                  <p>Haircut, shaving</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "30px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "50x",
              }}
            >
              <h3>Current package:</h3> <h3>Gold</h3>
            </div>
          </div>
          <div>
            <h3>Services</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              }}
            >
              {[1, 2, 3, 4, 5].map((item, index) => (
                <div key={index}>
                  <div
                    style={{
                      padding: "10px",
                      border: "1px solid #F66D0F",
                      width: "190px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <img
                      style={{ width: "155px" }}
                      src="https://i.ibb.co/xz27ZPN/Rectangle-2059.png"
                      alt=""
                    />
                    <p
                      style={{
                        textAlign: "center",
                        marginTop: "10px",
                        color: "#F66D0F",
                      }}
                    >
                      Spa
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 60,
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
              bottom: 10,
            }}
          >
            <Button
              block
              style={{
                background: "#F66D0F",
                color: "white",
                height: 50,
                width: "370px",
              }}
            >
              Cancel Appointment
            </Button>
            <Button
              block
              style={{
                background: "#F66D0F",
                color: "white",
                height: 50,
                width: "370px",
              }}
            >
              Print
            </Button>
          </div>
        </div>
      )}
      {props.reviewsData && (
        <div className={styles.userContainer}>
          <div style={{ marginBottom: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <p>5</p>
                  <IoStar color="#F66D0F" />
                  <Progress
                    percent={50}
                    // size={["100%", 20]}
                    style={{ width: "300px", marginTop: "7px" }}
                    showInfo={false}
                    strokeColor={"#F66D0F"}
                  />
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <p>4</p>
                  <IoStar color="#F66D0F" />
                  <Progress
                    percent={40}
                    // size={["100%", 20]}
                    style={{ width: "300px", marginTop: "7px" }}
                    showInfo={false}
                    strokeColor={"#F66D0F"}
                  />
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <p>3</p>
                  <IoStar color="#F66D0F" />
                  <Progress
                    percent={30}
                    // size={["100%", 20]}
                    style={{ width: "300px", marginTop: "7px" }}
                    showInfo={false}
                    strokeColor={"#F66D0F"}
                  />
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <p>2</p>
                  <IoStar color="#F66D0F" />
                  <Progress
                    percent={20}
                    // size={["100%", 20]}
                    style={{ width: "300px", marginTop: "7px" }}
                    showInfo={false}
                    strokeColor={"#F66D0F"}
                  />
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <p>1</p>
                  <IoStar color="#F66D0F" />
                  <Progress
                    percent={10}
                    // size={["100%", 20]}
                    style={{ width: "300px", marginTop: "7px" }}
                    showInfo={false}
                    strokeColor={"#F66D0F"}
                  />
                </div>
              </div>
              <div style={{ marginTop: "50px" }}>
                <h1 style={{ fontSize: "36px", textAlign: "right" }}>4.2</h1>
                <Rate
                  style={{ color: "#F66D0F" }}
                  disabled
                  defaultValue={4.5}
                />
                <p
                  style={{
                    fontSize: "14px",
                    textAlign: "right",
                    marginTop: "5px",
                  }}
                >
                  52 Reviews
                </p>
              </div>
            </div>
            <div>
              <div style={{ marginTop: "50px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <img
                    style={{ borderRadius: "100%" }}
                    src="https://i.ibb.co/dLsxtGJ/logo-3.png"
                    alt=""
                  />
                  <div>
                    <p>Courtney Henry</p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <Rate
                        style={{ color: "#F66D0F" }}
                        disabled
                        defaultValue={4.5}
                      />
                      <p>2 mins ago</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p style={{ padding: "20px 0px" }}>
                    Consequat velit qui adipisicing sunt do rependerit ad
                    laborum tempor ullamco exercitation. Ullamco tempor
                    adipisicing et voluptate duis sit esse aliqua
                  </p>
                  <p
                    style={{
                      color: "#FC4400",
                      cursor: "pointer",
                      marginBottom: "10px",
                    }}
                  >
                    Delete Review
                  </p>
                </div>
              </div>
              <hr />
              <div style={{ marginTop: "50px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <img
                    style={{ borderRadius: "100%" }}
                    src="https://i.ibb.co/dLsxtGJ/logo-3.png"
                    alt=""
                  />
                  <div>
                    <p>Courtney Henry</p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <Rate
                        style={{ color: "#F66D0F" }}
                        disabled
                        defaultValue={4.5}
                      />
                      <p>2 mins ago</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p style={{ padding: "20px 0px" }}>
                    Consequat velit qui adipisicing sunt do rependerit ad
                    laborum tempor ullamco exercitation. Ullamco tempor
                    adipisicing et voluptate duis sit esse aliqua
                  </p>
                  <p
                    style={{
                      color: "#FC4400",
                      cursor: "pointer",
                      marginBottom: "10px",
                    }}
                  >
                    Delete Review
                  </p>
                </div>
              </div>
              <hr />
              <div style={{ marginTop: "50px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <img
                    style={{ borderRadius: "100%" }}
                    src="https://i.ibb.co/dLsxtGJ/logo-3.png"
                    alt=""
                  />
                  <div>
                    <p>Courtney Henry</p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <Rate
                        style={{ color: "#F66D0F" }}
                        disabled
                        defaultValue={4.5}
                      />
                      <p>2 mins ago</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p style={{ padding: "20px 0px" }}>
                    Consequat velit qui adipisicing sunt do rependerit ad
                    laborum tempor ullamco exercitation. Ullamco tempor
                    adipisicing et voluptate duis sit esse aliqua
                  </p>
                  <p
                    style={{
                      color: "#FC4400",
                      cursor: "pointer",
                      marginBottom: "10px",
                    }}
                  >
                    Delete Review
                  </p>
                </div>
              </div>
        
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DrawerPage;
