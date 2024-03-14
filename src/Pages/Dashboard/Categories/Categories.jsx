import React, { useState, useEffect } from "react";
import styles from "./Categories.module.css";
import { FaEdit } from "react-icons/fa";
import { FaRemoveFormat } from "react-icons/fa";
import { Button, Col, Checkbox, Upload, Row, Input, Modal, Form } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { CiCamera } from "react-icons/ci";
import { baseURL, url } from "../../../Config";

import { useSSR } from "react-i18next";
import EditModal from "../../../Components/Modal/EditModal";
import CategoryChangeModal from "../../../Components/Modal/CategoryChangeModal";
import DeleteCategoryModal from "../../../Components/Modal/DeleteCategoryModal";


const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};


const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};


function Categories() {
  const [OpenChangeModel, setOpenChangeModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState({});
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('access_token');
  const [refresh, setRefresh] = useState('')
  const navigate = useNavigate();


  useEffect(()=>{
    if(!userId){
      return navigate('/signin')
    }
  },[userId]);

  if(refresh){
    setTimeout(()=>{
      setRefresh("")
    }, [1500])
  }
    
    useEffect(()=>{
      async function getAPi(){
        const response = await baseURL.get(`/show-category`,{
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          }
        });
        setCategories(response?.data?.data);
      }
      getAPi();
    }, [refresh !== "" ]);

  const handleEdit=(value)=>{
    setCategory(value);
    setOpenEditModel(true);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Catagories</h2>
        <button
          onClick={() => setOpenChangeModel(!OpenChangeModel)}
          className={styles.btn}
        >
          Add new catagory
        </button>
      </div>
      <div className={styles.catagoriesContainer}>
      
        {categories?.map((item, index) => (
            <div
              onClick={() => handleEdit(item)}
              className={styles.singleCard}
              key={index}
            >
              <div className={styles.singleCatagories}>
                <img width={100} height={100} src={`${url}/${item?.category_image}`} alt="image" />
                  <div className={styles.editIcon}>
                    <FaEdit  />
                  </div>
                  
                <p>{item?.category_name}</p>
              </div>
            </div>
        ))}
      </div>

      {/* add category Modal */}
      {
        OpenChangeModel && <CategoryChangeModal setRefresh={setRefresh}  OpenChangeModel={OpenChangeModel} setOpenChangeModel={setOpenChangeModel}/>
      }

      {/* edit category Modal */}
      {
        openEditModel  && <EditModal setRefresh={setRefresh} setOpenDeleteModal={setOpenDeleteModal} category={category} category_name={category?.category_name} id={category.id} openEditModel={openEditModel} setOpenEditModel={setOpenEditModel}/>
      }
      

      {/* delete modal  */}
      {
        openDeleteModal && <DeleteCategoryModal setRefresh={setRefresh} openDeleteModal={openDeleteModal} setOpenDeleteModal= {setOpenDeleteModal} id={category?.id} />
      }

    </div>
  );
}

export default Categories;

