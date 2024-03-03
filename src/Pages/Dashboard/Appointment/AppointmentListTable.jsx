import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useEffect, useState, useRef } from "react";
const { Title, Text } = Typography;
import { CloseOutlined } from "@ant-design/icons";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import { baseURL } from "../../../Config";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import { AiOutlineEye } from "react-icons/ai";

function AppointmentListTable({search}) {
  const [appointmensts, setAppointmensts] = useState();
  const [refresh, setRefresh] = useState("")
  const [page, setPage] = useState(1);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [appointmentList, setAppointmentList] = useState(null);

  const componentRef = useRef();
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

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setAppointmentList(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setAppointmentList(null);
  };

   // data retraive for all Appointmensts
   useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/appointment-list?page=${page}`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setAppointmensts(response?.data);
    }
    getAPi();
  }, [page]);

  // data retraive for search Appointmensts
  useEffect(()=>{
    async function getAPi(){
      if(search){
        const response = await baseURL.get(`/appointment-list?name=${search}`,{
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
          }
        });
        setAppointmensts(response?.data);
      }
    }
    getAPi();
  }, [search, refresh !== ""]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const columns = [
    {
      title: "APP. NO",
      dataIndex: "appNo",
      key: "appNo",
      render: (_, record) => (
        <p>{ record?.id}</p>
      )
    },
    {
      title: "TIME",
      dataIndex: "time",
      key: "time",
      responsive: ["md"],
      render: (_, record) => (
        <p>{ record?.time}</p>
      )
    },
    {
      title: "PROVIDER NAME",
      dataIndex: "business_name",
      key: "business_name",
      responsive: ["md"],
      render: (_, record) => 
        <p>{record?.provider?.business_name}</p>
      
    },
    {
      title: "CLIENT NAME",
      dataIndex: "client_name",
      key: "client_name",
      responsive: ["lg"],
      render: (_, record) => (
        <p>{record?.user?.name}</p>
      )
    },
    {
      title: "AMOUNT",
      dataIndex: "price",
      key: "price",

      responsive: ["md"],
      render: (_, status) => (
        <p>{status?.price}</p>
      )
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          <p>
            {record.status === 2 && (
              <span
                style={{
                  background: "#7CC605",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                Complete
              </span>
            )}

            {record.status === 0 && (
              <span
                style={{
                  background: "#FDB600",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  color : "white"
                }}
              >
                Pending
              </span>
            )}

            {record.status === 4 && (
              <span
                style={{
                  background: "#FC4400",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  color : "white"
                }}
              >
                Cancel
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
        
          <Button
            onClick={() => showDrawer(record)}
            type="text"
            style={{ paddingBottom: "35px" }}
          >
            <AiOutlineEye style={{ fontSize: "30px", color: "white" }} />
          </Button>
      ),
    },
  ];

  if(refresh){
    setTimeout(()=>{
      setRefresh('')
    }, [2000])
  }
  
  const handleCancel= async(id)=>{
    if(id){    
      Swal.fire({
        title: "Are You Sure?",
        showDenyButton: false,
        showCancelButton: "No",
        confirmButtonText: "Yes",
        denyButtonText: false
      }).then( async (result) => {
        if (result.isConfirmed) {
          const value={
            id: id,
            status: 4
          }
          const response = await baseURL.post(`/booking/accept`, value, {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem('access_token')}`,
            }
          });

          if(response?.data?.status === "success"){    
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Appoinments Cancel",
              showConfirmButton: false,
              timer: 1500
            }).then((result) => {
              setRefresh('done')
              setIsDrawerVisible(false);
            });
          }
        }
      });
    }
    
  }
  
  return (
    <>
      <Table
        columns={columns}
        dataSource={appointmensts?.data}
        pagination={{
          pageSize: appointmensts?.per_page,
          showSizeChanger: false,
          total: appointmensts?.total,
          current:  appointmensts?.current_page,
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
              Appointment No- {appointmentList?.id}
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
          <Space 
          >
            <button
              style={{
                borderRadius: "100%",
                backgroundColor: "#F66D0F",
                height: "50px",
                width: "50px",
                textAlign: "center",
                border:"2px solid white"
              }}
              onClick={closeDrawer}
            >
              <CloseOutlined color="black" />
            </button>
          </Space>
        }
      >
        {appointmentList && <DrawerPage handlePrint={handlePrint} componentRef={componentRef} handleCancel={handleCancel} appointmentList={appointmentList} />}
      </Drawer>
    </>
  );
}

export default AppointmentListTable;
