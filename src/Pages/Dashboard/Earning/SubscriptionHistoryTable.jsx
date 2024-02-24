import { Button, Drawer, Table, Typography } from "antd";
import React, { useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { BsDownload } from "react-icons/bs";
import { LiaSaveSolid } from "react-icons/lia";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
const { Title, Text } = Typography;

const SubscriptionHistoryTable = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(null);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setSubscriptionData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setSubscriptionData(null);
  };

  const data = [
    {
      key: "1",
      transactionID: "1373700510",
      date: "18 Jul, 2023  4:30pm",
      provider: "Sahinur Islam",
      package: "Diamond",
      amount: "$850.00",
      action: "Button",
    },
    {
      key: "1",
      transactionID: "1373700510",
      date: "18 Jul, 2023  4:30pm",
      provider: "Sahinur Islam",
      package: "Gold",
      amount: "$850.00",
      action: "Button",
    },
    {
      key: "1",
      transactionID: "1373700510",
      date: "18 Jul, 2023  4:30pm",
      provider: "Sahinur Islam",
      package: "Diamond",
      amount: "$850.00",
      action: "Button",
    },
    {
      key: "1",
      transactionID: "1373700510",
      date: "18 Jul, 2023  4:30pm",
      provider: "Sahinur Islam",
      package: "Diamond",
      amount: "$850.00",
      action: "Button",
    },
    {
      key: "1",
      transactionID: "1373700510",
      date: "18 Jul, 2023  4:30pm",
      provider: "Sahinur Islam",
      package: "Diamond",
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
      title: "PROVIDER",
      dataIndex: "provider",
      key: "provider",
      responsive: ["lg"],
    },
    {
      title: "PACKAGE",
      dataIndex: "package",
      key: "package",
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
                Invoice# No.{subscriptionData?.transactionID}
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
        width={550}
      >
        {subscriptionData && <DrawerPage subscriptionData={subscriptionData} />}
      </Drawer>
    </div>
  );
};

export default SubscriptionHistoryTable;
