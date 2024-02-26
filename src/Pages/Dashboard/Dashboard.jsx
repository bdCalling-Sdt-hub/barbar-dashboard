/* eslint-disable no-unused-vars */
import { MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Select, theme } from "antd";
import { Divider } from "antd";
import { GiChessQueen, GiReceiveMoney } from "react-icons/gi";
import { MdOutlineGroupAdd, MdPayment } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { FaListUl, FaUsers } from "react-icons/fa";
import { IoWalletOutline, IoCutOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbCalendarCheck, TbMessageCircle2Filled } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import rentiLogo from "../../Images/renti-logo.png";
import Styles from "./Dashboard.module.css";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;

const profileItems = [
  {
    key: 1,
    label: (
      <Link
        to="/setting/personal-information"
        style={{ height: "50px" }}
        rel="noreferrer"
      >
        <div
          className={Styles.everyNotify}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            style={{ marginRight: "20px" }}
            width="30"
            height="30"
            src="https://img.icons8.com/windows/32/gender-neutral-user.png"
            alt="gender-neutral-user"
          />
          <div className="" style={{ marginTop: "" }}>
            <p>Profile</p>
          </div>
        </div>
      </Link>
    ),
  },
  {
    key: 2,
    label: (
      <Link to="/notification" style={{}} rel="noreferrer">
        <div
          className={Styles.everyNotify}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            style={{ marginRight: "20px" }}
            width="30"
            height="30"
            src="https://img.icons8.com/ios/50/appointment-reminders--v1.png"
            alt="appointment-reminders--v1"
          />
          <div className="" style={{ marginTop: "" }}>
            <p>Notification</p>
          </div>
        </div>
      </Link>
    ),
  },
  {
    key: 3,
    label: (
      <div
        style={{ border: "none", backgroundColor: "transparent" }}
        rel="noreferrer"
      >
        <div
          className={Styles.everyNotify}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            style={{ marginRight: "20px" }}
            width="25"
            height="25"
            src="https://img.icons8.com/ios/50/exit--v1.png"
            alt="exit--v1"
          />
          <div className="" style={{ marginTop: "" }}>
            <p>Logout</p>
          </div>
        </div>
      </div>
    ),
  },
];

