import {
  Button,
  Col,
  Form,
  Input,
  Pagination,
  Radio,
  Row,
  Select,
  Upload,
  message,
} from "antd";
const { TextArea } = Input;
import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
//import DatePicker from "react-multi-date-picker";
import styleForm from "./Message.module.css";
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
const { Option } = Select;
const { Dragger } = Upload;

const data = [
  {
    id: 1234,
    sender: "John Doe",
    message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con"
  },
  {
    id: 1234,
    sender: "John Doe",
    message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con"
  },
  {
    id: 1234,
    sender: "John Doe",
    message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con"
  },
  {
    id: 1234,
    sender: "John Doe",
    message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con"
  },
  {
    id: 1234,
    sender: "John Doe",
    message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con"
  },
  {
    id: 1234,
    sender: "John Doe",
    message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con"
  },
]

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const Message = () => {
  const [formType, setFormType] = useState("host");

  const [selectedCountry, setSelectedCountry] = useState("usa");

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  const style = {
    formContainer: {
      background: "white",
      padding: "30px",
      borderRadius: "10px",
    },
    formNavigateBtn: {
      height: "50px",
    },
    input: {
      height: "45px",
    },
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
          height: "45px",
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div style={{ padding: "0 60px" }}>
      <div>
        <form>
          <div style={{ marginBottom: "50px" }}>
            {/* <input className={`${styleForm.sendAllMessageInputBox}`} type='text' placeholder="Write message"/> */}
            <TextArea rows={8} className={styleForm.sendMessage} style={{ background: '#364153', color: '#FFF' }} placeholder="Write Message" />
            <div>
              <input className={`${styleForm.sendAllButton}`} type="submit" value={'Send to All'} />
            </div>
          </div>
          <Row style={{ marginBottom: "50px" }}>
            <h2 className={styleForm.h2Design}>
              Search Messages
            </h2>
            <Col lg={{ span: 24 }} style={{ marginTop: "30px" }}>
              <div className='' style={{ display: "flex", gap: "15px" }}>
                <Input className={styleForm.searchMessageInput} size="large" placeholder="Search by name/ID" prefix={<SearchOutlined style={{ color: "#CFCFD0" }} />} />
                <Button className={styleForm.searchMessageInput} style={{ height: "50px", width: "300px", backgroundColor: "#F66D0F", color: "#fff", fontSize: "20px" }}>Search</Button>
              </div>
            </Col>
          </Row>
          <Row>
            <h2 className={styleForm.h2Design}>
              Recent Messages
            </h2>
            {
              Array.isArray(data) ?
                (<>
                  {
                    data.map((item, index) => {

                      <div className={styleForm.recentMessage}>
                        <div className={styleForm.recentMessageInfo}>
                          <img className={styleForm.recentMessageImage} height={"40px"} width={"40px"} src={`${item.image}`} />
                          <div className={styleForm.recentMessageSender}>{item.sender}</div>

                        </div>
                        <div className={styleForm.recentMessageDetails}>{item.message}</div>
                        <svg className={styleForm.recentMessageIcon} width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="60" height="60" rx="8" fill="#F66D0F" />
                          <path d="M35.98 28.79V32.79C35.98 33.05 35.97 33.3 35.94 33.54C35.71 36.24 34.12 37.58 31.19 37.58H30.79C30.54 37.58 30.3 37.7 30.15 37.9L28.95 39.5C28.42 40.21 27.56 40.21 27.03 39.5L25.83 37.9C25.7 37.73 25.41 37.58 25.19 37.58H24.79C21.6 37.58 20 36.79 20 32.79V28.79C20 25.86 21.35 24.27 24.04 24.04C24.28 24.01 24.53 24 24.79 24H31.19C34.38 24 35.98 25.6 35.98 28.79Z" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M39.98 24.79V28.79C39.98 31.73 38.63 33.31 35.94 33.54C35.97 33.3 35.98 33.05 35.98 32.79V28.79C35.98 25.6 34.38 24 31.19 24H24.79C24.53 24 24.28 24.01 24.04 24.04C24.27 21.35 25.86 20 28.79 20H35.19C38.38 20 39.98 21.6 39.98 24.79Z" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M31.4955 31.25H31.5045" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M27.9955 31.25H28.0045" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M24.4955 31.25H24.5045" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      { console.log(item.image) }
                    }
                    )}
                </>) : (<>
                  <div className={styleForm.recentMessage}>
                    No message found
                  </div>
                </>)
            }
            {
              Array.isArray(data) ? (
                <>
                  {
                    data.map((item, index) => (
                      <div className={styleForm.recentMessage} key={index}>
                        <div className={styleForm.recentMessageInfo}>
                          <img className={styleForm.recentMessageImage} height={"40px"} width={"40px"} src='src\Images\Photo.png' />
                          <div className={styleForm.recentMessageSender}>{item.sender}</div>
                        </div>
                        <div className={styleForm.recentMessageDetails}>{item.message}</div>
                        <div className={styleForm.recentMessageIcon} >
                          <Link to={`/message/${item.id}`}>
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="60" height="60" rx="8" fill="#F66D0F" />
                              <path d="M35.98 28.79V32.79C35.98 33.05 35.97 33.3 35.94 33.54C35.71 36.24 34.12 37.58 31.19 37.58H30.79C30.54 37.58 30.3 37.7 30.15 37.9L28.95 39.5C28.42 40.21 27.56 40.21 27.03 39.5L25.83 37.9C25.7 37.73 25.41 37.58 25.19 37.58H24.79C21.6 37.58 20 36.79 20 32.79V28.79C20 25.86 21.35 24.27 24.04 24.04C24.28 24.01 24.53 24 24.79 24H31.19C34.38 24 35.98 25.6 35.98 28.79Z" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M39.98 24.79V28.79C39.98 31.73 38.63 33.31 35.94 33.54C35.97 33.3 35.98 33.05 35.98 32.79V28.79C35.98 25.6 34.38 24 31.19 24H24.79C24.53 24 24.28 24.01 24.04 24.04C24.27 21.35 25.86 20 28.79 20H35.19C38.38 20 39.98 21.6 39.98 24.79Z" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M31.4955 31.25H31.5045" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M27.9955 31.25H28.0045" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M24.4955 31.25H24.5045" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    ))
                  }
                </>
              ) : (
                <div className={styleForm.recentMessage}>
                  No message found
                </div>
              )
            }
          </Row>

          <Row
          style={{
            background: "#364153",
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          <Col lg={{ span: 12 }} style={{ marginBottom: "20px" }}>
            <h1
              style={{
                fontSize: "20px",
                color: "#F66D0F",
                marginTop: "18px",
                paddingLeft: "10px",
                fontWeight:"600"
              }}
            >
              Showing 1-10 OF 250
            </h1>
          </Col>
          <Col lg={{ span: 8, offset: 4 }}>
            <Pagination
              defaultCurrent={1}
              total={5000}
              showQuickJumper={false}
              showSizeChanger={false}
            />
          </Col>
        </Row>
        </form>
      </div>
    </div>
  );
};

export default Message;
