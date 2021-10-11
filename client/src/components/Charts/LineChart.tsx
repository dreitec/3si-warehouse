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
}
const data = [
  {
    name: "June 2021",
    number: 1000,
    percentage: 20,
  },
  {
    name: "June 2021",
    number: 3000,
    percentage: 60,
  },
  {
    name: "June 2021",
    number: 2000,
    percentage: 40,
  },
  {
    name: "June 2021",
    number: 4000,
    percentage: 80,
  },
  {
    name: "June 2021",
    number: 2000,
    percentage: 40,
  },
];
const LineChartComponent = (props: Props) => {
  const { keyName } = props;
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
        <XAxis dataKey={keyName} padding={{ left: 60, right: 60 }} />
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
