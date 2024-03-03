import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../Images/Logo.png";
import style from "./Signin.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { baseURL } from "../../Config";

const Signin = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const email = values.email;
    const password = values.password;
    axios.post('http://192.168.10.121:8000/api/login', {
      email,
      password
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        const token = response.data.access_token;
        
        localStorage.setItem('userId', response.data.user_id);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('access_token', token);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sign In Successfully",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
            navigate("/");
            window.location.reload();
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  
  return (
    <div className={style.signContainer}>
      <div>
        <img src={logo} alt="" />
      </div>
      <div className={style.formContainer}>
        <h2
          style={{
            color: "#0E1116",
            fontWeight: "700",
            marginBottom: "36px",
          }}
        >
          Sign In
        </h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <div>
            <label style={{display: "block", marginBottom: "10px"}} htmlFor="" className={style.label}>
            Email
            </label>
            <Form.Item
              name="email"
    
            >
              <Input
                type="email"
                placeholder="Enter your Email"
                className={style.input}
              />
            </Form.Item>
          </div>

          <div>
            <label htmlFor="" style={{display: "block", marginBottom: "10px"}} className={style.label}>
          Password
            </label>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter confirm Password!",
                },
              ]}
            >
              <Input.Password
                type="passowrd"
                placeholder="Enter your password"
                style={{
                  color: "black"
                }}
                className={style.input}
              />
            </Form.Item>
          </div>

          {/* showing error */}
          {/* <label style={{ color: "red" }}>{err}</label> */}
          <div className={style.rememberAndPass}>
            <div></div>
            <p
              style={{ color: "#F66D0F", fontWeight: "600", cursor: "pointer" }}
              onClick={()=>navigate("/forget-password")}
            >
              Forgot password?
            </p>
          </div>

          <Form.Item>
          <Button
              type="primary"
              htmlType="submit"
              // onClick={() => {
              //   navigate("/");
              // }}
              block
              style={{
                height: "45px",
                fontWeight: "400px",
                fontSize: "18px",
                background: "#F66D0F",
                marginTop: "20px",
              }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

      </div>
    </div>
  );
};

export default Signin;
