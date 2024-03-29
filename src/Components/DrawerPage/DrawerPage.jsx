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
  Modal
} from "antd";
import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import cardImg from "../../Images/Cards.png";
import img from "../../Images/image 1.png";
import styles from "./DrawerPage.module.css";
import { IoStar } from "react-icons/io5";
import moment from "moment";
import { baseURL, url } from "../../Config";
import { HiTrash } from "react-icons/hi2";
import Swal from "sweetalert2"

const DrawerPage = (props) => {
  const [open, setOpen] = useState(false);
  const [id, setID] = useState(false);
  const { handleApprove, handleCancel, handlePrint, setRefresh, handleBlock, handleBlockProvider } = props;
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

  const handleReviewDelete=(id)=>{
    setOpen(true);
    setID(id);
  }

  const handleDelete=async()=>{
    const response = await baseURL.get(`/deleteRating/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
    });
    if(response?.status === 200){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Delete Review Successfully",
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        setRefresh("done")
        setOpen(false)
      })
    }
  }
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
          <div ref={props?.componentRef} style={{ display: "flex", gap: "15px" }}>
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
                        src={`${url}/${props?.bookingData?.user?.image}`}
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
          <div ref={props?.componentRef} style={{ display: "flex", gap: "15px" }}>
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
                    <p>{props.bookingData?.name}</p>
                    <p>{moment(props.bookingData?.created_at).format('LL')}</p>
                    <p>{props.bookingData?.payment_type}</p>
                    <p>$ {props.bookingData?.amount}</p>
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
                        src={`${url}/${props?.bookingData?.user?.image}`}
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
                        <p>$ {props.bookingData?.user?.address}</p>
                        <p>$ {props.bookingData?.user?.phone_number}</p>
                        <p>$ {props.bookingData?.user?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              position: "absolute",
              bottom: 30,
              left: 0,
              paddingLeft: "20px",
              paddingRight: "20px"
            }}
          >
            <button
              onClick={handlePrint}
              style={{
                width: "100%",
                background: "#F66D0F",
                color: "white",
                height: 50,
                cursor: "pointer",
                border: "none",
                borderRadius:"8px"
              }}
            >
              Print
            </button>
          </div>
        </div>
      )}


      {props.providerRequestData && (
        <div>
          <div ref={props?.componentRef} style={{ display: "flex", gap: "15px" }}>
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
                    <p>{props.providerRequestData?.name}</p>
                    <p>{moment(props?.providerRequestData?.created_at).format('LT')}</p>
                    <p>{moment(props?.providerRequestData?.created_at).format('L')}</p>
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
              onClick={()=>handleCancel(props.providerRequestData?.id)}
              block
              style={{
                border: "1px solid #F66D0F",
                color: "white",
                backgroundColor: "transparent",
                height: 50,
                width: "220px",
              }}
            >
              Cancel
            </Button>
            <Button
              block
              onClick={()=>handleApprove(props.providerRequestData?.id)}
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
          <div ref={props?.componentRef} style={{ display: "flex", gap: "15px" }}>
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
                    <p>{moment(props.subscriptionData?.created_at).format('L')}</p>
                    <p>{moment(props.subscriptionData?.created_at).format('LT')}</p>
                    <p>{props.subscriptionData?.payment_type}</p>
                    <p>${props.subscriptionData?.amount}</p>
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
                        src={`${url}/${props?.subscriptionData?.user?.image}`}
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
                        <p>{props.subscriptionData?.user?.name}</p>
                        <p>{props.subscriptionData?.user?.phone_number}</p>
                        <p>{props.subscriptionData?.user?.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              position: "absolute",
              bottom: 30,
              left: 0,
              paddingLeft: "20px",
              paddingRight: "20px"
            }}
          >
            <button
              onClick={handlePrint}
              style={{
                width: "100%",
                background: "#F66D0F",
                color: "white",
                height: 50,
                cursor: "pointer",
                border: "none",
                borderRadius:"8px"
              }}
            >
              Print
            </button>
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
        <div >
          <div ref={props?.componentRef} style={{ display: "flex", gap: "15px" }}>
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
                    <p>
                      {props.invoiceData?.status === 0 && "Pending"}
                      {props.invoiceData?.status === 2 && "Complete"}
                      {props.invoiceData?.status === 4 && "Cancel"}
                    </p>
                    <p>{moment(props.invoiceData?.created_at).format('LLL')}</p>
                    <p> {props?.invoiceData?.payment_type ? props?.invoiceData?.payment_type : "Not Found"}</p>
                    <p>$ {props?.invoiceData?.price}</p>
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
                        src={`${url}/${props?.invoiceData?.user?.image}`}
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
                        <p>{props?.invoiceData?.user?.name}</p>
                        <p>{props?.invoiceData?.user?.phone_number}</p>
                        <p>{props?.invoiceData?.user?.address}</p>
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
                        src={`${url}/images/${props?.invoiceData?.provider?.cover_photo}`}
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
                        <p>{props?.invoiceData?.provider?.business_name}</p>
                        <p>{props?.invoiceData?.provider?.phone_number ? props?.invoiceData?.provider?.phone_number : "Not Found"}</p>
                        <p>{props?.invoiceData?.provider?.address ? props?.invoiceData?.provider?.address : "Not Found"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              position: "absolute",
              bottom: 30,
              left: 0,
              paddingLeft: "20px",
              paddingRight: "20px"
            }}
          >
            <button
              onClick={handlePrint}
              style={{
                width: "100%",
                background: "#F66D0F",
                color: "white",
                height: 50,
                
                border: "none",
                borderRadius:"8px"
              }}
            >
              Print
            </button>
          </div>
        </div>
      )}


      {props.appointmentList && (
        <div>
          <div  ref={props?.componentRef} style={{ display: "flex", gap: "15px" }}>
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
                    <p>{props?.appointmentList?.provider?.business_name}</p>
                    <p>Haircut, Shaving</p>
                    <p>{props?.appointmentList?.time}</p>
                    <p>{moment(props?.appointmentList?.date).format('ll')}</p>
                    <p> {props?.appointmentList?.payment_type ? props?.appointmentList?.payment_type : "Not Found"}</p>
                    <p>$ {props?.appointmentList?.price}</p>
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
                        src={`${url}/${props?.appointmentList?.user?.image}`}
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
                        <p>{props?.appointmentList?.user?.name}</p>
                        <p>{props?.appointmentList?.user?.phone_number}</p>
                        <p>{props?.appointmentList?.user?.address}</p>
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
                        src={`${url}/images/${props?.appointmentList?.provider?.cover_photo}`}
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
                        <p>{props?.appointmentList?.provider?.business_name}</p>
                        <p>{props?.appointmentList?.provider?.phone_number ? props?.appointmentList?.provider?.phone_number : "(205) 555-0100"}</p>
                        <p>{props?.appointmentList?.provider?.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              position: "absolute",
              bottom: 30,
              display: "flex",
              gap: 20,
              left: 0,
              paddingLeft: "20px",
              paddingRight: "20px"
            }}
          >
            <button
              onClick={()=>handleCancel(props?.appointmentList?.id)}
              style={{
                width: "100%",
                background: "transparent",
                color: "white",
                height: 50,
                cursor: "pointer",
                borderRadius:"8px",
                border: "1px solid #F66D0F"
              }}
            >
              Cancel Appoinments
            </button>

            <button
              onClick={handlePrint}
              style={{
                width: "100%",
                background: "#F66D0F",
                color: "white",
                height: 50,
                cursor: "pointer",
                border: "none",
                borderRadius:"8px"
              }}
            >
              Print
            </button>
          </div>
        </div>
      )}

      {props.userData && (
        <div className={styles.userContainer}>
          <div ref={props?.componentRef}>
            <h3 >User Info</h3>
            <div
              className={styles.userInfo}
              style={{ display: "flex", justifyContent: "space-between", }}
            >
              <div style={{marginTop : "30px" }}>
                {" "}
                <img src={`${url}/${props?.userData?.image}`} alt="" />
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

          <div
            style={{
              width: "100%",
              position: "absolute",
              bottom: 30,
              left: 0,
              paddingLeft: "20px",
              paddingRight: "20px",
              display: "flex",
              alignItems: "center",
              gap: "30px"
            }}
          >

            <button
              onClick={()=>handleBlock(props?.userData?.id)}
              style={{
                width: "100%",
                background: "transparent",
                border: "1px solid #F66D0F",
                color: "white",
                height: 50,
                cursor: "pointer",
                borderRadius:"8px"
              }}
            >
              Block
            </button>


            <button
              onClick={handlePrint}
              style={{
                width: "100%",
                background: "#F66D0F",
                color: "white",
                height: 50,
                cursor: "pointer",
                border: "none",
                borderRadius:"8px"
              }}
            >
              Print
            </button>
          </div>
        </div>
      )}


      {props.salonData && (
        <div className={styles.userContainer}>
          <div ref={props?.componentRef}>
            <h3 >Salon Info</h3>
            <div className={styles.userInfo} style={{ display: "flex", marginTop: "12px" }}>
              <div>
                {" "}
                <img 
                  src={`${url}/images/${props?.salonData?.cover_photo}`}
                  alt="" 
                />
              </div>
              <div className={styles.infoUserData}>
                <div className={styles.salonInfoLeftUserData}>
                  <p>Salon name :</p>
                  <p>Contact no :</p>
                  <p>Address :</p>
                  <p>Services :</p>
                </div>
                <div className={styles.salonInfoRightUserData}>
                  <p>{props?.salonData?.business_name}</p>
                  <p> {props?.salonData?.contact_number ? props?.salonData?.contact_number : "(+880) 1711 145865"}</p>
                  <p>{props?.salonData?.address}</p>
                  <p>{props?.salonData?.service ? props?.salonData?.service : "Haircut, shaving"}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              position: "absolute",
              bottom: 30,
              left: 0,
              paddingLeft: "20px",
              paddingRight: "20px"
            }}
          >
            <button
              onClick={handlePrint}
              style={{
                width: "100%",
                background: "#F66D0F",
                color: "white",
                height: 50,
                cursor: "pointer",
                border: "none",
                borderRadius:"8px"
              }}
            >
              Print
            </button>
          </div>

        </div>
      )}

      {props.providerData && (
        <div className={styles.userContainer}>
          <div ref={props?.componentRef} style={{ marginBottom: "30px" }}>
            <h3>Provider Info</h3>
            <div className={styles.userInfo} style={{ display: "flex" }}>
              <div>
                {" "}
                <img src={`${url}/images/${props.providerData?.cover_photo}`} alt="" />
              </div>
              <div className={styles.infoUserData}>
                <div className={styles.salonInfoLeftUserData}>
                  <p>Provider name :</p>
                  <p>Salon name :</p>
                  <p>Contact no :</p>
                  <p>Address :</p>
                </div>
                <div className={styles.salonInfoRightUserData}>
                  <p>{props.providerData?.user?.name}</p>
                  <p>{props.providerData?.business_name}</p>
                  <p>{props.providerData?.user?.phone_number ? props.providerData?.user?.phone_number : "Not Found"}</p>
                  <p>{props.providerData?.address}</p>
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
              <h3>Current package:</h3> <h3>{props.providerData?.package[0]?.package?.package_name}</h3>
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
              {props?.providerData?.service?.map((item, index) => (
                <div key={index} >
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
                      style={{ width: "155px", height:"105px" }}
                      src={`${url}/images/${item?.gallary_photo[0]}`}
                      alt=""
                    />
                    <p
                      style={{
                        textAlign: "center",
                        marginTop: "10px",
                        color: "#F66D0F",
                      }}
                    >
                      {item?.service_name}
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
            <button
              onClick={()=>handleBlockProvider(props?.providerData?.user_id)}
              style={{
                background: "transparent",
                color: "white",
                height: 50,
                width: "370px",
                border: "1px solid #F66D0F",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Block
            </button>
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
          <div ref={props?.componentRef} style={{ marginBottom: "30px" }}>
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
                <h1 style={{ fontSize: "36px", textAlign: "right" }}>{props.reviewsData?.average_rating.toFixed(2)}</h1>
                <Rate
                  style={{ color: "#F66D0F" }}
                  disabled
                  defaultValue={props.reviewsData?.total_review}
                />
                <p
                  style={{
                    fontSize: "14px",
                    textAlign: "right",
                    marginTop: "5px",
                  }}
                >
                  {props.reviewsData?.total_review} Reviews
                </p>
              </div>
            </div>

            <div>
              {
                props?.reviewsData?.service_details_with_user?.map((review)=>
                
                  <div style={{ marginTop: "50px",  }}>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <img
                        style={{ borderRadius: "100%", width:"50px", height:"50px" }}
                        src={`${url}/${review?.user?.image}`}
                        alt=""
                      />
                      <div>
                        <p>{review?.user?.name}</p>
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
                          <p>{moment(review?.created_at).startOf('hour').fromNow()}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p style={{ padding: "20px 0px" }}>
                        {review?.review}
                      </p>
                      <p
                        onClick={()=>(handleReviewDelete(review?.id)) }
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
                )



              }
              
        
            </div>
          </div>
        </div>
      )}

      {
        <Modal
          title={false}
          centered
          open={open}
          onCancel={() => setOpen(false)}
          width={510}
          footer={[]}
          
        >
          <div style={{
            backgroundColor : "#FC4400",
            width:"135px",
            height:"135px",
            borderRadius:"100%",
            display: "flex",
            alignItems: "center",
            justifyContent:"center",
            margin: "auto"
          }}>
            <HiTrash size={68} color="#FFFFFF" />
          </div>
          <h4 style={{marginBottom: "30px", fontSize:"24px", marginTop: "30px"}}>You sure want to delete this review?</h4>
          <div style={{display: "flex", gap: "20px"}}>
            <button 
              onClick={handleDelete}
              style={{
                width: "100%",
                height: "52px",
                backgroundColor: "#F66D0F",
                color: "white",
                fontSize: "18px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",

              }}
            >Yes</button>
            <button 
              onClick={()=>setOpen(false)}
              style={{
                width: "100%",
                height: "52px",
                cursor: "pointer",
                backgroundColor: "transparent",
                color: "#F66D0F",
                fontSize: "18px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "1px solid #F66D0F"
              }}
            >No</button>
          </div>
        </Modal>
      }
    </>
  );
};

export default DrawerPage;
