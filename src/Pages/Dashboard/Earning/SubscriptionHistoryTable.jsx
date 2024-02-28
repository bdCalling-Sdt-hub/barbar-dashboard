import { Button, Drawer, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { BsDownload } from "react-icons/bs";
import { LiaSaveSolid } from "react-icons/lia";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import { baseURL } from "../../../Config";
import moment from "moment";
const { Title, Text } = Typography;

const SubscriptionHistoryTable = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [page, setPage] = useState(1);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setSubscriptionData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setSubscriptionData(null);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const [data, setData] = useState();

  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/payment-history-provider?page=${page}`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      console.log(response.data.data);
      setData(response?.data.data);
    }
    getAPi();
  }, [page]);


  

  const columns = [
    {
      title: "TRANSACTION ID",
      dataIndex: "transactionID",
      key: "transactionID",
      render: (_,record) => (
        <p>{record?.tx_ref}</p>
      )
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      responsive: ["md"],
      render: (_,record) => <p>{moment(record?.created_at).format('lll')}</p>
    },
    {
      title: "PROVIDER",
      dataIndex: "provider",
      key: "provider",
      responsive: ["lg"],
      render: (_,record) => (
        <p>{record?.name}</p>
      )
    },
    {
      title: "PACKAGE",
      dataIndex: "package",
      key: "package",
      responsive: ["lg"],
      render: (_,record) => (
        <p>{record?.package?.package_name}</p>
      )
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
      render: (_,record) => (
        <p>{record?.amount}</p>
      )
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
      <Table 
        columns={columns} 
        dataSource={data?.data}
        pagination={{
          pageSize: data?.per_page,
          showSizeChanger: false,
          total: data?.total,
          current:  data?.current_page,
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              <Title level={5} strong>
                Invoice# No.{subscriptionData?.tx_ref}
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
