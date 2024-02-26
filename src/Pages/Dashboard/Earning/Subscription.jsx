import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import style from "./Earning.module.css";
import { useLocation } from "react-router-dom";
import SubscriptionHistoryTable from "./SubscriptionHistoryTable";
import { baseURL } from "../../../Config";

function Subscription() {
  const [data, setData] = useState();

  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`/payment-history-provider`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      // console.log(response.data.package_count);
      setData(response.data.package_count);
    }
    getAPi();
  }, []);

  return (
    <div style={{ padding: "0px 50px" }}>
      <h2 style={{ fontSize: "25px", fontWeight: "normal" }}>
        Subscription Packages
      </h2>
      <Row
        gutter={{
          xs: 8,
          sm: 18,
          md: 24,
          lg: 45,
        }}
        style={{ marginTop: "20px" }}
      >
        <Col className="gutter-row" span={8}>
          <div
            style={{
              background: `#F66D0F`,
            }}
            className={style.card}
          >
            <div>
              <h2 className={style.cardTitle}>{data?.gold_count}</h2>
              <div className={style.statusTitle}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.4833 22.1434H8.51665C8.02666 22.1434 7.47832 21.7584 7.31499 21.2918L2.48499 7.78175C1.79665 5.84509 2.60165 5.25008 4.25832 6.44008L8.80832 9.69509C9.56666 10.2201 10.43 9.95175 10.7567 9.10009L12.81 3.62842C13.4633 1.87842 14.5483 1.87842 15.2017 3.62842L17.255 9.10009C17.5817 9.95175 18.445 10.2201 19.1917 9.69509L23.4617 6.65008C25.2817 5.34342 26.1567 6.00842 25.41 8.12009L20.6967 21.3151C20.5217 21.7584 19.9733 22.1434 19.4833 22.1434Z"
                    fill="white"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.58337 25.6665H20.4167"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.0834 16.3335H16.9167"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <h2>Gold</h2>
              </div>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={8}>
          <div
            style={{
              background: `#F66D0F`,
            }}
            className={style.card}
          >
            <div>
              <h2 className={style.cardTitle}>{data?.diamond_count}</h2>
              <div className={style.statusTitle}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.4833 22.1434H8.51665C8.02666 22.1434 7.47832 21.7584 7.31499 21.2918L2.48499 7.78175C1.79665 5.84509 2.60165 5.25008 4.25832 6.44008L8.80832 9.69509C9.56666 10.2201 10.43 9.95175 10.7567 9.10009L12.81 3.62842C13.4633 1.87842 14.5483 1.87842 15.2017 3.62842L17.255 9.10009C17.5817 9.95175 18.445 10.2201 19.1917 9.69509L23.4617 6.65008C25.2817 5.34342 26.1567 6.00842 25.41 8.12009L20.6967 21.3151C20.5217 21.7584 19.9733 22.1434 19.4833 22.1434Z"
                    fill="white"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.58337 25.6665H20.4167"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.0834 16.3335H16.9167"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <h2>Diamond</h2>
              </div>
            </div>
          </div>
        </Col>

        <Col className="gutter-row" span={8}>
          <div
            style={{
              background: `#F66D0F`,
            }}
            className={style.card}
          >
            <div>
              <h2 className={style.cardTitle}>{data?.platinum_count}</h2>
              <div className={style.statusTitle}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.4833 22.1434H8.51665C8.02666 22.1434 7.47832 21.7584 7.31499 21.2918L2.48499 7.78175C1.79665 5.84509 2.60165 5.25008 4.25832 6.44008L8.80832 9.69509C9.56666 10.2201 10.43 9.95175 10.7567 9.10009L12.81 3.62842C13.4633 1.87842 14.5483 1.87842 15.2017 3.62842L17.255 9.10009C17.5817 9.95175 18.445 10.2201 19.1917 9.69509L23.4617 6.65008C25.2817 5.34342 26.1567 6.00842 25.41 8.12009L20.6967 21.3151C20.5217 21.7584 19.9733 22.1434 19.4833 22.1434Z"
                    fill="white"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.58337 25.6665H20.4167"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.0834 16.3335H16.9167"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <h2>Platinum</h2>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <h2
        style={{ fontSize: "25px", margin: "30px 0px", fontWeight: "normal" }}
      >
        Transaction History
      </h2>

      <SubscriptionHistoryTable />
    </div>
  );
}

export default Subscription;
