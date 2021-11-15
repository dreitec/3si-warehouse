import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
interface Props {
  keyName: string;
  dataFromProps: any;
}

const LineChartComponent = (props: Props) => {
  const { keyName, dataFromProps } = props;
  const [data, setData] = React.useState();
  React.useEffect(() => {
    setData(dataFromProps);
  }, [dataFromProps]);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        style={{
          paddingTop: 50,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey={"group"} padding={{ left: 60, right: 60 }} />

        <YAxis
          type="number"
          axisLine={false}
          tickFormatter={(tick) => {
            var si = [
              { value: 1, symbol: "" },
              { value: 1e3, symbol: "k" },
              { value: 1e6, symbol: "M" },
              { value: 1e9, symbol: "G" },
              { value: 1e12, symbol: "T" },
              { value: 1e15, symbol: "P" },
              { value: 1e18, symbol: "E" },
            ];
            var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
            var i;
            for (i = si.length - 1; i > 0; i--) {
              if (tick >= si[i].value) {
                break;
              }
            }
            return (
              (tick / si[i].value).toFixed(0).replace(rx, "$1") + si[i].symbol
            );
          }}
          domain={keyName === "percentage" ? [1, 100] : [0, 1500000]}
        >
          <Label
            value={
              keyName === "percentage"
                ? `Data in percentage (%)`
                : "Data in numbers"
            }
            offset={0}
            position="insideLeft"
            angle={-90}
          />
        </YAxis>
        <Tooltip />

        <Line
          dataKey={keyName}
          stroke="#376EFF"
          activeDot={{ r: 8 }}
          color="#376EFF"
          strokeWidth={5}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
