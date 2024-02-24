import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import { AiOutlineLeft } from "react-icons/ai"
const { TextArea } = Input;
import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
//import DatePicker from "react-multi-date-picker";
import styleForm from "./PersonalMessage.module.css";
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
const { Option } = Select;
const { Dragger } = Upload;

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

const PersonalMessage = () => {
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
        <Link to={'/message'}>
          <div className={styleForm.recentMessage}>
            <div className={styleForm.arrowIcon}><AiOutlineLeft /></div>
            <div>John Doe</div>
          </div>
        </Link>
      </div>
      <div className={styleForm.messageBox}>
        <div className={styleForm.newMessage}>
          <div>
            <div className={styleForm.allMessage}>
              <div className={styleForm.personalMessage}>
                <div>
                  <p className={styleForm.personalBox}>Lorem ipsum dolor sit amet consectetur. Amet in volutpat venenatis proin non luctus enim in. Eget magna pharetra suscipit ullamcorper semper quis semper. Mattis nisi urna eget blandit non tempor vitae sagittis quam. Etiam sit pellentesque pharetra lectus mi accumsan. Id sit volutpat convallis adipiscing id enim varius pellentesque duis. At urna tincidunt cursus eget velit adipiscing integer varius etiam.</p>
                  <p className={styleForm.time}>55 mins ago</p>
                </div>
                <img src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80' className={styleForm.personalImage} height={40} width={40} />
              </div>
            </div>
            <div>
              <div className={styleForm.personalMessage}>
                <div>
                  <p className={styleForm.personalBox}>Lorem ipsum dolor sit amet consectetur. Amet in volutpat venenatis proin non luctus enim in. Eget magna pharetra suscipit ullamcorper semper quis semper. Mattis nisi urna eget blandit non tempor vitae sagittis quam. Etiam sit pellentesque pharetra lectus mi accumsan. Id sit volutpat convallis adipiscing id enim varius pellentesque duis. At urna tincidunt cursus eget velit adipiscing integer varius etiam.</p>
                  <p className={styleForm.time}>55 mins ago</p>
                </div>
                <img src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80' className={styleForm.personalImage} height={40} width={40} />
              </div>
            </div>
          </div>
          <div className={styleForm.inputBoxClass}>
            <input type="text" className={styleForm.inputBox} placeholder="Type Message" />
            <svg className={styleForm.messageIcon} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_367_14003)">
                <path d="M39.4457 1.52882L39.4457 1.52871C39.5003 1.39241 39.5136 1.2431 39.4841 1.09929C39.4546 0.955475 39.3836 0.823481 39.2798 0.71967C39.176 0.615861 39.044 0.544801 38.9001 0.515299C38.7563 0.485798 38.607 0.499153 38.4707 0.55371L38.4706 0.553751L2.10312 15.1013L2.01372 15.137H2.01082L0.970172 15.5514C0.841758 15.6027 0.73 15.6884 0.647245 15.7991C0.56449 15.9099 0.513959 16.0413 0.501232 16.179C0.488505 16.3167 0.514078 16.4552 0.575128 16.5792C0.636175 16.7033 0.730323 16.808 0.847172 16.8819L0.847693 16.8823L1.87269 17.5323L1.99 17.6066L1.99267 17.612L14.3633 25.4827L14.4571 25.5423L14.5168 25.6361L22.4323 38.0773L22.4376 38.0826L22.4672 38.1292L23.1166 39.1534L39.4457 1.52882ZM39.4457 1.52882L24.4457 39.0288L24.4456 39.0289M39.4457 1.52882L24.4456 39.0289M24.4456 39.0289C24.3944 39.1571 24.3088 39.2686 24.1983 39.3512C24.0878 39.4338 23.9566 39.4844 23.8192 39.4972C23.6818 39.5101 23.5435 39.4848 23.4195 39.4242C23.2959 39.3636 23.1913 39.2703 23.1172 39.1542L24.4456 39.0289ZM16.1705 25.4429L16.5051 25.9689L16.946 25.5281L35.5345 6.93952H35.6688L35.7943 6.6248L36.9693 3.6798L37.401 2.59773L36.3193 3.03025L33.3743 4.20775L33.279 4.24587L33.2064 4.31846L14.4714 23.0535L14.0305 23.4943L14.5566 23.8289L15.4016 24.3664L15.4019 24.3666C15.4949 24.4257 15.5738 24.5045 15.6329 24.5976L15.633 24.5979L16.1705 25.4429Z" fill="#F66D0F" stroke="#F66D0F" />
              </g>
              <defs>
                <clipPath id="clip0_367_14003">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PersonalMessage;
