import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Button, Col, Row } from 'antd';
import { baseURL } from '../../../Config';
import Swal from "sweetalert2";
const PrivacyPolicy = () => {

  const [data, setData]=useState({})
  const editor = useRef(null)
  const [content, setContent] = useState("");
  const [refreash, setRefreash] = useState('');

  const handleUpdate = async() => {
    const response = await baseURL.post(`/update-website-pages/4`, {page_description:content}, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
    });
    if(response?.status=== 200){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Update Successfully",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        setRefreash("done")
      });
    }

  }
  
  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/show-single-pages/5`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setData(response?.data?.data);
    }
    getAPi();
  }, [refreash !== ""]);
  
  useEffect(()=>{
    setContent(data?.page_description);
  }, [data]);

  const config = {
    style: {
      color: 'black', // Set initial font color to red
    },
  };
  return (
    <div>
      
      <Row>
        <Col lg={{ span: 24 }}>

          <JoditEditor
            config={config}
            ref={editor}
            value={content}

            onChange={newContent => { setContent(newContent) }}
          />

          <Button onClick={handleUpdate} block style={{ marginTop: "30px", backgroundColor: "#F66D0F", color: "#fff", height: "50px" }}>save</Button>

        </Col>
         
      </Row>
    </div>
  );
};

export default PrivacyPolicy;
