import { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import "./Scatter.css";

interface Props {
  dataFromProps: any;
}

const CustomizedDot = (props: any) => {
  return <circle className="circle" cx={props.cx} cy={props.cy} r={10} />;
};

const ScatterChartCustom = (props: Props) => {
  const { dataFromProps } = props;
  const [state, setState] = useState([]);
  useEffect(() => {
    setState(dataFromProps);
  }, [dataFromProps]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart width={400} height={400}>
        <CartesianGrid />
        <Tooltip />
        <XAxis type="category" dataKey="group" />
        <YAxis type="number" dataKey="percentage" />
        <Scatter data={state} shape={CustomizedDot} />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterChartCustom;
