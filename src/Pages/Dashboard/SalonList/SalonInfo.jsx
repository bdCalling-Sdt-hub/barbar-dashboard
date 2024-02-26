import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlinePrinter, AiOutlineEye } from "react-icons/ai";
import { LiaSaveSolid } from "react-icons/lia";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
const { Title, Text } = Typography;
import { CloseOutlined } from "@ant-design/icons";
import { baseURL } from "../../../Config";
import moment from "moment";

const SalonInfo = ({search}) => {
  console.log(search);
  const [salons, setSalons] = useState();
  const [page, setPage] = useState(1);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [salonData, setSalonData] = useState(null);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setSalonData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setSalonData(null);
  };

  const columns = [
    {
      title: "SALON NAME",
      dataIndex: "business_name",
      key: "business_name",
      render: (_, record) => (
        <p>{record?.business_name}</p>
      )
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
      responsive: ["md"],
      render: (_, record) => (
        <p>{record?.address}</p>
      )
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
      render: (_, record) => (
        <p>{moment(record?.created_at).format('L')}</p>
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

  const handlePageChange = (page) => {
    setPage(page);
  };

  // data retraive for all salons
  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/get-salon-list?page=${page}`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setSalons(response?.data?.data);
    }
    getAPi();
  }, [page, search === ""]);


  // data retraive for search salons
  useEffect(()=>{
    async function getAPi(){
      if(search){
        const response = await baseURL.get(`/salon-search/${search}`,{
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
          }
        });
        setSearchsetSalonsSalons(response?.data);
      }
    }
    getAPi();
  }, [search]);

  return (
    <>
      <Table
        columns={columns}
        dataSource={salons?.data}
        pagination={{
          pageSize: salons?.per_page,
          showSizeChanger: false,
          total: salons?.total,
          current:  salons?.current_page,
          onChange: handlePageChange,
        }}
      />
      <Drawer
        title={
          <div>
            <Typography>
              <Title level={5} strong>
                Salon Name: {salonData?.business_name}
              </Title>
              <Text>See all information about the salon</Text>
            </Typography>
          </div>
        }
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={500}
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
        {salonData && <DrawerPage salonData={salonData} />}
      </Drawer>
    </>
  );
};
export default SalonInfo;
