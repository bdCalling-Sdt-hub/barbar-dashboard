import React, { useState } from 'react'
import { Button, Upload, Modal} from "antd";
import { CiCamera } from "react-icons/ci";
import { baseURL, url } from '../../Config';
import Swal from "sweetalert2"
const token = localStorage.getItem('access_token');

const EditModal = ({
    openEditModel, 
    setOpenEditModel,
    setOpenDeleteModal,
    setRefresh,
    category
}) => {
    const [imageUrl, setImageUrl] = useState();
    const { id, category_name, category_image } = category;
    const [img, setImg] = useState(`${url}/${category_image}`);
    const [name, setName] = useState(category_name);
    const onChange = (info) => {
        setImageUrl(info.file);
        setImg(URL.createObjectURL(info.file.originFileObj) )
    };
    
    const handleChange= async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('category_name', name);
        formData.append('category_image', imageUrl.originFileObj);

        const response = await baseURL.post(`/update-category/${id}`, formData, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        if(response?.status === 200){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Category Update Successfully",
                showConfirmButton: false,
                timer: 1500
            }).then(()=>{
                setOpenEditModel(false);
                setRefresh('done')
            })
            
        }
    }

    const handleOpen=()=>{
        setOpenEditModel(false);
        setOpenDeleteModal(true);
    }
    return (
        <Modal
            centered
            open={openEditModel}
            onCancel={() => setOpenEditModel(false)}
            width={500}
            footer={false}
        >
            <div>
                <h1 style={{marginBottom: "12px"}}>Edit Category</h1>
                <form onSubmit={handleChange}>
                    <div>
                        <label style={{marginBottom : "12px"}}>Category name</label>
                        <div style={{
                            marginTop: "10px",
                            marginBottom: "10px"                            
                        }}>
                            <input 
                                style={{
                                    width: "100%",
                                    height: "52px",
                                    border: "1px solid #535770",
                                    borderRadius: "8px",
                                    padding : "16px",
                                    color: "black",
                                    outline: "none",
                                    backgroundColor: "#E9EAEC",

                                }}
                                type="text" 
                                placeholder="Enter Category name" 
                                value={name} 
                                name="category_name"
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div style={{marginBottom : "12px"}}>
                            <label >Category Picture</label>
                        </div>
                        <Upload
                            name="avatar"                 
                            listType="picture-card"
                            showUploadList={false}
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            onChange={onChange}
                        >
                            {
                                img
                                ? 
                                (
                                    <img
                                        src={img}
                                        alt="avatar"
                                        style={{
                                            width: "100%",
                                            height: "190px",
                                            borderRadius: "8px",
                                            
                                        }}
                                    />
                                ) 
                                :
                                <div>
                                    <CiCamera size={64} color="#F66D0F" />
                                    <div
                                        style={{
                                        color: "#F66D0F"
                                        }}
                                    >
                                        Chage Picture
                                    </div>
                                </div>
                            }
                        </Upload>
                    </div>
                    
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
                            onClick={handleOpen}
                        >
                            Delete
                        </Button>
                    
                    
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{
                                width : "100%",
                                height: "45px",
                                fontWeight: "400px",
                                fontSize: "18px",
                                background: "#F66D0F",
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default EditModal