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
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import styled from "@mui/system/styled";
import { Button } from "../";

const ButtonsGridItem = styled(Grid)(() => ({
  textAlign: "right",
}));
interface IPaginationProps {
  rowsPerPage: number;
  page: number;
  count: number;
  onPageChange: Function;
}

interface SearchFunc {
  (event: React.ChangeEvent<HTMLInputElement>): void;
}
interface Props {
  data: any[];
  paginationProps: IPaginationProps;
  handleInputChange: SearchFunc;
  inputValue: string;
  getData: Function;
  loading: boolean;
  exportData: Function;
  exportLoading: boolean;
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
    handleInputChange,
    inputValue,
    paginationProps: { onPageChange, ...otherProps },
    getData,
    loading,
    exportData,
    exportLoading,
  } = props;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log(newPage, otherProps, "handleChangepage");
    onPageChange(newPage);
  };
  return (
    <Container
      sx={{ backgroundColor: "transparent", padding: "0px !important" }}
    >
      <Typography variant="h6">Providers</Typography>
      <Container sx={{ marginTop: 2, padding: "0px !important" }}>
        <Grid container>
          <Grid item xs={4}>
            <TextField
              label="Provider Name"
              onChange={handleInputChange}
              value={inputValue}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={8} justifyContent="flex-end">
            <Grid container justifyContent="flex-end">
              <ButtonsGridItem item xs={2}>
                <Button
                  variant="outlined"
                  onClick={() => getData()}
                  loading={loading}
                >
                  Update
                </Button>
              </ButtonsGridItem>
              <ButtonsGridItem item xs={2}>
                <Button
                  variant="outlined"
                  onClick={() => exportData()}
                  loading={exportLoading}
                >
                  Export
                </Button>
              </ButtonsGridItem>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ padding: "0px !important" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{ backgroundColor: "#f3f5fb" }}
                  >
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
