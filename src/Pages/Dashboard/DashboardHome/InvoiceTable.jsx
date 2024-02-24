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
    invoiceNo: "1370510",
    time: "18 Jul, 2023  4:30pm",
    clientname: "Mr ululu",
    providername: "Sahinur Islam",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "1",
    invoiceNo: "1370510",
    time: "18 Jul, 2023  4:30pm",
    clientname: "Mr ululu",
    providername: "Sahinur Islam",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "1",
    invoiceNo: "1370510",
    time: "18 Jul, 2023  4:30pm",
    clientname: "Mr ululu",
    providername: "Sahinur Islam",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "1",
    invoiceNo: "1370510",
    time: "18 Jul, 2023  4:30pm",
    clientname: "Mr ululu",
    providername: "Sahinur Islam",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "1",
    invoiceNo: "1370510",
    time: "18 Jul, 2023  4:30pm",
    clientname: "Mr ululu",
    providername: "Sahinur Islam",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
];

const InvoiceTable = () => {
  const [rentData, setRentData] = useState([]); // Data fetched from the server
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const pageSize = 12;

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setInvoiceData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setInvoiceData(null);
  };

  const columns = [
    {
      title: "Invoice",
      dataIndex: "invoiceNo",
      key: "invoiceNo",
    },
    {
      title: "TIME",
      dataIndex: "time",
      key: "time",
      responsive: ["md"],
    },
    {
      title: "CLIENT NAME",
      dataIndex: "clientname",
      key: "clientname",
      responsive: ["md"],
    },
    {
      title: "PROVIDER NAME",
      dataIndex: "providername",
      key: "providername",
      responsive: ["lg"],
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <>
          <p>
            {status === "complete" && (
              <span
                style={{
                  background: "green",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                Complete
              </span>
            )}
            {status === "pending" && (
              <span
                style={{
                  background: "orange",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                Pending
              </span>
            )}
            {status === "canelled" && (
              <span
                style={{
                  background: "red",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                Cancelled
              </span>
            )}
          </p>
        </>
      ),
    },
    {
      title: "PRINT/VIEW",
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
                Invoice# No.{invoiceData?.invoiceNo}
              </Title>
              <Text>See all details about this appointment</Text>
            </Typography>
          </div>
        }
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={550}
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
        {invoiceData && <DrawerPage invoiceData={invoiceData} />}
      </Drawer>
    </>
  );
};
export default InvoiceTable;
