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
  dataFunction: Function;
}

const LineChartComponent = (props: Props) => {
  const { keyName, dataFunction } = props;

  const [data, setData] = React.useState();
  React.useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { data: response },
        } = await dataFunction();
        const mapped: any = response.map((elem: any) => ({
          ...elem,
          percentage: parseFloat(elem.percentage),
        }));
        setData(mapped);
      } catch (error) {}
    }
    fetchData();
  }, []);
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
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey={"group"} padding={{ left: 60, right: 60 }} />

        <YAxis type="number" axisLine={false}>
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
