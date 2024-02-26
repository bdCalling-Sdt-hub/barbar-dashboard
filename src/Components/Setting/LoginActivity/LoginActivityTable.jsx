import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../../Config";
import moment from "moment";
import Swal from "sweetalert2";


const LoginActivityTable = () => {
  const [data, setData] = useState();
  const [refresh, setRefresh] = useState("")
  const handelSignOut = (id) => {
    Swal.fire({
      title: "Do you want to Sign Out this device?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        const response = await baseURL.get(`/sign-out-login/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
        if(response?.status === 200){    
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Sign Out Device",
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            setRefresh('done')
          });
        }
      }
    });
  };

  const columns = [
    {
      title: "BROWSER",
      dataIndex: "browser",
      key: "browser",
    },
    {
      title: "DEVICE",
      dataIndex: "device_name",
      key: "device_name",
      responsive: ["md"],
      render: (_, record) => (
        <p>{record?.device_name}</p>
      )
    },
    {
      title: "TIME",
      dataIndex: "login_time",
      key: "login_time",
      render: (_, record) => (
        <p>{moment(record?.login_time).format('lll')}</p>
      ),
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      responsive: ["lg"],
      render: (_, record) => (
        <div >
          <button
            onClick={(e) => handelSignOut(record.id)}
            style={{
              background: "linear-gradient(180deg, #FF2340 0%, #AC0016 100%)",
              borderRadius: "5px",
              cursor: "pointer",
              border: "none",
              padding: "8px 12px",
              color: "white",
            }}
          >
            Sign Out
          </button>
        </div>
      ),
    },
  ];

  // data retraive for all Appointmensts
  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/login-activity`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setData(response?.data?.data);
    }
    getAPi();
  }, [refresh !== ""]);

  
  if(refresh){
    setTimeout(() => {
      setRefresh('')
    }, 1500);
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};

export default LoginActivityTable;
