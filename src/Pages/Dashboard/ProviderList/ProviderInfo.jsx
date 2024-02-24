import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlinePrinter, AiOutlineEye } from "react-icons/ai";
import { LiaSaveSolid } from "react-icons/lia";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
const { Title, Text } = Typography;
import { CloseOutlined } from "@ant-design/icons";

const data = [
  {
    key: "1",
    providerName: "Robert Fox",
    email: "example@gmail.com",
    joiningDate: "18 Jul, 2023  4:30pm",
    contact: "01711 145865",
    address: "Dhaka, Bangladesh",
  },
  {
    key: "1",
    providerName: "Robert Fox",
    email: "example@gmail.com",
    joiningDate: "18 Jul, 2023  4:30pm",
    contact: "01711 145865",
    address: "Dhaka, Bangladesh",
  },
  {
    key: "1",
    providerName: "Robert Fox",
    email: "example@gmail.com",
    joiningDate: "18 Jul, 2023  4:30pm",
    contact: "01711 145865",
    address: "Dhaka, Bangladesh",
  },
  {
    key: "1",
    providerName: "Robert Fox",
    email: "example@gmail.com",
    joiningDate: "18 Jul, 2023  4:30pm",
    contact: "01711 145865",
    address: "Dhaka, Bangladesh",
  },
  {
    key: "1",
    providerName: "Robert Fox",
    email: "example@gmail.com",
    joiningDate: "18 Jul, 2023  4:30pm",
    contact: "01711 145865",
    address: "Dhaka, Bangladesh",
  },
  {
    key: "1",
    providerName: "Robert Fox",
    email: "example@gmail.com",
    joiningDate: "18 Jul, 2023  4:30pm",
    contact: "01711 145865",
    address: "Dhaka, Bangladesh",
  },
];

const ProviderInfo = () => {
  const [rentData, setRentData] = useState([]); // Data fetched from the server
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const pageSize = 12;

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
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "CONTACT",
      dataIndex: "contact",
      key: "contact",
      responsive: ["md"],
    },
    {
      title: "JOINING DATE",
      dataIndex: "joiningDate",
      key: "joiningDate",
      responsive: ["md"],
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

  useEffect(() => {
    // Fetch data from the server when the current page changes
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    // Replace this with your actual API request to fetch data based on pagination
    try {
      const response = await fetch(
        `/api/data?page=${currentPage}&pageSize=${pageSize}`
      );
      const result = await response.json();

      setData(result.data);
      setTotalItems(result.totalItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(currentPage);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize,
          showSizeChanger: false,
          total: 5000,
          current: currentPage,
          onChange: handlePageChange,
        }}
      />
      <Drawer
        title={
          <div>
            <Typography>
              <Title level={5} strong>
                Provider name: Robert fox {providerData?.username}
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
