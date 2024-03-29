import { Button, Form, Input, Modal, Switch, Typography } from "antd";
import React, { useState } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { baseURL } from "../../../Config";
import { IoMailOpenOutline } from "react-icons/io5";
const { Paragraph, Title, Text } = Typography;
import OTPInput from "react-otp-input";

const Setting = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openChangePassModel, setOpenChangePassModel] = useState(false);
  const [verify, setVerify] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [percent, setPercent] = useState();
  const style = {
    formContainer: {
      // background: "white",
      // padding: "30px",
      borderRadius: "10px",
    },
    btn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "45px",
      marginBottom: "10px",
      backgroundColor: "#364153 !important",
    },
    notification: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "45px",
      marginTop: "10px",
      backgroundColor: "#364153",
      boxShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
      borderRadius: "6px",
      padding: "4px 15px",
      marginBottom: "15px",
    },
    option: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "45px",
      marginTop: "10px",
      backgroundColor: "#364153",
      boxShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
      borderRadius: "6px",
      padding: "4px 15px",
      marginBottom: "15px",
      cursor: "pointer",
    },
    input: {
      height: "45px"
    },
    otpInput: {
      width: "50px",
      height: "70px",
    },
    // btn:{
    //   backgroundColor:"#364153 !important",
    // }
  };
  const menuItems = [
    {
      key: "1",
      title: "Booking Percentage",
      link: "booking-percentage",
    },
    {
      key: "2",
      title: "Change Password",
      link: "change-password",
    },
    {
      key: "3",
      title: "Login Activity",
      link: "login-activity",
    },
    {
      key: "4",
      title: "Block List",
      link: "block-list",
    },
    {
      key: "5",
      title: "Reviews",
      link: "reviews",
    },
    {
      key: "6",
      title: "Trash",
      link: "trash",
    },
    {
      key: "7",
      title: "Privacy Policy",
      link: "privacy-policy",
    },
    {
      key: "8",
      title: "Terms and Condition",
      link: "terms-condition",
    },
    {
      key: "9",
      title: "About Us",
      link: "about-us",
    },
  ];

  const [err, setErr] = useState("");


  const handleNavigate = (value) => {
    if (value == "booking-percentage") {
      setOpenModal(true);
    } else if (value === "change-password") {
      setOpenChangePassModel(true);
    } else {
      navigate(`/setting/${value}`);
    }
  };

  const handleNotification = (e) => {
  };
  const handleSubscription = (e) => {
  };


  const handleChangePassword = async(values) => {
    const formData = new FormData();
    formData.append("current_password", values.currentPassword);
    formData.append("password", values.newPassword);
    formData.append("password_confirmation", values.password);

    try{
      const response = await baseURL.post(`/change-password`, formData, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      if(response?.status=== 200){
        Swal.fire({
          position: "center",
          icon: "success",
          title: response?.data?.message,
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          setOpenChangePassModel(false);
        })
      }
    }catch (error){
      if(error.response.status === 422){
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    }

  };

  const handleForgotPassword=async()=>{
    localStorage.setItem('email', email);
    const response = await baseURL.post(`/resendOtp`, {email: email}, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
    });
    if(response?.status === 200){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Send Otp Successfully",
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        setVerify(true)
        setOpenForgotPasswordModal(false)
      })
    }

  }

  const sendEmail=async()=>{
    const response = await baseURL.post(`/resendOtp`, {email: localStorage.getItem('email')}, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
    });
    if(response?.status === 200){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Send Otp Successfully",
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        setVerify(true)
        setOpenForgotPasswordModal(false)
      })
    }
  }

  const handleVerify=async()=>{
    const response = await baseURL.post(`/verified`, {email: email, otp: otp}, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
    });
    if(response?.status === 200){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Verify OTP",
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        setUpdatePassword(true);
        setVerify(false);
      })
    }
  }

  const handleUpdatePassword=async(values)=>{
    const formData = new FormData();
    formData.append("password", values.password);
    formData.append("password_confirmation", values.confirmPassword);

    const response = await baseURL.post(`/reset-password`, formData, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
    });
    if(response?.status === 200){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Password Update Successfully",
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        setUpdatePassword(false);
      })
    }
  }

  const handleBookingPercentage=async()=>{
    if(percent){
      const response = await baseURL.post(`/booking-percentage-set`, {percentage: percent}, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      if(response?.status === 200){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Set Booking Percentage Successfully",
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          setOpenModal(false);
        })
      }
    }else{
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Input Percentage Required",
        showConfirmButton: false,
        timer: 1500
      })
    }
    
  }
  return (
    <div>
      <h2 style={{ marginBottom: "20px", fontWeight: "normal" }}>Settings</h2>
      <div style={style.formContainer}>
        <div style={style.notification}>
          <span>Notification</span>
          <Switch
            onChange={(e) => handleNotification(e)}
            checkedChildren="ON"
            unCheckedChildren="OFF"
            defaultChecked
          />
        </div>
        <div style={style.notification}>
          <span>Subscription</span>
          <Switch
            onChange={(e) => handleSubscription(e)}
            checkedChildren="ON"
            unCheckedChildren="OFF"
            defaultChecked
          />
        </div>
        {menuItems.map((item) => (
          <div
            key={item.key}
            onClick={() => handleNavigate(item.link)}
            style={style.option}
          >
            <span>{item.title}</span>
            <LiaAngleRightSolid fontSize={20} />
          </div>
        ))}

        {/* Booking Percentage*/}
        <Modal
          title={<p style={{ marginBottom: "30px" }}>Booking Percentage</p>}
          centered
          open={openModal}
          onCancel={() => setOpenModal(false)}
          width={500}
          footer={[]}
        >
          <Form>
            <p>Set your percentage from clients booking.</p>
            <div style={{background:"#F66D0F", marginTop: "20px", display:"flex",margin:"0 auto", padding:"20px",justifyContent:"center",height:"100px", width:"100px",borderRadius:"100%"}} >
              <img   src="https://i.ibb.co/ZzSj8rj/percent-1-traced.png" alt="" />
            </div>

            <div>
              <label style={{display: "block", marginBottom: "12px"}} htmlFor="" className={style.label}>
                Set your percentage
              </label>
              <Form.Item style={{marginBottom: "0"}} name="currentPassword">
                <Input
                  placeholder="Enter Percentage"
                  type="Text"
                  onChange={(e)=>setPercent(e.target.value)}
                  style={style.input}
                />
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                onClick={handleBookingPercentage}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                style={{
                  height: "45px",
                  fontWeight: "400px",
                  fontSize: "18px",
                  background: "#F66D0F",
                  marginTop: "30px",
                }}
              >
                Set
              </Button>
            </Form.Item>
          </Form>
        </Modal>



        {/* change password*/}
        <Modal
          title={<p style={{ marginBottom: "30px" }}>Change password</p>}
          centered
          open={openChangePassModel}
          onCancel={() => setOpenChangePassModel(false)}
          width={500}
          footer={[]}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleChangePassword}
          >
            <div>
              <label htmlFor="" className={style.label}>
                Current Password
              </label>
              <Form.Item
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter Password"
                  type="password"
                  style={style.input}
                />
              </Form.Item>
            </div>

            <div>
              <label htmlFor="">New Password</label>
              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new Password!",
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder="Enter password"
                  style={style.input}
                />
              </Form.Item>
            </div>
            <div>
              <label htmlFor="email" className={style.label}>
                Re-Type Password
              </label>
              <Form.Item
                
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Re-type Password!",
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder="Enter password"
                  style={style.input}
                />
              </Form.Item>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="text"
                className="login-form-forgot"
                style={{ color: "#F66D0F" }}
                onClick={() => (setOpenChangePassModel(false), setOpenForgotPasswordModal(true))}
              >
                Forgot password
              </Button>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                style={{
                  height: "45px",
                  fontWeight: "400px",
                  fontSize: "18px",
                  background: "#F66D0F",
                  marginTop: "60px",
                }}
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        
        {/* Forgot Password */}
        <Modal
          title={
            <Title
              level={2}
              style={{
                color: "#F66D0F",
                fontWeight: "normal",
                marginBottom: "30px",
                textShadow: "#bfbfbf 2px 2px 4px",
              }}
            >
              Forgot Password
            </Title>
          }
          centered
          open={openForgotPasswordModal}
          onCancel={() => {
            setOpenForgotPasswordModal(false);
          }}
          width={500}
          footer={[]}
        >
          <div>
            <Paragraph style={{ marginBottom: "30px" }}>
              Please enter your email address for recover your password.
            </Paragraph>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <div style={{
                width: "100px",
                height: "100px",
                borderRadius: "100%",
                backgroundColor: "#F66D0F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <IoMailOpenOutline size={65} color="white"/>
              </div>
            </div>

            <div>
              <div style={{marginBottom: "12px"}}>
                <label htmlFor="">Email</label>
              </div>
              <Input
                onChange={(e)=>setEmail(e.target.value)}
                  type="text"
                  placeholder="Enter Email"
                  style={style.input}
                />
            </div>

            <Button
              block
              onClick={handleForgotPassword}
              style={{
                height: "45px",
                fontWeight: "400px",
                fontSize: "18px",
                background: "#F66D0F",
                color: "#fff",
                alignSelf: "bottom",
                marginTop: "20px"
              }}
            >
              Continue
            </Button>
          </div>
        </Modal>

        {/* Verify OTP */}
        <Modal
          title={
            <Title
              level={2}
              style={{
                color: "#F66D0F",
                fontWeight: "normal",
                marginBottom: "30px",
                textShadow: "#bfbfbf 2px 2px 4px",
              }}
            >
              Verify OTP
            </Title>
          }
          centered
          open={verify}
          onCancel={() => {
            setVerify(false);
          }}
          width={500}
          footer={[]}
        >
          <div>
            <Paragraph style={{ marginBottom: "30px" }}>
              We'll send a verification code to your email. Check your inbox and
              enter the code here.
            </Paragraph>

            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputStyle={{
                height: "64px",
                width: "55px",
                borderRadius: "8px",
                marginRight: "16px",
                fontSize: "20px",
                border: "1px solid #F66D0F",
                color: "#2B2A2A",
                outline: "none"
              }}
              renderInput={(props) => <input {...props} />}
            />

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
              <Text>Don't received code?</Text>

              <div
                onClick={sendEmail}
                style={{ color: "#F66D0F", cursor: "pointer" }}
              >
                Resend
              </div>
            </div>

            <Button
              block
              onClick={handleVerify}
              style={{
                height: "45px",
                fontWeight: "400px",
                fontSize: "18px",
                background: "#F66D0F",
                color: "#fff",
                alignSelf: "bottom",
                marginTop: "30px",
              }}
            >
              Continue
            </Button>
          </div>
        </Modal>


        {/* Update Password */}
        <Modal
          title={
            <Title
              level={2}
              style={{
                color: "black",
                fontWeight: "normal",
                marginBottom: "30px",
                textShadow: "#bfbfbf 2px 2px 4px",
              }}
            >
              Set New Password
            </Title>
          }
          centered
          open={updatePassword}
          onCancel={() => {
            setUpdatePassword(false);
          }}
          width={500}
          footer={[]}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleUpdatePassword}
          >
            <div>
              <p style={{marginBottom: "20px"}}>Your password must be 8-10 characters.</p>
            </div>
            <div>
              <div style={{marginBottom : "12px"}}>
              <label htmlFor="">New Password</label>
              </div>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter new password!",
                  },
                ]}
              >
                <Input.Password type="text" placeholder="Password" style={style.input} />
              </Form.Item>
            </div>

            <div>
            <div style={{marginBottom : "12px"}}>
              <label htmlFor="">Re-type Password</label>
            </div>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter confirm Password!",
                  },
                ]}
              >
                <Input.Password
                  type="text"
                  placeholder="Confirm password"
                  style={style.input}
                />
              </Form.Item>
            </div>

            {/* showing error */}
            <label style={{ color: "red" }}>{err}</label>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                style={{
                  height: "45px",
                  fontWeight: "400px",
                  fontSize: "18px",
                  background: "#F66D0F",
                  marginTop: "30px",
                }}
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Setting;
