import React from "react";
import { BarChart } from "@mantine/charts";
import { data } from "../data";

const CustomerGrowth = () => {
  return (
    <div>
      <BarChart
        h={500}
        data={data}
        dataKey="month"
        series={[
          { name: "Smartphones", color: "violet.6" },
          { name: "Laptops", color: "blue.6" },
          { name: "Tablets", color: "teal.6" },
        ]}
        tickLine="y"
      />
    </div>
  );
};

export default CustomerGrowth;
