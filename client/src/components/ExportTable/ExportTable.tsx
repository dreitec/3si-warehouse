import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

interface Props {
  dataFromProps: any[];
}
interface IState {
  headers: string[];
  data: any[];
}
export default function BasicTable(props: Props) {
  const [state, setState] = React.useState<IState>({ headers: [], data: [] });
  const { dataFromProps } = props;
  const extractHeaders = (data: any) => {
    return Object.keys(data);
  };
  React.useEffect(() => {
    if (dataFromProps.length === 0) return;
    const headers = extractHeaders(dataFromProps[0]);
    setState({ headers, data: dataFromProps });
  }, [dataFromProps]);
  return (
    <TableContainer
      sx={{ maxHeight: 600, overflowY: "auto" }}
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} aria-label="Export table">
        <TableHead>
          <TableRow>
            {state.headers.map((elem: string) => (
              <TableCell key={`${elem}`}>{elem}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {state.data.map((row) => (
            <TableRow
              key={`${row.CHILD_ID}-${row.CHILD_ID}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {state.headers.map((elem: string) => (
                <TableCell key={`${elem}-child`}>{row[elem]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
