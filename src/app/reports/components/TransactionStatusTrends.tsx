import React from "react";
import { LineChart } from "@mantine/charts";
import { Linedata } from "../data";
const TransactionStatusTrends = () => {
  return (
    <div>
      <div>
        {" "}
        <LineChart
          h={400}
          data={Linedata}
          dataKey="date"
          series={[
            { name: "Apples", color: "indigo.6" },
            { name: "Oranges", color: "blue.6" },
          ]}
          curveType="linear"
        />
      </div>
    </div>
  );
};

export default TransactionStatusTrends;
