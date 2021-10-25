import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography, Container } from "@mui/material";

interface Props {
  data: any[];
}

interface Column {
  id: "NAME" | "ENROLLMENT" | "PROVIDER_TYPE" | "CAPACITY";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "NAME", label: "Provider Name" },
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
  const { data } = props;

  return (
    <Container>
      <Typography variant="h6">Providers</Typography>
      <Container>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          sx={{ borderRight: "1px solid black" }}
                          key={column.id}
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
          </Table>
        </TableContainer>
      </Container>
    </Container>
  );
}
