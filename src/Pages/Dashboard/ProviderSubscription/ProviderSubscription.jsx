import React, { useState } from "react";
import styles from "./ProviderSubscription.module.css";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Button, Col, Checkbox, Dropdown, Row, Input, Modal, Form } from "antd";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

const stylee = {
  formContainer: {
    // background: "white",
    // padding: "30px",
    borderRadius: "10px",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "45px",
    marginBottom: "10px",
    backgroundColor: "#364153 !important",
  },
  notification: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "45px",
    marginTop: "10px",
    backgroundColor: "#364153",
    boxShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
    borderRadius: "6px",
    padding: "4px 15px",
    marginBottom: "15px",
  },
  option: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "45px",
    marginTop: "10px",
    backgroundColor: "#364153",
    boxShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
    borderRadius: "6px",
    padding: "4px 15px",
    marginBottom: "15px",
    cursor: "pointer",
  },
  input: {
    height: "45px",
  },
  otpInput: {
    width: "50px",
    height: "70px",
  },
  cardMenuBtn: {
    width: "100%",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    color: "#fff",
    gap: "5px",
  },
  ackgroundColor: "#364153 !important",
  // }
};

function ProviderSubscription() {
  const [openChangePassModel, setOpenChangePassModel] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  return (
    <div>
      <h2>Packages</h2>
      <div className={styles.packagesContainer}>
        <div className={styles.packageCard}>
          <div>
            <h3>Gold</h3>
            <span className={styles.threeDot}>
              <Dropdown
                overlay={
                  <div
                    style={{
                      background: "#0E1116",
                      borderRadius: "4px",
                      color: "#fff",
                      padding: "6px",
                    }}
                  >
                    <Button
                      type="text"
                      onClick={() =>
                        setOpenChangePassModel(!openChangePassModel)
                      }
                      style={stylee.cardMenuBtn}
                    >
                      <LiaEditSolid color="white" fontSize={16} />
                      Edit Card
                    </Button>
                    <Button
                      onClick={() => setOpenDeleteModel(!openDeleteModel)}
                      type="text"
                      style={{ ...stylee.cardMenuBtn, color: "#D7263D" }}
                    >
                      <RiDeleteBin6Line fontSize={16} />
                      Delete Card
                    </Button>
                  </div>
                }
                placement="bottomRight"
              >
                <Button type="text">
                  <BsThreeDotsVertical
                    color="white"
                    style={{ fontSize: "20px" }}
                  />
                </Button>
              </Dropdown>
            </span>
          </div>
          <div className={styles.packageDetails}>
            <div className={styles.packageOptionContainer}>
              <div className={styles.packageOption}>
                <div>Purchase for</div>
                <div>Package Validity</div>
              </div>
              <div className={styles.packageOption}>
                <div>$ 400</div>
                <div>6 Months</div>
              </div>
            </div>
            <hr style={{ color: "#535770" }} />
            <div>
              <div className={styles.packageFeatures}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Manage bookings.</span>
              </div>
              <div className={styles.packageFeatures}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Manage bookings.</span>
              </div>
              <div className={styles.packageFeatures}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Manage bookings.</span>
              </div>
            </div>

            <div>
              <button
                onClick={() => setOpenChangePassModel(!openChangePassModel)}
                className={styles.editBtn}
              >
                Edit Package
              </button>
            </div>
          </div>
        </div>
        <div className={styles.packageCard}>
          <div>
            <h3>Gold</h3>
            <span className={styles.threeDot}>
              <Dropdown
                overlay={
                  <div
                    style={{
                      background: "#0E1116",
                      borderRadius: "4px",
                      color: "#fff",
                      padding: "6px",
                    }}
                  >
                    <Button
                      type="text"
                      onClick={() =>
                        setOpenChangePassModel(!openChangePassModel)
                      }
                      style={stylee.cardMenuBtn}
                    >
                      <LiaEditSolid color="white" fontSize={16} />
                      Edit Card
                    </Button>
                    <Button
                      onClick={() => setOpenDeleteModel(!openDeleteModel)}
                      type="text"
                      style={{ ...stylee.cardMenuBtn, color: "#D7263D" }}
                    >
                      <RiDeleteBin6Line fontSize={16} />
                      Delete Card
                    </Button>
                  </div>
                }
                placement="bottomRight"
              >
                <Button type="text">
                  <BsThreeDotsVertical
                    color="white"
                    style={{ fontSize: "20px" }}
                  />
                </Button>
              </Dropdown>
            </span>
          </div>
          <div className={styles.packageDetails}>
            <div className={styles.packageOptionContainer}>
              <div className={styles.packageOption}>
                <div>Purchase for</div>
                <div>Package Validity</div>
              </div>
              <div className={styles.packageOption}>
                <div>$ 400</div>
                <div>6 Months</div>
              </div>
            </div>
            <hr style={{ color: "#535770" }} />
            <div>
              <div className={styles.packageFeatures}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Manage bookings.</span>
              </div>
              <div className={styles.packageFeatures}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Manage bookings.</span>
              </div>
              <div className={styles.packageFeatures}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Manage bookings.</span>
              </div>
            </div>

            <div>
              <button
                onClick={() => setOpenChangePassModel(!openChangePassModel)}
                className={styles.editBtn}
              >
                Edit Package
              </button>
            </div>
          </div>
        </div>
        <div className={styles.packageCard}>
          <div>
            <h3>Gold</h3>
            <span className={styles.threeDot}>
              <Dropdown
                overlay={
                  <div
                    style={{
                      background: "#0E1116",
                      borderRadius: "4px",
                      color: "#fff",
                      padding: "6px",
                    }}
                  >
                    <Button
                      type="text"
                      onClick={() =>
                        setOpenChangePassModel(!openChangePassModel)
                      }
                      style={stylee.cardMenuBtn}
                    >
                      <LiaEditSolid color="white" fontSize={16} />
                      Edit Card
                    </Button>
                    <Button
                      onClick={() => setOpenDeleteModel(!openDeleteModel)}
                      type="text"
                      style={{ ...stylee.cardMenuBtn, color: "#D7263D" }}
                    >
                      <RiDeleteBin6Line fontSize={16} />
                      Delete Card
                    </Button>
                  </div>
                }
                placement="bottomRight"
              >
                <Button type="text">
                  <BsThreeDotsVertical
                    color="white"
                    style={{ fontSize: "20px" }}
                  />
                </Button>
              </Dropdown>
            </span>
          </div>
          <div className={styles.packageDetails}>
            <div className={styles.packageOptionContainer}>
              <div className={styles.packageOption}>
                <div>Purchase for</div>
                <div>Package Validity</div>
              </div>
              <div className={styles.packageOption}>
                <div>$ 400</div>
                <div>6 Months</div>
              </div>
            </div>
            <hr style={{ color: "#535770" }} />
            <div>
              <div className={styles.packageFeatures}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Manage bookings.</span>
              </div>
              <div className={styles.packageFeatures}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Manage bookings.</span>
              </div>
              <div className={styles.packageFeatures}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Manage bookings.</span>
              </div>
            </div>

            <div>
              <button
                onClick={() => setOpenChangePassModel(!openChangePassModel)}
                className={styles.editBtn}
              >
                Edit Package
              </button>
            </div>
          </div>
        </div>
 
      </div>
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
          onClick={() => setOpenChangePassModel(!openChangePassModel)}
        >
          Add new package
        </button>
      </div>

      <Modal
        title={<p style={{ marginBottom: "30px" }}>Add new package</p>}
        centered
        open={openChangePassModel}
        onCancel={() => setOpenChangePassModel(false)}
        width={500}
        footer={[]}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          //   onFinish={handleChangePassword}
        >
          <div>
            <label htmlFor="" className={styles.label}>
              Package name
            </label>
            <Form.Item name="PackageNname">
              <Input
                placeholder="Enter package name"
                type="text"
                style={stylee.input}
              />
            </Form.Item>
          </div>

          <div>
            <label htmlFor="">Package duration</label>
            <Form.Item name="newPassword">
              <Input
                type="password"
                placeholder="Enter package duration"
                style={stylee.input}
              />
            </Form.Item>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <Checkbox>Add unlimited services for your business.</Checkbox>
            <Checkbox>Edit service details.</Checkbox>
            <Checkbox>Manage bookings.</Checkbox>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              style={{
                height: "45px",
                fontWeight: "400px",
                fontSize: "18px",
                background: "#F66D0F",
                marginTop: "60px",
              }}
            >
              Add Package
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        centered
        open={openDeleteModel}
        onCancel={() => setOpenDeleteModel(false)}
        width={500}
        footer={[]}
      >
        <div className={styles.deleteModal}>
          <img src="https://i.ibb.co/K0PNtNc/Delete-icon.png" alt="" />
          <h3>You sure want to delete this package?</h3>

          <div style={{display:"flex",gap:"5px"}}><button className={styles.editBtn}>Yes</button> <button className={styles.editBtn}>No</button></div>
        </div>
      </Modal>
    </div>
  );
}

export default ProviderSubscription;
