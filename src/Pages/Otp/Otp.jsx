import { Button, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import logo from "../../Images/Logo.png";
import style from "./Otp.module.css";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { baseURL } from "../../Config";
import OTPInput from "react-otp-input";

const { Title, Paragraph, Text, Link } = Typography;

const Otp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const onFinish = async(values) => {
    const response = await baseURL.post(`/verified`, {email: localStorage.getItem('email'), otp: otp}, {
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
        navigate("/update-password")
      })
    }
  };

  const handleResend=async()=>{
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
      })
    }
  }
  return (
    <div className={style.otpContainer}>
      <div>
        <img src={logo} alt="" />
      </div>
      <div className={style.formContainer}>
        <Title
          onClick={() => navigate("/forget-password")}
          level={2}
          style={{
            color: "#0E1116",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <MdArrowBackIosNew />
          OTP
        </Title>
        <Paragraph style={{ marginBottom: "30px" }}>
          Please enter the OTP we have sent you in your email.
        </Paragraph>

        <Form onFinish={onFinish}>
          <div className={style.formImage}>
            <img src="https://i.ibb.co/89tdtzR/Icon-1.png" alt="" />
          </div>
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

          <div style={{marginTop: "12px"}} className={style.rememberAndPass}>
            <Text>Don't received code?</Text>

            <p
              style={{ color: "#F66D0F", cursor: "pointer" }}
              onClick={handleResend}
            >
              Resend
            </p>
          </div>

          <Form.Item>
            <Button
              // onClick={() => navigate("/update-password")}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              style={{
                height: "45px",
                fontWeight: "400px",
                fontSize: "18px",
                background: "#F66D0F",
                alignSelf: "bottom",
                marginTop: "20px",
              }}
            >
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Otp;
