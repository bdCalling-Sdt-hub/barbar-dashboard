import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlinePrinter, AiOutlineEye } from "react-icons/ai";
import { LiaSaveSolid } from "react-icons/lia";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
const { Title, Text } = Typography;
import { CloseOutlined } from "@ant-design/icons";
import { baseURL } from "../../../Config";
import moment from "moment";
const token = localStorage.getItem('access_token');

const UserInfo = ({search}) => {
  const [users, setUsers] = useState();
  const [searchUsers, setSearchUsers] = useState([])
  const [page, setPage] = useState(1);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [userData, setuserData] = useState(null);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setuserData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setuserData(null);
  };

  const columns = [
    {
      title: "USER NAME",
      dataIndex: "name",
      key: "name",
      
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "CONTACT",
      dataIndex: "phone_number",
      key: "phone_number",
      responsive: ["md"],
    },
    {
      title: "JOINING DATE",
      dataIndex: "created_at",
      key: "created_at",
      responsive: ["md"],
      render: (_, record) => (
        <p>{moment(record?.created_at).format('L')}</p>
      )
    },
    {
      title: "ACTIONS",
      dataIndex: "printView",
      key: "printView",
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{}}>
          <Button
            type="text"
            style={{ marginRight: "10px", paddingBottom: "35px" }}
          >
            <AiOutlinePrinter style={{ fontSize: "30px", color: "white" }} />
          </Button>
          <Button
            onClick={() => showDrawer(record)}
            type="text"
            style={{ paddingBottom: "35px" }}
          >
            <AiOutlineEye style={{ fontSize: "30px", color: "white" }} />
          </Button>
        </div>
      ),
    },
  ];

  // data retraive for all userss
  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/user-list?page=${page}`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setUsers(response?.data?.data);
    }
    getAPi();
  }, [page]);

  // data retraive for search userss
  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/search-user/${search}`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setSearchUsers(response?.data?.data);
    }
    getAPi();
  }, [search]);


  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={searchUsers?.data ? searchUsers?.data : users?.data}
        pagination={{
          pageSize: searchUsers?.per_page ? searchUsers?.per_page : users?.per_page,
          showSizeChanger: false,
          total: searchUsers?.total ? searchUsers?.total :  users?.total,
          current: searchUsers?.current_page ? searchUsers?.current_page : users?.current_page,
          onChange: handlePageChange,
        }}
      />

      <Drawer
        title={
          <div>
            <Typography>
              <Title level={5} strong>
                User name: {userData?.name}
              </Title>
              <Text>See all information about the user</Text>
            </Typography>
          </div>
        }
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={500}
        closable={false}
        extra={
          <Space>
          <button
              style={{
                borderRadius: "100%",
                backgroundColor: "#F66D0F",
                height: "50px",
                width: "50px",
                textAlign: "center",
                border:"2px solid white",
                cursor: "pointer",
              }}
              onClick={closeDrawer}
            >
              <CloseOutlined color="black" />
            </button>
          </Space>
        }
      >
        {userData && <DrawerPage userData={userData} />}
      </Drawer>
    </>
  );
};
export default UserInfo;
