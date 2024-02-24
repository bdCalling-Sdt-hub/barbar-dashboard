import React, { useState } from 'react'
import { Button, Upload, Modal} from "antd";
import { CiCamera } from "react-icons/ci";
import { baseURL } from '../../Config';
const token = localStorage.getItem('access_token');

const CategoryChangeModal = ({
    OpenChangeModel, 
    setOpenChangeModel,
    setRefresh
}) => {
    const [imageUrl, setImageUrl] = useState();
    const [name, setName] = useState("");
    const onChange = ({ fileList }) => {
        setImageUrl(fileList[0].originFileObj);
    };
    
    const handleChange= async(e)=>{
        e.preventDefault();

        const value={
            category_name : name,
            category_image: imageUrl
        }
        const response = await baseURL.post(`/add-category`, value, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if(response?.status === 200){
            setOpenChangeModel(false);
            setRefresh('done')
        }
      }
    return (
        <Modal
            centered
            open={OpenChangeModel}
            onCancel={() => setOpenChangeModel(false)}
            width={500}
            footer={false}
        >
            <div>
                <h1 style={{marginBottom: "12px"}}>Add Category</h1>
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
                                imageUrl
                                ? 
                                (
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{
                                        width: "100%",
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
                                        Choose Picture
                                    </div>
                                </div>
                            }
                        </Upload>
                    </div>
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
                            marginTop : "44px"
                        }}
                    >
                        Add Category
                    </Button>
                </form>
            </div>
        </Modal>
    )
}

export default CategoryChangeModal;