const items = [...Array(5).keys()].map((item, index) => {
  return {
    key: index,
    label: (
      <Link to="/notification" style={{}} rel="noreferrer">
        <div
          className={Styles.everyNotify}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            style={{
              backgroundColor: "#d9cffb",
              borderRadius: "100%",
              padding: "5px",
              marginRight: "15px",
            }}
            width="30"
            height="30"
            src="https://img.icons8.com/3d-fluency/94/person-male--v2.png"
            alt="person-male--v2"
          />
          <div className="" style={{ marginTop: "" }}>
            <p>
              <span>Sanchej haro manual </span>started a new trip from mexico.
            </p>
            <span style={{ color: "#d2d2d2" }}>1 hr ago</span>
          </div>
        </div>
      </Link>
    ),
  };
});

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.lang);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [t, i18n] = useTranslation("global");

  const handleSelectLanguage = (value) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("lang", value);
  };

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage, i18n]);

  const menu = (
    <Menu>
      <div disabled>
        <h2
          style={{
            color: "#F66D0F",
            fontWeight: "500",
            borderBottom: "1px solid #e6e7f4",
            padding: "20px 0px",
            paddingLeft: "20px",
          }}
        >
          Notifications
        </h2>
      </div>
      {items.map((item) => (
        <Menu.Item key={item.key} color="white">
          {item.label}
        </Menu.Item>
      ))}
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "15px",
        }}
      >
        <Button
          type="primary"
          block
          style={{
            height: "50px",
            backgroundColor: "#F66D0F",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <Link to="/notification">See All</Link>
        </Button>
      </div>
    </Menu>
  );

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Sider
        width="313px"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          position: "fixed",
          height: "100vh",
          zIndex: 2,
          // backgroundColor: "white",
        }}
      >
        <div className="demo-logo-vertical" />
        <div
          className={Styles.logo}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <img
            src={rentiLogo}
            height={collapsed ? "40px" : "152px"}
            width={collapsed ? "40px" : "120px"}
          />
        </div>

        <Menu
          style={{ padding: collapsed ? "0px" : "20px", border: "none" }}
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item
            key="1"
            icon={<RxDashboard style={{ fontSize: "14px", color: "white" }} />}
          >
            <Link to="/" style={{ fontSize: "16px" }}>
              {t("dashboard")}
            </Link>
          </Menu.Item>

          <SubMenu
            style={{ fontSize: "16px" }}
            key="2"
            icon={
              <GiReceiveMoney style={{ fontSize: "14px", color: "white" }} />
            }
            title="Earnings"
          >
            <Menu.Item key="31">
              <Link to="/earning/booking">- Bookings</Link>
            </Menu.Item>
            
            <Menu.Item key="32">
              <Link to="/earning/subscription">- Subscription</Link>
            </Menu.Item>
          </SubMenu>
          
          {/* <Menu.Item
            key="4"
            icon={
              <IoWalletOutline style={{ fontSize: "14px", color: "white" }} />
            }
          >
            <Link to="/wallet" style={{ fontSize: "16px" }}>
              Wallet
            </Link>
          </Menu.Item> */}

          <Divider />

          <Menu.Item
            key="64"
            icon={
              <BsFillBookmarkCheckFill
                style={{ fontSize: "14px", color: "white" }}
              />
            }
          >
            <Link to="/appointmentlist" style={{ fontSize: "16px" }}>
              Appointments
            </Link>
          </Menu.Item>

          <Menu.Item
            key="6"
            icon={<IoCutOutline style={{ fontSize: "14px", color: "white" }} />}
          >
            <Link to="/salonlist" style={{ fontSize: "16px" }}>
            Salon List
            </Link>
          </Menu.Item>

          <Menu.Item
            key="61"
            icon={<FaUsers style={{ fontSize: "14px", color: "white" }} />}
          >
            <Link to="/providerList" style={{ fontSize: "16px" }}>
              Provider list
            </Link>
          </Menu.Item>

          <Menu.Item
            key="7"
            icon={
              <MdOutlineGroupAdd style={{ fontSize: "14px", color: "white" }} />
            }
          >
            <Link to="/provider-request" style={{ fontSize: "16px" }}>
              Provider Request
            </Link>
          </Menu.Item>

          <Menu.Item
            key="57"
            icon={<GiChessQueen style={{ fontSize: "14px", color: "white" }} />}
          >
            <Link to="/provider-subscription" style={{ fontSize: "16px" }}>
              Provider subscription
            </Link>
          </Menu.Item>

          <Menu.Item
            key="8"
            icon={<FaUsers style={{ fontSize: "14px", color: "white" }} />}
          >
            <Link to="/userlist" style={{ fontSize: "16px" }}>
              {t("userList")}
            </Link>
          </Menu.Item>

          <Menu.Item
            key="9"
            icon={
              <FaListUl
                style={{ fontSize: "14px", color: "white" }}
              />
            }
          >
            <Link to="/categories" style={{ fontSize: "16px" }}>
              Categories
            </Link>
          </Menu.Item>

          <Divider />

          <Menu.Item
            key="10"
            icon={
              <SettingOutlined style={{ fontSize: "14px", color: "white" }} />
            }
          >
            <Link to="/setting" style={{ fontSize: "16px" }}>
              {t("setting.title")}
            </Link>
          </Menu.Item>

        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            position: "fixed",
            width: "100vw",
            height: "80px",
            zIndex: 1,
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "60px",
          }}
        >
          <div className="" style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuOutlined /> : <MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                marginLeft: collapsed ? "125px" : "360px",
                fontSize: "16px",
                width: 45,
                height: 45,
                marginRight: "10px",
                color: "white",
              }}
            />
            {/* <h2>{t("header.title")}</h2> */}
          </div>

          <div
            className={Styles.notificatonProfileSection}
            style={{ display: "flex", alignItems: "center", lineHeight: 0 }}
          >
            {/* <div className="" style={{ marginRight: "40px" }}>
              <Select
                value={selectedLanguage}
                style={{ width: 150 }}
                onChange={handleSelectLanguage}
              >
                <Option value="en">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="https://cdn.britannica.com/29/22529-004-ED1907BE/Union-Flag-Cross-St-Andrew-of-George.jpg"
                      alt="English"
                      style={{ marginRight: 8, width: 16, height: 16 }}
                    />
                    English
                  </div>
                </Option>
                <Option value="es">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="https://e0.pxfuel.com/wallpapers/630/608/desktop-wallpaper-spain-flag-in-collection.jpg"
                      style={{ marginRight: 8, width: 16, height: 16 }}
                    />
                    Spanish
                  </div>
                </Option>
              </Select>
            </div> */}
            <div className={Styles.notificaton}>
              <Dropdown
                overlay={menu}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <IoMdNotificationsOutline
                  style={{ fontSize: "30px", color: "white" }}
                />
              </Dropdown>
            </div>
            <div className={Styles.profile}>
              <Dropdown
                menu={{
                  items: profileItems,
                }}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <img
                  style={{ cursor: "pointer" }}
                  width="40"
                  height="40"
                  src="https://img.icons8.com/3d-fluency/94/person-male--v2.png"
                  alt="person-male--v2"
                />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            marginTop: "120px",
            marginBottom: "50px",
            marginLeft: collapsed ? "130px" : "360px",
            marginRight: "60px",
            background: "#e6e7f4",
            // padding: 50,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
