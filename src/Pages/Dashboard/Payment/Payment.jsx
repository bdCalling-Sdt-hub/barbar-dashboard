import React from "react";
import styles from "./Payment.module.css";
import TransactionRatio from "./TransactionRatio";
import TransactionTable from "./TransactionTable";

function Payment() {
  return (
    <>
      <div>
        <h1 className={styles.paymentTitle}>Transaction Ratio</h1>
        <div className={styles.ratioContainer}>
          <TransactionRatio />
        </div>
        <h1 className={styles.paymentTitle2}>Recent Transaction</h1>
        <TransactionTable />
      </div>
    </>
  );
}

export default Payment;
