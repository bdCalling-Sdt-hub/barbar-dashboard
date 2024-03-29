import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Button, Col, Row } from 'antd';
import { baseURL } from '../../../Config';
import Swal from "sweetalert2";
const TermsAndCondition = () => {

  const [data, setData]=useState({})
  const editor = useRef(null)
  const [content, setContent] = useState("");

  const [refreash, setRefreash] = useState('')


  const handleUpdate = async() => {
    const response = await baseURL.post(`/update-website-pages/8`, {page_description:content}, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
    });
    if(response?.status=== 200){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Terms & Conditions Updated Successfully",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        setRefreash("done")
      });
    }

  }
  
  if(refreash){
    setTimeout(()=>{
      setRefreash("")
    },[1500])
  }

  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/show-single-pages/8`,{
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


  return (
    <div>
      <div style={{color:"black"}}>
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => {
            setContent(newContent);
          }}
        />
      </div>
      <Button
        onClick={handleUpdate}
        htmlType='submit'
        block 
        style={{ 
          marginTop: "30px", 
          backgroundColor: "#F66D0F", 
          color: "#fff", 
          height: "50px" 
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default TermsAndCondition;



























