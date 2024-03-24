import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
const { Title, Text } = Typography;
import { CloseOutlined } from "@ant-design/icons";
import { baseURL } from "../../../Config";
import moment from "moment";
import Swal from "sweetalert2"
import { useReactToPrint } from "react-to-print";

const UserInfo = ({search}) => {
  const [users, setUsers] = useState();
  const [searchUsers, setSearchUsers] = useState([])
  const [page, setPage] = useState(1);
  const [reFresh, setRefresh] = useState(1);
  const componentRef= useRef();

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
          <Button
            onClick={() => showDrawer(record)}
            type="text"
            style={{ paddingBottom: "35px" }}
          >
            <AiOutlineEye style={{ fontSize: "30px", color: "white" }} />
          </Button>
      ),
    },
  ];

  if(reFresh){
    setTimeout(()=>{
      setRefresh("")
    }, [1500])
  }
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
  }, [page, reFresh !== ""]);

  // data retraive for search userss
  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/search-user/${search}`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setUsers(response?.data?.data);
    }
    getAPi();
  }, [search]);


  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
    @media print {
      body {
        font-size: 12px;
        display: "flex",
      }
    }
  `
  });

  const handleBlock=async(id)=>{
    Swal.fire({
      title: "Do you want to Block this User?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        const response = await baseURL.get(`/delete-user/${id}`,{
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
          }
        });
        if(response?.status === 200){    
          Swal.fire({
            position: "center",
            icon: "success",
            title: response?.data?.message,
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            setIsDrawerVisible(false);
            setuserData(null);
            setRefresh('done')
          });
        }
      }
    });


  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={users?.data}
        pagination={{
          pageSize: users?.per_page,
          showSizeChanger: false,
          total: users?.total,
          current: users?.current_page,
          showTotal: (total, range) => (
            <span style={{
              color:"#F66D0F",
              fontSize: "18px",
              fontWeight: "600",
              textAlign: "left"
            }}>
              {`SHOWING ${range[0]}-${range[1]} of ${total} items`}
            </span>
          ),
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
        style={{
          background: "#364153"
        }}
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
              <CloseOutlined color="white" />
            </button>
          </Space>
        }
      >
        {userData && <DrawerPage handleBlock={handleBlock} handlePrint={handlePrint} componentRef={componentRef} userData={userData} />}
      </Drawer>
    </>
  );
};
export default UserInfo;
