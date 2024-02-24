import React, { PureComponent } from "react";
import { Column } from "@ant-design/plots";

function TransactionRatio() {
  const data = [
    {
      type: "January",
      sales: 38,
    },
    {
      type: "February",
      sales: 52,
    },
    {
      type: "March",
      sales: 61,
    },
    {
      type: "April",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "June",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "August",
      sales: 38,
    },
  ];
  const config = {
    columnStyle:{
        fill: "#F66D0F",
        // fillOpacity: 0.8,
    },
    data,
    xField: "type",
    yField: "sales",
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  return <Column {...config} />;
}

export default TransactionRatio;
