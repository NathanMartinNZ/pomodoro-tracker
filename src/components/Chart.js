import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { BarChart, Bar, YAxis, XAxis, Tooltip } from "recharts";
import getAllPomodoros from "../utils/getAllPomodoros";

function Chart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllPomodoros();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <>
      <Box className="cust-chart">
        <Typography variant="h4">Chart</Typography>
        <BarChart
          width={600}
          height={400}
          data={data}
          margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
        >
          {/* <CartesianGrid vertical={false} /> */}
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip
            wrapperStyle={{
              borderColor: "white",
              boxShadow: "2px 2px 3px 0px rgb(204, 204, 204)",
            }}
            contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
            labelStyle={{ fontWeight: "bold", color: "#666666" }}
          />
          <Bar dataKey="count" fill="#3f51b5" dot={false} />
        </BarChart>
      </Box>
    </>
  );
}

export default Chart;
