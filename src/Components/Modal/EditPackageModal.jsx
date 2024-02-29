import React, { useState } from 'react'
import {  Modal, Form, Input, } from "antd";
import { baseURL } from '../../Config';
import Swal from "sweetalert2"

const EditPackageModal = ({
    packeageUpdateModel, 
    setPackeageUpdateModel,
    setRefresh
}) => {
    const packageData = JSON.parse(localStorage.getItem('package'));
    
    const handleUpdate= async(values)=>{
        const value={
            package_name : values?.package_name,
            package_duration: values?.package_duration,
            price: values?.price,
            package_features: JSON.stringify(values?.package_features)
        }
        const response = await baseURL.post(`/update-package/${packageData?.id}`, value, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        if(response?.status === 200){
            Swal.fire({
                position: "center",
                icon: "success",
                title: response?.data?.message,
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                setPackeageUpdateModel(false);
                setRefresh('done');
              })
            
        }
    }

    const initialFormValues = {
        package_name: packageData?.package_name,
        package_duration: packageData?.package_duration,
        package_features: packageData?.package_features,
        price: packageData?.price
    };
    
    return (
        <Modal
            centered
            open={packeageUpdateModel}
            onCancel={() => setPackeageUpdateModel(false)}
            width={500}
            footer={false}
        >
            <div>
                <h1 style={{marginBottom: "12px"}}>Edit Category</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={initialFormValues}
                    onFinish={handleUpdate}
                >
                    <Form.Item  
                                name="package_name"
                            >
                                <Input
                                    size="large"
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
                                />
                    </Form.Item>   

                    <Form.Item
                                name="package_duration"
                            >
                                <Input
                                    size="package_duration"
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
                                />
                    </Form.Item>

                    <Form.Item 
                                name="price"
                            >  
                                <Input
                                    size="large"
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
                                />
                    </Form.Item>

                    <Form.Item
                                name="package_features"
                            >    
                                <Input.TextArea
                                    size="large"
                                    style={{
                                        width: "100%",
                                        height: "170px",
                                        border: "1px solid #535770",
                                        borderRadius: "8px",
                                        padding : "16px",
                                        color: "black",
                                        outline: "none",
                                        backgroundColor: "#E9EAEC",
                                    }}
                                />
                    </Form.Item>
                    <Form.Item>
                        <button 
                            type="submit"
                             
                            style={{
                                width: "100%",
                                height: "56px",
                                backgroundColor: "#F66D0F",
                                color: "white",
                                border: "none",
                                borderRadius: "8px"
                            }} 
                        >
                            Save
                        </button>
                    </Form.Item>
                </Form>  
            </div>
        </Modal>
    )
}

export default EditPackageModal