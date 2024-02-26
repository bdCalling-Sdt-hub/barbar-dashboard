import React, { useState, useEffect } from "react";
import styles from "./ProviderSubscription.module.css";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Button, Col, Checkbox, Dropdown, Row, Input, Modal, Form } from "antd";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { baseURL } from "../../../Config";
import { FaCheck } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import DeletePackageModal from "../../../Components/Modal/DeletePackageModal";
import EditPackageModal from "../../../Components/Modal/EditPackageModal";



function ProviderSubscription() {
  const [packages, setPackages] = useState([]);
  const [packeageUpdateModel, setPackeageUpdateModel] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [packageData, setPackageData] = useState()
  const [refresh, setRefresh] = useState('')

  
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
  const handleDeleteValue=(value)=>{
    setPackageData(value);
    setOpenDeleteModal(true)
  }
  return (
    <div>
      <h2>Packages</h2>
      <div className={styles.packagesContainer}>

        {
          packages?.map((item, index)=>
            <div key={index} className={styles.packageCard}>
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
                      onClick={() => handleGetValue(item)}
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
          onClick={() => setPackeageUpdateModel(!packeageUpdateModel)}
        >
          Add new package
        </button>
      </div>

      {
        packeageUpdateModel && <EditPackageModal packageData={packageData} setRefresh={setRefresh} packeageUpdateModel={packeageUpdateModel} setPackeageUpdateModel= {setPackeageUpdateModel} />
      }

      {
        openDeleteModal && <DeletePackageModal setRefresh={setRefresh} openDeleteModal={openDeleteModal} setOpenDeleteModal= {setOpenDeleteModal} id={packageData?.id} />
      }
    </div>
  );
}

export default ProviderSubscription;
