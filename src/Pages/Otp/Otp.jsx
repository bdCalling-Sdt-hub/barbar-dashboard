import { Button, Form, Input, Typography } from "antd";
import React from "react";
import logo from "../../Images/Logo.png";
import style from "./Otp.module.css";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text, Link } = Typography;

const Otp = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
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

        <Form>
          <div className={style.formImage}>
            <img src="https://i.ibb.co/89tdtzR/Icon-1.png" alt="" />
          </div>
          <Input.Group
            style={{ display: "flex", gap: "10px",  }}
          >
            <Input className={style.otpInput} />
            <Input className={style.otpInput} />
            <Input className={style.otpInput} />
            <Input className={style.otpInput} />
            <Input className={style.otpInput} />
            <Input className={style.otpInput} />
          </Input.Group>

          <div className={style.rememberAndPass}>
            <Text>Don't received code?</Text>

            <a
              className="login-form-forgot"
              style={{ color: "#F66D0F" }}
              href=""
            >
              Resend
            </a>
          </div>

          <Form.Item>
            <Button
              onClick={() => navigate("/update-password")}
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
