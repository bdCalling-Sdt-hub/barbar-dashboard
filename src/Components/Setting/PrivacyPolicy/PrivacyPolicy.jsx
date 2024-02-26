import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Button, Col, Row } from 'antd';
import { baseURL } from '../../../Config';

const PrivacyPolicy = () => {

  const [data, setData]=useState({})
  const editor = useRef(null)
  const [content, setContent] = useState("");

  const handleUpdate = () => {
    alert(content);

  }
  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/show-single-pages/4`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setData(response?.data?.data);
    }
    getAPi();
  }, []);
  /* Swal.fire({
    position: "center",
    icon: "success",
    title: "Update Successfully",
    showConfirmButton: false,
    timer: 1500
  }) */
  useEffect(()=>{
    setContent(data?.page_description);
  }, [data]);
  return (
    <div>
      
      <Row>
        <Col lg={{ span: 24 }}>

          <JoditEditor
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
