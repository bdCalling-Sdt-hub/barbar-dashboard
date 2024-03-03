import React, { useState, useEffect } from "react";
import styles from "./ProviderSubscription.module.css";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Button, Col, Checkbox, Dropdown, Row, Input, Modal, Form } from "antd";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { baseURL } from "../../../Config";
import { FaCheck } from "react-icons/fa6";
import DeletePackageModal from "../../../Components/Modal/DeletePackageModal";
import EditPackageModal from "../../../Components/Modal/EditPackageModal";
import Swal from "sweetalert2"


function ProviderSubscription() {
  const [packages, setPackages] = useState([]);
  const [packeageUpdateModel, setPackeageUpdateModel] = useState(false);
  const [addPackeageModel, setAddPackeageModel] = useState(false);
  const [packageData, setPackageData] = useState()
  const [refresh, setRefresh] = useState('')
  const [category, setCategory] = useState();
  const handleChange = (e) => {
    setCategory(prev=>({...prev, [e.target.name]:e.target.value}))
  }

  if(refresh){
    setTimeout(()=>{
      setRefresh("")
    }, [1500])
  }
  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`show-package`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setPackages(response?.data?.data);
    }
    getAPi();
  }, [refresh !== ""]);

  const handleGetValue=(value)=>{
    setPackageData(value);
    setPackeageUpdateModel(!packeageUpdateModel);
  }
  
  const handleAddPackage=async()=>{
    const array = category?.package_features.substring(1, category?.package_features?.length - 1).split(',').map(item => item.trim());
    const value= {
      package_name: category.package_name,
      package_duration: category.package_duration,
      package_features: JSON.stringify(array),
      price: parseInt(category.price)
    }
    if(category.package_name && category.package_duration && array && category.price){
      const response = await baseURL.post(`/add-package`, value, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      if(response?.data?.message === "Package add successfully"){
        Swal.fire({
          position: "center",
          icon: "success",
          title: response?.data?.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          setAddPackeageModel(false)
        })
      }

      
    }else{

    }
  }
  return (
    <div >
      <h2>Packages</h2>
      <div className={styles.packagesContainer} >

        {
          packages?.map((item, index)=>
            <div style={{height: "405px"}} key={index} className={styles.packageCard} >
              <div >
                <h3>{item?.package_name}</h3>
              </div>

              <div className={styles.packageDetails}>
                <div className={styles.packageOptionContainer}>
                  <div className={styles.packageOption}>
                    <div>Purchase for</div>
                    <div>Package Validity</div>
                  </div>
                  <div className={styles.packageOption}>
                    <div>$ {item?.price}</div>
                    <div>{item?.package_duration} Months</div>
                  </div>
                </div>
                <hr style={{ color: "#535770" }} />
                <div>
                  {
                   item?.package_features?.map((item, index)=> 
                      <div key={index} className={styles.packageFeatures}>
                        <FaCheck size={24} color="white" />
                        <span>{item}</span>
                    </div>
                    
                    )
                  }
                  <div>
                    <button
                      onClick={() => ( localStorage.setItem('package', JSON.stringify(item)), handleGetValue(item))}
                      className={styles.editBtn}
                    >
                      Edit Package
                    </button>
                  </div>
                </div>

                
              </div>
            </div>
          
          )
        }
 
      </div>

      {/* add package button container */}
      <div>
        <button
          style={{
            position: "absolute",
            bottom: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#F66D0F",
            border: "none",
            color: "white",
            fontSize: "18px",
            fontWeight: "500",
            padding: "10px 620px",
            marginBottom: "20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setAddPackeageModel(!packeageUpdateModel)}
        >
          Add new package
        </button>
      </div>

      {
        packeageUpdateModel && <EditPackageModal packageData={packageData} setRefresh={setRefresh} packeageUpdateModel={packeageUpdateModel} setPackeageUpdateModel= {setPackeageUpdateModel} />
      }

      {
        addPackeageModel
        &&
        <Modal
          title="Add new package"
          centered
          open={addPackeageModel}
          onCancel={() => setAddPackeageModel(false)}
          width={500}
          footer={false}
        >

          <div >
            <div style={{marginBottom : "20px"}}>
              <label >Package name</label>
              <div style={{
                  marginTop: "10px",
                  marginBottom: "10px"                            
              }}>
                  <input 
                    onChange={handleChange}
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
                      placeholder="Enter Package name"
                      name="package_name"
                  />
              </div>
            </div>

            <div style={{marginBottom : "20px"}}>
              <div style={{marginBottom : "12px"}}>
                  <label >Package Duration</label>
              </div>
              <input 
              onChange={handleChange}
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
                placeholder="Enter Package Duration"
                name="package_duration"
              />
            </div>

            <div style={{marginBottom : "20px"}}>
              <label >Package Price</label>
              <div style={{
                  marginTop: "10px",
                  marginBottom: "10px"                            
              }}>
                  <input 
                    onChange={handleChange}
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
                      type="number" 
                      placeholder="Enter Package Price"
                      name="price"
                  />
              </div>
            </div>

            <div style={{marginBottom : "34px"}}>
              <div style={{marginBottom : "12px"}}>
                <label >Package features</label>
              </div>
              <textarea 
                placeholder="Add feart, 3 MOnths, diffirent types of phote"
                onChange={handleChange}
                name="package_features"
                id="" 
                cols="30" 
                rows="10"
                style={{
                  width: "100%",
                  height: "202px",
                  border: "1px solid #535770",
                  borderRadius: "8px",
                  padding : "16px",
                  color: "black",
                  outline: "none",
                  backgroundColor: "#E9EAEC",
                }}
              ></textarea>
            </div>

            <div>
                <Button
                    type="primary"
                    onClick={handleAddPackage}
                    block
                    style={{
                        width : "100%",
                        height: "45px",
                        fontWeight: "400px",
                        fontSize: "18px",
                        background: "#F66D0F",
                    }}
                >
                    Add Package
                </Button>
            </div>
          </div>
        </Modal>
      }
    </div>
  );
}

export default ProviderSubscription;
