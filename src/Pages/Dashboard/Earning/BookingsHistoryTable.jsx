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

const BookingsHistoryTable = () => {
  const [bookings, setBookings] = useState();
  const [searchSalons, setSearchSalons] = useState([])
  const [page, setPage] = useState(1);
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
      console.log(response.data.data);
      setBookings(response?.data?.data);
    }
    getAPi();
  }, [page]);

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
