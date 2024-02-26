import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../../Config";

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

function TrashTable() {
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

  const columns = [
    {
      title: "USER NAME",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
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
        <div>
          <button
            // onClick={(e) => handelSignOut(record._id)}
            style={{
              background: "#7CC605",
              borderRadius: "5px",
              cursor: "pointer",
              border: "none",
              padding: "8px 12px",
              color: "white",
              fontSize: "10px",
            }}
          >
            Restore
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
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default TrashTable;
