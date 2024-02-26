import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../../Config";

const data = [
  {
    key: "1",
    browser: "Chrome",
    operatingSystem: "Windows 10",
    createdAt: "22/05/2021",
    actions: "",
  },
  {
    key: "2",
    browser: "Chrome",
    operatingSystem: "Windows 10",
    createdAt: "22/05/2021",
    actions: "",
  },
  {
    key: "3",
    browser: "Chrome",
    operatingSystem: "Windows 10",
    createdAt: "22/05/2021",
    actions: "",
  },
 
];

const LoginActivityTable = () => {
  const [data, setData] = useState()
  const [page, setPage] = useState()
  let token = localStorage.getItem("token");

  function formatDateString(inputDateString) {
    const inputDate = new Date(inputDateString);

    if (isNaN(inputDate)) {
      return "Invalid Date";
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = inputDate.getDate();
    const month = months[inputDate.getMonth()];
    const year = inputDate.getFullYear();

    let hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    if (hours > 12) {
      hours -= 12;
    }

    return `${day} ${month}, ${year}-${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}${ampm}`;
  }

  // const handelSignOut = (id) => {
  //   Swal.fire({
  //     title: "Do you want to Sign Out this device?",
  //     showDenyButton: true,
  //     showCancelButton: false,
  //     confirmButtonText: "Yes",
  //     denyButtonText: `No`,
  //   }).then((result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       baseAxios.delete(`/api/activities/${id}`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           authorization: `Bearer ${token}`,
  //         },
  //       });

  //       // page reload here
  //       window.location.reload();
  //     } else if (result.isDenied) {
  //       Swal.fire("Ok", "", "info");
  //     }
  //   });
  // };

  const columns = [
    {
      title: "BROWSER",
      dataIndex: "browser",
      key: "browser",
    },
    {
      title: "DEVICE",
      dataIndex: "operatingSystem",
      key: "operatingSystem",
      responsive: ["md"],
    },
    {
      title: "TIME",
      dataIndex: "createdAt",
      key: "createdAt",
      // render: (_, record) => (
      //   <div >
      //     {formatDateString(record.createdAt)}
      //   </div>
      // ),
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      responsive: ["lg"],
      render: (_, record) => (
        <div >
          <button
            // onClick={(e) => handelSignOut(record._id)}
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
      const response = await baseURL.get(`/appointment-list?page=${page}`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      // console.log(response?.data?.data);
      setData(response?.data?.data);
    }
    getAPi();
  }, [page]);

  
  const handleChange=(page)=>{
    setPage(page);
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default LoginActivityTable;
