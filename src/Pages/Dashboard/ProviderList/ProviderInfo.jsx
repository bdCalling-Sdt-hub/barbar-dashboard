import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlinePrinter, AiOutlineEye } from "react-icons/ai";
import { LiaSaveSolid } from "react-icons/lia";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
const { Title, Text } = Typography;
import { CloseOutlined } from "@ant-design/icons";
import { baseURL } from "../../../Config";
import moment from 'moment';

const ProviderInfo = ({search}) => {
  const [providers, setProviders] = useState();
  const [page, setPage] = useState(1);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [providerData, setProviderData] = useState(null);
  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setProviderData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setProviderData(null);
  };

  const columns = [
    {
      title: "PROVIDER NAME",
      dataIndex: "providerName",
      key: "providerName",
      render: (_, record) => (
        <p>{record?.name}</p>
      )
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
      render: (_, record) => (
        <p>{record?.email}</p>
      )
    },
    {
      title: "CONTACT",
      dataIndex: "contact",
      key: "contact",
      responsive: ["md"],
      render: (_, record) => (
        <p>{record?.phone_number}</p>
      )
    },
    {
      title: "JOINING DATE",
      dataIndex: "joiningDate",
      key: "joiningDate",
      responsive: ["md"],
      render: (_, record) => (
        <p>{moment(record?.created_at).format('ll')}</p>
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



   // data retraive for all providers
   useEffect(()=>{
    async function getAPi(){
     
      const response = await baseURL.get(`/provider-list?search=${search}&page=${page}`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setProviders(response?.data?.data);
    }
    getAPi();
  }, [page, search]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={providers?.data}
        // dataSource={searchProviders?.data ? searchProviders?.data : providers?.data}
        pagination={{
          pageSize: providers?.per_page,
          showSizeChanger: false,
          total: providers?.total,
          current:  providers?.current_page,
          onChange: handlePageChange,
        }}
      />
      <Drawer
        title={
          <div>
            <Typography>
              <Title level={5} strong>
                Provider name: {providerData?.name}
              </Title>
              <Text>See all details about this provider</Text>
            </Typography>
          </div>
        }
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={850}
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
                border: "2px solid white",
                cursor: "pointer",
              }}
              onClick={closeDrawer}
            >
              <CloseOutlined color="black" />
            </button>
          </Space>
        }
      >
        {providerData && <DrawerPage providerData={providerData} />}
      </Drawer>
    </>
  );
};
export default ProviderInfo;
