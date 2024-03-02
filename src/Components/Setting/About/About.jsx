import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Button, Col, Row } from 'antd';
import Swal from "sweetalert2";
import "./About.css"
import { baseURL } from '../../../Config';

const About = () => {
  const [data, setData]=useState({})
  const editor = useRef(null)
  const [content, setContent] = useState("");
  const [refreash, setRefreash] = useState('')

  if(refreash){
    setTimeout(()=>{
      setRefreash("")
    },[1500])
  }

  const handleUpdate = async() => {
    const response = await baseURL.post(`/update-website-pages/3`, {page_description:content}, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
    });
    console.log(response);
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
      const response = await baseURL.get(`/show-single-pages/3`,{
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
    autofocus : true ,
    cursorAfterAutofocus: 'end',
    style: {
      color: 'black'
    },
  };
  return (
    <div >
      
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

export default About;
