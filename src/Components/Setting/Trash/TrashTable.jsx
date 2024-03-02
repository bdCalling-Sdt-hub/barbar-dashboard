import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../../Config";
import moment from "moment";
import Swal from "sweetalert2";

function TrashTable({search}) {
  const [data, setData] = useState();
  const [page, setPage] = useState();
  const [refresh, setRefresh] = useState("");

  const handleRestore=async(id)=>{
    console.log(id);
    if(id){
      const response = await baseURL.get(`/trash-restore/${id}`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      }); 

      console.log(response);
      if(response?.status === 200){    
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User Restore",
              showConfirmButton: false,
              timer: 1500
            }).then((result) => {
              setRefresh('done')
            });
          }
     
    }
  }

  const columns = [
    {
      title: "USER NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "CONTACT",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (_, record) => (
        <p>{record?.phone_number}</p>
      )
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <p>{moment(record?.created_at).format('ll')}</p>
      )
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      responsive: ["lg"],
      render: (_, record) => (
        <div>
          <button
            onClick={(e) => handleRestore(record?.id)}
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
      if(search){
        const response = await baseURL.get(`/trash-user?search=${search}&page=${page}`,{
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
          }
        });
        setData(response?.data?.data);
      } else{
        const response = await baseURL.get(`/trash-user?page=${page}`,{
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
          }
        });
        setData(response?.data?.data);
      }
      
    }
    getAPi();
  }, [page, refresh !== "", search]);

  const handlePageChange=(page)=>{
    setPage(page);
  }
  
  return (
    <div>



      <Table 
        columns={columns} 
        dataSource={data?.data}
        pagination={{
          pageSize: data?.per_page,
          showSizeChanger: false,
          total: data?.total,
          current:  data?.current_page,
          onChange: handlePageChange,
        }} 
      />
    </div>
  );
}

export default TrashTable;
