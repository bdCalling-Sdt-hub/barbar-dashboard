import React, { useState } from 'react'
import { Button, Upload, Modal} from "antd";
import { CiCamera, CiLight } from "react-icons/ci";
import { baseURL } from '../../Config';

const EditPackageModal = ({
    packeageUpdateModel, 
    setPackeageUpdateModel,
    packageData
}) => {
    const [imageUrl, setImageUrl] = useState();
    const [pakageName, setPackeName] = useState(packageData?.package_name);
    const [packageDuration, setPackageDuration] = useState(packageData?.package_duration);
    const [packageFeautes, setPackageFeatures] = useState(packageData?.package_features);
    const [newFeatures, setNewFeatures] = useState([])
    console.log(newFeatures);
    const onChange = ({ fileList }) => {
        setImageUrl(fileList[0].originFileObj);
    };
    const handleSubmit= async(e)=>{
        e.preventDefault();

        const value={
            package_name : pakageName ? pakageName : packageData?.package_name,
            package_duration: packageDuration ? packageDuration : packageData?.package_duration,
            price: packageData?.price,
            package_features: packageData.package_features
        }
        const response = await baseURL.post(`/update-package/${packageData?.id}`, value, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        console.log(response);
        if(response?.status === 200){
            setPackeageUpdateModel(false);
            setRefresh('done')
        }
    }

    const handleChange=(e)=>{
        setNewFeatures((prev)=> [...prev, e])
    }
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
                <form onSubmit={handleSubmit}>
                    <div style={{marginBottom : "20px"}}>
                        <label >Package name</label>
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
                                value={pakageName} 
                                name="category_name"
                                onChange={(e)=>setPackeName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{marginBottom : "20px"}}>
                        <div style={{marginBottom : "12px"}}>
                            <label >Package Duration</label>
                        </div>
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
                            value={packageDuration} 
                            name="category_name"
                            onChange={(e)=>setPackageDuration(e.target.value)}
                        />
                    </div>

                    <div style={{marginBottom : "34px"}}>
                        <div style={{marginBottom : "12px"}}>
                            <label >Package features</label>
                        </div>
                        {
                            packageFeautes?.map((item, index)=>
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
                                        marginBottom : "20px"
                                    }}
                                    type="text" 
                                    placeholder="Enter Category name" 
                                    value={item} 
                                    name="featues_name"
                                    onChange={(e)=>handleChange(e.target.value)}
                                />
                                
                            )
                        }
                        
                    </div>


                    <div>
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

export default EditPackageModal