import React, { useState } from "react";
import styles from "./ProviderRequest.module.css";
import { Button, Drawer, Space, Table, Typography, Pagination } from "antd";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import { CloseOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

function ProviderRequestInfo() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [providerRequestData, setProviderRequestData] = useState(null);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setProviderRequestData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setProviderRequestData(null);
  };
  return (
    <>
      <div className={styles.providerContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div className={styles.cardContainer}>
            <div>
              <img
                style={{ borderRadius: "100%" }}
                src="https://i.ibb.co/x6bYtBv/Photo-1.png"
                alt=""
              />
            </div>
            <div>
              <div className={styles.info}>
                <h3 style={{ color: "#F66D0F" }}>Jane Cooper</h3>
                <p>example@gmail.com</p>
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.btn}>Cancel</button>{" "}
                <button onClick={showDrawer} className={styles.btn1}>
                  Approve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.PaginationContainer}>
        <h3 style={{ color: "#F66D0F" }}> SHOWING 1-10 OF 250</h3>
        <Pagination defaultCurrent={1} total={50} />
      </div>

      <Drawer
        title={
          <div>
            <Typography>
              <Title level={5} strong>
                Provider name- Jane Cooper
              </Title>
              <Text>See all details about this provider</Text>
            </Typography>
          </div>
        }
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={500}
        closable={false}
        extra={
          <Space>
            <button
              style={{
                borderRadius: "100%",
                backgroundColor: "#F66D0F",
                height: "50px",
                width: "50px",
                textAlign: "center",
                border: "2px solid white",
                cursor: "pointer",
              }}
              onClick={closeDrawer}
            >
              <CloseOutlined color="black" />
            </button>
          </Space>
        }
      >
        {providerRequestData && (
          <DrawerPage providerRequestData={providerRequestData} />
        )}
      </Drawer>
    </>
  );
}

export default ProviderRequestInfo;
