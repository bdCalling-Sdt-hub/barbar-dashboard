import { Button, Drawer, Table, Typography } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import { baseURL } from "../../../Config";
import moment from "moment";
const { Title, Text } = Typography;
import {AiOutlineEye } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
const BookingsHistoryTable = () => {
  const [bookings, setBookings] = useState();
  const [page, setPage] = useState(1);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const componentRef = useRef();

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setBookingData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setBookingData(null);
  };

  const columns = [
    {
      title: "TRANSACTION ID",
      dataIndex: "transactionID",
      key: "transactionID",
      render: (_,record) => <p>{record?.tx_ref}</p>
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      responsive: ["md"],
      render: (_,record) => <p>{moment(record?.created_at).format('lll')}</p>
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      responsive: ["lg"],
      render: (_,record) => <p>{record?.user?.name}</p>
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
      render: (_,record) => <p>{record?.amount}</p>
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
        <Button onClick={() => showDrawer(record)} type="text">
            <AiOutlineEye
              size={25}
              style={{ fontSize: "30px", color: "white" }}
            />
          </Button>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setPage(page);
  };

  // data retraive for all bookings
  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/payment-history-user?page=${page}`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setBookings(response?.data?.data);
    }
    getAPi();
  }, [page]);

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

  return (
    <div>
      <Table 
        columns={columns} 
        dataSource={bookings?.data}
        pagination={{
          pageSize: bookings?.per_page,
          showSizeChanger: false,
          total: bookings?.total,
          current:  bookings?.current_page,
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
                Invoice# No.{bookingData?.transactionID}
              </Title>
              <Text>See all details about this transaction</Text>
            </Typography>
            <Button type="text" onClick={closeDrawer}>
              <IoMdClose color="white" fontSize={25} />
            </Button>
          </div>
        }
        closable={false}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={500}
        style={{
          background: "#364153"
        }}
      >
        {bookingData && <DrawerPage componentRef={componentRef} handlePrint={handlePrint} bookingData={bookingData} />}
      </Drawer>

    </div>
  );
};

export default BookingsHistoryTable;
