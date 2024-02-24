import { Button, Form, Input, Typography } from "antd";
import React from "react";
import logo from "../../Images/Logo.png";
import style from "./Email.module.css";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text, Link } = Typography;

const Email = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className={style.emailContainer}>
      <div>
        <img src={logo} alt="" />
      </div>
      <div className={style.formContainer}>
        <Title
          level={2}
          onClick={() => navigate("/signin")}
          style={{
            color: "#0E1116",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <MdArrowBackIosNew />
          Forgot password
        </Title>
        <Paragraph style={{ marginBottom: "30px" }}>
          Please enter your email address for recover your password.
        </Paragraph>

        <Form>
          <div className={style.formImage}>
            <img src="https://i.ibb.co/D7s0Tdr/Icon.png" alt="" />
          </div>
          <div>
            <label htmlFor="email" className={style.label}>
              Email
            </label>
            <Form.Item
              name="email"
              id="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                placeholder="Enter your email address"
                className={style.input}
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => navigate("/otp")}
              block
              style={{
                height: "45px",
                fontWeight: "400px",
                fontSize: "18px",
                background: "#F66D0F",
                alignSelf: "bottom",
                marginTop: "30px",
              }}
            >
              Send OTP
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Email;
