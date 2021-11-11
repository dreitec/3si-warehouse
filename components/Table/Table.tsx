import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

interface IPaginationProps {
  rowsPerPage: number;
  page: number;
  count: number;
  onPageChange: Function;
}

interface Props {
  data: any[];
  paginationProps: IPaginationProps;
}

interface Column {
  id: "NAME" | "EEC_REGIONNAME" | "ENROLLMENT" | "PROVIDER_TYPE" | "CAPACITY";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "NAME", label: "Provider Name" },
  { id: "EEC_REGIONNAME", label: "Region" },
  { id: "PROVIDER_TYPE", label: "Type" },
  {
    id: "ENROLLMENT",
    label: "enrollment",
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "CAPACITY",
    label: "Capacity",
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

export default function StickyHeadTable(props: Props) {
  const {
    data,
    paginationProps: { onPageChange, ...otherProps },
  } = props;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    onPageChange(newPage);
  };
  return (
    <Container sx={{ backgroundColor: "white" }}>
      <Typography variant="h6">Providers</Typography>
      <Container>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: any) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`${row.NAME}-row`}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          sx={{ borderRight: "1px solid black" }}
                          key={`${column.id}-${value}`}
                          align={column.align}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  {...otherProps}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[{ label: "10", value: 10 }]}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </Container>
  );
}
