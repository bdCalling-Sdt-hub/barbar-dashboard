import { Button, Col, DatePicker, Image,Form, Input, Row, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { baseURL, url } from "../../../Config";
import Swal from "sweetalert2"

const PersonalInfo = () => {
  const [profileEdit, setProfileEdit] = useState(false);
  const [value, setValue] = useState("");
  const [data, setData] = useState("");
  const profile = JSON.parse(localStorage.getItem('userInfo'));
  const [image, setImage] = useState(profile?.image ? `${url}/${profile?.image}` : person);
  const [imgURL, setImgURL] = useState(image);
  if(data){
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  const handleChange = () => {
    setProfileEdit(true);
  };

  const onChange = (e) => {
    const file= e.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    setImgURL(imgUrl);
    setImage(file)
};
    
  const handleUpdate=async(values)=>{
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("phone_number", values.phone_number);
      formData.append("email", values.email);
      formData.append("image", image);
      if(image){
          formData.append("image", image);
      }
      const response = await baseURL.post(`/profileUpdate`, formData, {
          headers: {
            "Content-Type": 'multipart/form-data',
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
          }
      });

      if(response?.data.status === true){
          Swal.fire({
              position: "center",
              icon: "success",
              title: "Profile Update Successful",
              showConfirmButton: false,
              timer: 1500
          }).then(()=>{
              location.reload();
          })
      };
     
     localStorage.setItem('userInfo', JSON.stringify(response?.data?.Data)) 
      
  }

    const initialFormValues = {
        name: profile?.name,
        email: profile?.email,
        phone_number: profile?.phone_number,
        image: profile?.image,
        address: profile?.address,
    };

  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/profile`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setData(response?.data);
    }
    getAPi();
  }, []);

  return (
    <>
      {
        !profileEdit ? 
        
        (
        <>
          <div
            style={{
              backgroundColor: "#364153",
              display: "flex",
              alignItems : "center",
              justifyContent: "space-between",
              paddingLeft: "30px",
              paddingRight: "30px",
              paddingTop: "16px",
              paddingBottom: "16px",
              marginBottom: "20px",
              height: "174px",
              borderRadius: "8px"
            }}
          >
            <div>
              <div style={{ display: "flex", gap: "20px" }}>
                <Image
                  width={142}
                  height={142}
                  style={{ borderRadius: "8px" }}
                  src={`${url}/${data?.image}`}
                />
                <div style={{ marginTop: "50px" }}>
                  <h2>{data?.name}</h2>
                  <p style={{marginTop : "16px"}}>{data?.email}</p>
                </div>
              </div>
            </div>
            <div>
              <Button
                onClick={handleChange}
                style={{
                  width : "76px",
                  background: "#F66D0F",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent : "center",
                  margin: 0,
                  padding: 0
                }}
              >
                <LiaEditSolid fontSize={18} />
                Edit
              </Button>
            </div>
          </div>
          
          <Row style={{ marginBottom: "15px" }}>
            <Col span={24}>
              
            <div style={{marginBottom: "12px"}}>
              <label htmlFor="">Name</label>
            </div>
            <div style={{ height: "52px", display: "flex", alignItems: "center", paddingLeft: "16px", borderRadius: "8px", background : "#364153", color: "#FFFFFF" , border : "none"}}>{data?.name}</div>
              
            </Col>
          </Row>
          <Row style={{ marginBottom: "15px" }}>
            <Col span={24}>
            <div style={{marginBottom: "12px"}}>
              <label htmlFor="">Email</label>
            </div>
            <div 
              style={{ 
                height: "52px", 
                display: "flex", 
                alignItems: "center", 
                paddingLeft: "16px", 
                borderRadius: "8px", 
                background : "#364153", 
                color: "#FFFFFF" , 
                border : "none"}}
            >
              {data?.email}
            </div>

            </Col>
          </Row>
          <Row style={{ marginBottom: "15px" }}>
            <Col span={24}>
            <div style={{marginBottom: "12px"}}>
              <label htmlFor="">Address</label>
            </div>

            <div 
              style={{ 
                height: "52px", 
                display: "flex", 
                alignItems: "center", 
                paddingLeft: "16px", 
                borderRadius: "8px", 
                background : "#364153", 
                color: "#FFFFFF" , 
                border : "none"}}
            >
              {data?.address}
            </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: "15px" }}>
            <Col span={24}>

              <div style={{marginBottom: "12px"}}>
                <label htmlFor="">Phone Number</label>
              </div>
              <div 
              style={{ 
                height: "52px", 
                display: "flex", 
                alignItems: "center", 
                paddingLeft: "16px", 
                borderRadius: "8px", 
                background : "#364153", 
                color: "#FFFFFF" , 
                border : "none"}}
            >
              {data?.phone_number}
            </div>
            </Col>
          </Row>
        </>
        ) 
        : 
        
        (
        <>
          <div
            style={{
              backgroundColor: "#364153",
              display: "flex",
              alignItems : "center",
              paddingLeft: "30px",
              paddingTop: "16px",
              paddingBottom: "16px",
              marginBottom: "20px",
              height: "174px",
              borderRadius: "8px"
            }}
          >
            <div>
              <div style={{ display: "flex", gap: "20px" }}>
              <img className="mx-auto rounded-full" src={imgURL} width={142} height={142} alt="" />
                <div style={{ marginTop: "50px" }}>
                  <h2>{data?.name}</h2>

                  <label htmlFor="img" style={{marginTop : "16px", cursor: "pointer", display: "block", color : "#F66D0F", fontSize: "18px", fontWeight: "600"}}>Change Photo</label>
                  <input style={{display: "none"}} onChange={onChange}  type="file" name="" id="img" />
                </div>
              </div>
            </div>
          </div>

          <Form
            
            initialValues={initialFormValues}
            onFinish={handleUpdate}
          >
            <div style={{marginBottom: "12px"}}>
              <label style={{color: "white"}} htmlFor="">Name</label>
            </div>
            <Form.Item  
              name="name"
            >
                <Input
                  style={{ height: "52px", border : "none", background : "#364153", color: "#FFFFFF"  }}
                />
            </Form.Item>   

            <div style={{marginBottom: "12px"}}>
              <label style={{color: "white"}} htmlFor="">Email</label>
            </div>
            <Form.Item
                name="email"
            >
              <Input
                style={{ height: "52px", border : "none", background : "#364153", color: "#FFFFFF"  }}
              />
            </Form.Item>

            <div style={{marginBottom: "12px"}}>
              <label style={{color: "white"}} htmlFor="">Phone Number</label>
            </div>
            <Form.Item 
              name="phone_number"
            >  
              <Input
                style={{ height: "52px", border : "none", background : "#364153", color: "#FFFFFF"  }}
              />
            </Form.Item>

            <div style={{marginBottom: "12px"}}>
              <label style={{color: "white"}} htmlFor="">Address</label>
            </div>
            <Form.Item
                name="address"
            >    
                <Input
                    style={{ height: "52px", border : "none", background : "#364153", color: "#FFFFFF"  }}
                />
            </Form.Item>

            <Form.Item>
              <button type="submit" style={{
                  height: "45px",
                  background: "#F66D0F",
                  color: "#fff",
                  marginTop: "20px",
                  border: "none",
                  width : "100%",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}>Update Profile</button>
            </Form.Item>
              
          </Form> 
        </>
      )}
    </>
  );
};

export default PersonalInfo;
