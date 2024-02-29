import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlinePrinter } from "react-icons/ai";
import { CloseOutlined } from "@ant-design/icons";
import DrawerPage from "../../DrawerPage/DrawerPage";
import { baseURL } from "../../../Config";


const { Title, Text } = Typography;

const data = [
  {
    key: "1",
    userName: "Robert Fox",
    email: "Ester123@gmail.com",
    contact: "0919 555 0895",
    date: "15 May 2020 ",
    actions: "",
  },
  {
    key: "1",
    userName: "Robert Fox",
    email: "Ester123@gmail.com",
    contact: "0919 555 0895",
    date: "15 May 2020 ",
    actions: "",
  },
  {
    key: "1",
    userName: "Robert Fox",
    email: "Ester123@gmail.com",
    contact: "0919 555 0895",
    date: "15 May 2020 ",
    actions: "",
  },
  {
    key: "1",
    userName: "Robert Fox",
    email: "Ester123@gmail.com",
    contact: "0919 555 0895",
    date: "15 May 2020 ",
    actions: "",
  },
  {
    key: "1",
    userName: "Robert Fox",
    email: "Ester123@gmail.com",
    contact: "0919 555 0895",
    date: "15 May 2020 ",
    actions: "",
  },
];

function ReviewsTable({search}) {
  const [data, setData] = useState()
  const [page, setPage] = useState()
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [reviewsData, setReviewsData] = useState(null);
  
    const showDrawer = (record) => {
      setIsDrawerVisible(true);
      setReviewsData(record);
    };
  
    const closeDrawer = () => {
      setIsDrawerVisible(false);
      setReviewsData(null);
    };

  const columns = [
    {
      title: "PROVIDER NAME",
      dataIndex: "business_name",
      key: "business_name",
      render: (_, record) => (
        <p>{record?.salon?.business_name}</p>
      )
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
      render: (_, record) => (
        <p>{record?.business_name}</p>
      )
    },
    {
      title: "CONTACT",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
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
  // data retraive for all Appointmensts
  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/review?search=${search}&page=${page}`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      console.log(response);
      setData(response?.data);
    }
    getAPi();
  }, [page, search]);
  
  const handlePageChange=(page)=>{
    setPage(page);
  }


  return (
    <div>
      <Table 
        columns={columns} 
        dataSource={data?.providers_data}
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
          <div>
            <Typography>
              <Title level={5} strong>
              Provider name- Jane Cooper
              </Title>
              <Text>See all reviews of this provider</Text>
            </Typography>
          </div>
        }
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={800}
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
        {reviewsData && <DrawerPage reviewsData={reviewsData} />}
      </Drawer>
    </div>
  );
}

export default ReviewsTable;
