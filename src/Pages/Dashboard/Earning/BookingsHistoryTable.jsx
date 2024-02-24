import { Button, Drawer, Table, Typography } from "antd";
import React, { useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { BsDownload } from "react-icons/bs";
import { LiaSaveSolid } from "react-icons/lia";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
const { Title, Text } = Typography;

const BookingsHistoryTable = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setBookingData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setBookingData(null);
  };

  const data = [
    {
      key: "1",
      transactionID: "1373700510",
      date: "18 Jul, 2023  4:30pm",
      client: "Sahinur Islam",
      amount: "$850.00",
      action: "Button",
    },
    {
      key: "1",
      transactionID: "1373700510",
      date: "18 Jul, 2023  4:30pm",
      client: "Sahinur Islam",
      amount: "$850.00",
      action: "Button",
    },
    {
      key: "1",
      transactionID: "1373700510",
      date: "18 Jul, 2023  4:30pm",
      client: "Sahinur Islam",
      amount: "$850.00",
      action: "Button",
    },
    {
      key: "1",
      transactionID: "1373700510",
      date: "18 Jul, 2023  4:30pm",
      client: "Sahinur Islam",
      amount: "$850.00",
      action: "Button",
    },
    {
      key: "1",
      transactionID: "1373700510",
      date: "18 Jul, 2023  4:30pm",
      client: "Sahinur Islam",
      amount: "$850.00",
      action: "Button",
    },
  ];
  const columns = [
    {
      title: "TRANSACTION ID",
      dataIndex: "transactionID",
      key: "transactionID",
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      responsive: ["md"],
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      responsive: ["lg"],
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      responsive: ["lg"],
      render: (
        _,
        record // Use the second parameter 'record'
      ) => (
        <div style={{ textAlign: "center" }}>
          <Button type="text" style={{ marginRight: "10px" }}>
            <AiOutlinePrinter style={{ fontSize: "30px", color: "white" }} />
          </Button>
          <Button onClick={() => showDrawer(record)} type="text">
            <BsDownload
              size={25}
              style={{ fontSize: "30px", color: "white" }}
            />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <Drawer
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              
            }}
          >
            <Typography>
              <Title level={5} strong>
                Invoice# No.{bookingData?.transactionID}
              </Title>
              <Text>See all details about this transaction</Text>
            </Typography>
            <Button type="text" onClick={closeDrawer}>
              <IoMdClose fontSize={25} />
            </Button>
          </div>
        }
        closable={false}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={500}
      >
        {bookingData && <DrawerPage bookingData={bookingData} />}
      </Drawer>
    </div>
  );
};

export default BookingsHistoryTable;
