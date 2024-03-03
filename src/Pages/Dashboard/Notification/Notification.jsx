import { Col, Divider, Pagination, Row } from "antd";
import React, {useState, useEffect} from "react";
import "./Notification.css";
import { baseURL, url } from "../../../Config";
import { IoIosArrowBack } from "react-icons/io";

function Notification() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/admin-notification?page=${page}`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      console.log(response.data)
      setData(response.data);
    }
    getAPi();
  }, [page]);
  const handlePageChange=(page)=>{
    MdSecurityUpdateGood(page)
  }
  return (
    <div>
      <Row>
        <h2 style={{ fontSize: "30px", marginBottom: "30px", display: "flex", alignItems: "center", gap: "30px" }}>
         <IoIosArrowBack size={24} color="white"  /> Notification
        </h2>

        {data?.data?.map((notification, index) => {
          console.log(notification);
          return (
            <Col lg={{ span: 24 }}>
              <div
                className="single-notification"
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #535770",
                  padding: "20px",
                  borderRadius: "10px",
                  height: "85px",
                  marginBottom : "30px"

                }}
              >
                <div className="user-image" style={{ marginRight: "20px" }}>
                  <img
                    style={{
                      height: "70px",
                      width: "70px",
                      borderRadius: "100%",
                      border: "2px solid gray",
                    }}
                    src={`${url}/${notification?.data?.user_details?.image}`}
                  />
                </div>
                <div className="">
                  <p>
                    <span>{notification?.data?.user_details?.name}</span> {notification?.data?.message}
                    {/* Trip No.56. Trip started from Mexico city..... */}
                  </p>
                  <p style={{ color: "gray", marginTop: "10px" }}>1hr ago</p>
                </div>
              </div>

              
            </Col>
          );
        })}
        <div style={{width: "100%", display: "flex", alignItems:"center",  justifyContent: "space-between"}}>
          <h3 style={{ color: "#F66D0F" }}> SHOWING {data?.pagination?.from}-{data?.pagination?.to} OF {data?.pagination?.total}</h3>
          <Pagination 
            defaultPageSize={data?.pagination?.per_page} 
            defaultCurrent={data?.pagination?.current_page} 
            total={data?.pagination?.total} 
            onChange= {handlePageChange}
          />
        </div>
      </Row>
    </div>
  );
}

export default Notification;
