import { Button, Form, Input, Modal, Switch, Typography } from "antd";
import React, { useState } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const { Paragraph, Title, Text } = Typography;

const Setting = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openChangePassModel, setOpenChangePassModel] = useState(false);
  const [verify, setVerify] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);

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
      height: "45px",
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
  const handleUpdated = (values) => {
    const { password, confirmPassword } = values;

    if (password.length < 8) {
      setErr("Password must be 8 character");
      return;
    }
    if (password !== confirmPassword) {
      setErr("Please enter the same password!");
      return;
    }
    if (!password || !confirmPassword) {
      setErr("Please give your changes password");
      return;
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      setErr("Ensure string has one special case letter.");
      return;
    }
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setErr("Ensure string has two uppercase letters.");
      return;
    }
    if (!/(?=.*[a-z].*[a-z].*[a-z])/.test(password)) {
      setErr("Ensure string has three lowercase letters.");
      return;
    }
    if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setErr("Ensure string has two digits");
      return;
    }
  };

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
    console.log(e);
  };
  const handleSubscription = (e) => {
    console.log(e);
  };

  const setPercentage = () => {
    alert("sahinur");
    setOpenModal(false);
  };

  const handleChangePassword = (values) => {
    console.log("Received values of form: ", values);
  };

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
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleChangePassword}
          >
            <p>Set your percentage from clients booking.</p>
            <div style={{background:"#F66D0F",display:"flex",margin:"0 auto", padding:"10px",justifyContent:"center",height:"100px", width:"100px",borderRadius:"100%"}} >
              <img   src="https://i.ibb.co/ZzSj8rj/percent-1-traced.png" alt="" />
            </div>

            <div>
              <label htmlFor="" className={style.label}>
                Set your percentage
              </label>
              <Form.Item name="currentPassword">
                <Input
                  placeholder="Enter Percentage"
                  type="Text"
                  style={style.input}
                />
              </Form.Item>
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
                <Input
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
                <Input
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
                <Input
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
                onClick={() => (setVerify(true), setOpenChangePassModel(false))}
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
        {/* Verify Password */}
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

            <Input.Group
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <Input style={{ width: "50px", height: "70px" }} />
              <Input style={style.otpInput} />
              <Input style={style.otpInput} />
              <Input style={style.otpInput} />
              <Input style={style.otpInput} />
              <Input style={style.otpInput} />
            </Input.Group>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Don't received code?</Text>

              <a
                className="login-form-forgot"
                style={{ color: "#F66D0F" }}
                href=""
              >
                Resend
              </a>
            </div>

            <Button
              block
              onClick={() => (setUpdatePassword(true), setVerify(false))}
              style={{
                height: "45px",
                fontWeight: "400px",
                fontSize: "18px",
                background: "#F66D0F",
                color: "#fff",
                alignSelf: "bottom",
                marginTop: "130px",
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
                color: "#F66D0F",
                fontWeight: "normal",
                marginBottom: "30px",
                textShadow: "#bfbfbf 2px 2px 4px",
              }}
            >
              Update Password
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
            onFinish={handleUpdated}
          >
            <div>
              <label htmlFor="">New Password</label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter new password!",
                  },
                ]}
              >
                <Input type="text" placeholder="Password" style={style.input} />
              </Form.Item>
            </div>

            <div>
              <label htmlFor="">Re-type Password</label>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter confirm Password!",
                  },
                ]}
              >
                <Input
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
                  marginTop: "100px",
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
