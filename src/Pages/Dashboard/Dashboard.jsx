/* eslint-disable no-unused-vars */
import { MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Select, theme } from "antd";
import { Divider, Badge } from "antd";
import { GiChessQueen, GiReceiveMoney } from "react-icons/gi";
import { MdOutlineGroupAdd, MdPayment } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { FaListUl, FaUsers } from "react-icons/fa";
import { IoCutOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import rentiLogo from "../../Images/renti-logo.png";
import Styles from "./Dashboard.module.css";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import {useNavigate} from "react-router-dom"
import { baseURL, url } from "../../Config";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
import { HiLogout } from "react-icons/hi";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import moment from "moment";
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
  const {image} = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.lang);
  const [data, setData] = useState(null);
  const count= data?.filter((item)=> item?.read_at === null) || 0;
  console.log(count?.length)

  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/admin-notification?page=1`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setData(response.data.data);
    }
    getAPi();
  }, []);
  
  const handleLogout=()=>{
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('package');
    localStorage.removeItem('email');
    localStorage.removeItem('access_token');
    navigate('signin')
  }


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
            borderBottom: "1px solid #535770",
            padding: "20px 0px",
            paddingLeft: "20px",
          }}
        >
          Notifications
        </h2>
      </div>
      {data?.slice(0, 4)?.map((notification, index) => 
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            height: "85px",
            borderBottom: "1px solid #535770"

          }}
        >
          <div className="user-image" style={{ marginRight: "10px" }}>
            <img
              style={{
                height: "30px",
                width: "30px",
                borderRadius: "100%",
              }}
              src={`${url}/${notification?.data?.user_details?.image}`}
            />
          </div>
          <div className="">
            <p style={{color: "white"}}>
              <span>{notification?.data?.user_details?.name}</span> {notification?.data?.message}
              {/* Trip No.56. Trip started from Mexico city..... */}
            </p>
            <p style={{ color: "gray"}}>{moment(notification?.data?.created_at).startOf('hour').fromNow()}</p>
          </div>
        </div>
      )}

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
            style={{ display: "flex", alignItems: "center", gap:"10px" }}
          >
            <AiOutlineUser size={25} color="#ffffff" />
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
            style={{ display: "flex", alignItems: "center" , gap:"10px"}}
          >
            <FaRegBell size={25} />
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
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <HiLogout size={25} color="#FFFFFF" />
            <div onClick={handleLogout}> <p>Logout</p> </div>
          </div>
        </div>
      ),
    },
  ];

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
          
            <div className={Styles.notificaton}>
              <Dropdown
                overlay={menu}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <Badge count={count?.length}>
                  <IoMdNotificationsOutline
                    style={{ fontSize: "30px", cursor: "pointer", color: "white" }}
                />
                </Badge>
                
                
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
                  src={`${url}/${image}`}
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
