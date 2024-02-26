import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlinePrinter, AiOutlineEye } from "react-icons/ai";
import { LiaSaveSolid } from "react-icons/lia";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
const { Title, Text } = Typography;
import { CloseOutlined } from "@ant-design/icons";
import { baseURL } from "../../../Config";
import moment from "moment";

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
  const [page, setPage] = useState(1);
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
      render: (_,record) => <p>{record?.id}</p>
    },
    {
      title: "TIME",
      dataIndex: "time",
      key: "time",
      responsive: ["md"],
      render: (_,record) => <p>{moment(record?.created_at).format('lll')}</p>
    },
    {
      title: "CLIENT NAME",
      dataIndex: "clientname",
      key: "clientname",
      responsive: ["md"],
      render: (_,record) => <p>{record?.user?.name}</p>
    },
    {
      title: "PROVIDER NAME",
      dataIndex: "providername",
      key: "providername",
      responsive: ["lg"],
      render: (_,record) => <p>{record?.provider?.business_name}</p>
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
      render: (_,record) => <p>{record?.price}</p>
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <>
          <p>
            {status === 2 && (
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
            {status === 0 && (
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
            {status === 4 && (
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

  const handlePageChange = (page) => {
    setPage(page);
  };

  const [data, setData] = useState();

  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/appointment-list?page=${page}`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setData(response?.data.data);
    }
    getAPi();
  }, [page]);

  return (
    <>
      <Table
        columns={columns}
        dataSource={data?.data}
        pagination={{
          pageSize: data?.per_page,
          showSizeChanger: false,
          total: data?.total,
          current:  data?.current_page,
          onChange: handlePageChange,
        }}
      />


      <Drawer
        title={
          <div>
            <Typography>
              <Title level={5} strong>
                Invoice# No.{invoiceData?.id}
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
