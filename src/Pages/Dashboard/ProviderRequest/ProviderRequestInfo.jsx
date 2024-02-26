import React, { useEffect, useState } from "react";
import styles from "./ProviderRequest.module.css";
import { Button, Drawer, Space, Table, Typography, Pagination } from "antd";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import { CloseOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
import { baseURL } from "../../../Config";
import Swal from "sweetalert2";

function ProviderRequestInfo({search}) {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [providerRequestData, setProviderRequestData] = useState(null);
  const [providerRequest, setProviderRequest] = useState(null);
  const [searchProviderRequest, setSearchProviderRequest] = useState(null);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState('');
  

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setProviderRequestData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setProviderRequestData(null);
  };




  // data retraive for all userss
  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/get-provider-request?page=${page}`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      console.log(response);
      setProviderRequest(response?.data?.data);
    }
    getAPi();
  }, [page, refresh !==""]);


  // data retraive for search userss
  useEffect(()=>{

    async function getAPi(){
      if(search){
        const response = await baseURL.get(`/search-provider-request/${search}`,{
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
          }
        });
        console.log(response);
        setSearchProviderRequest(response?.data);
      }
    }
    getAPi();

    
  }, [search]);

  if(refresh){
    setTimeout(()=>{
      setRefresh('')
    }, [2000])
  }
  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleApprove =async(id)=>{
    const response = await baseURL.get(`/approve-provider-request/${id}`,{
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
    });
    if(response.status === 200){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Accept Provider",
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        setRefresh("done")
        setIsDrawerVisible(false);
      });
      
    }
  }


  const handleCancel =async(id)=>{
    if(id){    
      Swal.fire({
        title: "Are You Sure?",
        showDenyButton: false,
        showCancelButton: "No",
        confirmButtonText: "Yes",
        denyButtonText: false
      }).then( async (result) => {
        if (result.isConfirmed) {
          const response = await baseURL.get(`/cancel-provider-request/${id}`,{
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem('access_token')}`,
            }
          });
          console.log(response);
          if(response.status === 200){
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Cancel Provider Request",
              showConfirmButton: false,
              timer: 1500
            }).then((result) => {
              setRefresh('done')
            });
          }
        }
      });
    }
  }
  return (
    <>
      <div className={styles.providerContainer}>
        {providerRequest?.data?.map((item) => (
          <div className={styles.cardContainer}>
            <div>
              <img
                style={{ borderRadius: "100%" }}
                src={"https://i.ibb.co/x6bYtBv/Photo-1.png"}
                alt=""
              />
            </div>
            <div>
              <div className={styles.info}>
                <h3 style={{ color: "#F66D0F" }}>{item?.business_name}</h3>
                <p>{item?.user?.email}</p>
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={()=>handleCancel(item?.id)} className={styles.btn}>Cancel</button>{" "}
                <button onClick={()=>showDrawer(item)} className={styles.btn1}>
                  Approve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.PaginationContainer}>
        <h3 style={{ color: "#F66D0F" }}> SHOWING 1-{providerRequest?.data?.length} OF {providerRequest?.total}</h3>
        <Pagination
          defaultPageSize={providerRequest?.per_page} 
          defaultCurrent={providerRequest?.current_page} 
          total={providerRequest?.total} 
          onChange= {handlePageChange}
        />
      </div>

      <Drawer
        title={
          <div>
            <Typography>
              <Title level={5} strong>
                Provider name- {providerRequestData?.name}
              </Title>
              <Text style={{color : "#E9EAEC"}}>See all details about this provider</Text>
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
                border: "2px solid white",
                cursor: "pointer",
              }}
              onClick={closeDrawer}
            >
              <CloseOutlined color="black" />
            </button>
          </Space>
        }
      >
        {providerRequestData && (
          <DrawerPage handleApprove={handleApprove} providerRequestData={providerRequestData} />
        )}
      </Drawer>
    </>
  );
}

export default ProviderRequestInfo;
