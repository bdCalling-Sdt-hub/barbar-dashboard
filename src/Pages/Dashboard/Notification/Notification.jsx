import { Col, Divider, Pagination, Row } from "antd";
import React, {useState, useEffect} from "react";
import "./Notification.css";
import { baseURL, url } from "../../../Config";
import { IoIosArrowBack } from "react-icons/io";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Pusher from 'pusher-js';

function Notification() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [reFresh, setRefresh] = useState("");
  const navigate = useNavigate();
  if(reFresh){
    setTimeout(()=>{
      setRefresh('')
    }, [1500])
  }
  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/admin-notification?page=${page}`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setData(response.data);
    }
    getAPi();
  }, [page, reFresh !== ""]);

  const handlePageChange=(page)=>{
    MdSecurityUpdateGood(page)
  }

  const handleReactAt=async(id)=>{
    const response = await baseURL.get(`/admin/read_at/notification?id=${id}`,{
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
    });
    if(response.status === 200){
      setRefresh("done")
    }
  }


  useEffect(() => {
    var pusher = new Pusher('ed3fa994e71a7b25af7e', {
      cluster: 'ap2',
      forceTLS: true
    });
  
    var channel = pusher.subscribe('pusher-app');
  
    channel.bind('SendNotification', function(data) {
      console.log('Received my-event with message:', data.message);
      alert('Received my-event with message: ' + data.message);
    });
  
    channel.bind('pusher:subscription_succeeded', function() {
      console.log('Subscribed to pusher-app channel');
    });
  
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return (
    <div>
      <Row>
        <h2 onClick={()=>navigate("/")} style={{ width: "fit", cursor:"pointer",  fontSize: "30px", marginBottom: "30px", display: "flex", alignItems: "center", gap: "30px" }}>
         <IoIosArrowBack size={24} color="white"  /> Notification
        </h2>

        {data?.data?.map((notification, index) => {
          return (
            <Col key={index} lg={{ span: 24 }}>
              <div
                onClick={()=>handleReactAt(notification?.id)}
                className="single-notification"
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: `${notification?.read_at === null ? "1px solid #F66D0F" : "1px solid #535770"}`,
                  padding: "20px",
                  borderRadius: "10px",
                  height: "85px",
                  marginBottom : "30px",
                  cursor: `${notification?.read_at === null ? "pointer" : "default"}`

                }}
              >
                <div className="user-image" style={{ marginRight: "20px" }}>
                  <img
                    style={{
                      height: "70px",
                      width: "70px",
                      borderRadius: "8px",
                    }}
                    src={`${url}/${notification?.data?.user_details?.image}`}
                  />
                </div>
                <div className="">
                  <p>
                    <span>{notification?.data?.user_details?.name}</span> {notification?.data?.message}
                    {/* Trip No.56. Trip started from Mexico city..... */}
                  </p>
                  <p style={{ color: "gray", marginTop: "10px" }}>{moment(notification?.data?.created_at).startOf('hour').fromNow()}</p>
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
