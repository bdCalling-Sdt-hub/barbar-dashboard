import React, { useState } from 'react'
import { Button, Modal} from "antd";
import { FaRegTrashAlt } from "react-icons/fa";
import { baseURL } from '../../Config';

const DeletePackageModal = ({
    openDeleteModal, 
    setOpenDeleteModal,
    setRefresh,
    id
}) => {
    const handleDelete= async()=>{
        console.log(id);
        console.log(localStorage.getItem('access_token'));
        const response = await baseURL.get(`/delete-package/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        console.log(response);
        if(response?.status === 200){
            setOpenDeleteModal(false);
            setRefresh('done');
        }
    }
    return (
        <Modal
            centered
            open={openDeleteModal}
            onCancel={() => setOpenDeleteModal(false)}
            width={500}
            footer={false}
        >
            <div>
                <div style={{
                    display : "flex",
                    alignItems : "center",
                    justifyContent :"center",
                    marginBottom : "30px"
                }}> 
                    <div style={{
                        backgroundColor:"#FC4400",
                        borderRadius:"100%",
                        height: "135px",
                        width: "135px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent : "center"
                    }}>
                        <FaRegTrashAlt size={68} color='white' />
                    </div>
                </div>
                <h1  style={{marginBottom: "12px", fontSize : "16px", textAlign: "center"}}>You sure want to delete this category?</h1>     
                <div 
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems : "center",
                        justifyContent : "space-between",
                        gap: "12px",
                        marginTop : "44px"
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                         onClick={handleDelete}
                        style={{
                            width : "100%",
                            height: "45px",
                            fontWeight: "400px",
                            fontSize: "18px",
                            background: "#F66D0F"
                        }}
                    >
                        Yes
                    </Button>
                    
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        onClick={()=>setOpenDeleteModal(false)}
                        style={{
                            width : "100%",
                            height: "45px",
                            fontWeight: "400px",
                            fontSize: "18px",
                            border : "1px solid #F66D0F",
                            borderRadius: "8px",
                            backgroundColor: "transparent",
                            color: "#F66D0F"
                        }}
                    >
                        No
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default DeletePackageModal