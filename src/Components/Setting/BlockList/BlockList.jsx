import React, { useEffect, useState } from "react";
import styles from "./BlockList.module.css";
import { Button, Drawer, Space, Table, Typography, Pagination, Input, Row, Col } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import DrawerPage from "../../DrawerPage/DrawerPage";
import { baseURL, url } from "../../../Config";
import Swal from "sweetalert2"
const { Title, Text } = Typography;
import { SearchOutlined } from '@ant-design/icons';

function BlockList() {
  const [data, setData] = useState();
  const [page, setPage] = useState()
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [providerRequestData, setProviderRequestData] = useState(null);
  const [refresh, setRefresh] = useState('')
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setProviderRequestData(record);
  };
  if(refresh){
    setTimeout(()=>{
      setRefresh("")
    },1500)
  }
  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setProviderRequestData(null);
  };

  // data retraive for all Appointmensts
  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/provider-block-list?search=${search}&page=${page}`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setData(response?.data?.data);
    }
    getAPi();
  }, [page, refresh !== "", search]);

  
  const handlePageChange=(page)=>{
    setPage(page);
  }

  const handleApprove =async(id)=>{
    const response = await baseURL.get(`/unblock-provider/${id}`,{
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
    });
    if(response.status === 200){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Unblock Provider",
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        setRefresh("done")
        setIsDrawerVisible(false);
      });
      
    }
  }

  
  const handleSearch=()=>{
    setSearch(keyword);
  }
  return (
    <>

      <Row style={{ marginBottom: "50px" }}>
        <Col lg={{ span: 24 }}>
          <div className='' style={{ display: "flex", gap: "15px" }}>
            <Input onChange={(e)=>setKeyword(e.target.value)} style={{backgroundColor : "#364153"}} size="large" placeholder="Search by name & ID" prefix={<SearchOutlined style={{ color: "#CFCFD0" }} />} />
            <Button onClick={handleSearch} style={{ height: "50px", width: "300px", backgroundColor: "#F66D0F", color: "#fff", fontSize: "20px" }}>Search</Button>
          </div>
        </Col>
      </Row>



      <div className={styles.providerContainer}>
        {data?.data.map((item) => (
          <div className={styles.cardContainer}>
            <div>
              <img
                width={100}
                height={100}
                style={{ borderRadius: "100%" }}
                src={`${url}/images/${item?.cover_photo}`}
                alt=""
              />
            </div>
            <div>
              <div className={styles.info}>
                <h3 style={{ color: "#F66D0F" }}>{item?.business_name}</h3>
                <p>{item?.user?.email}</p>
              </div>
              <div style={{width : "100%"}} className={styles.buttonContainer}>
                <button onClick={()=>handleApprove(item?.id)} style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "5px",
                  border: "none",
                  color: "white",
                  backgroundColor: "#F66D0F",
                  padding: "15px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }} 
                >
                  Unblock
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className={styles.PaginationContainer}>
        <h3 style={{ color: "#F66D0F" }}> SHOWING {data?.from}-{data?.to} OF {data?.total}</h3>
        <Pagination 
          defaultPageSize={data?.per_page} 
          defaultCurrent={data?.current_page} 
          total={data?.total} 
          onChange= {handlePageChange}
          
          />
      </div>

      <Drawer
        title={
          <div>
            <Typography>
              <Title level={5} strong>
                Provider name- Jane Cooper
              </Title>
              <Text>See all details about this provider</Text>
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
          <DrawerPage providerRequestData={providerRequestData} />
        )}
      </Drawer>
    </>
  );
}

export default BlockList;
