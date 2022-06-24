import React from "react";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { rupiah } from "../../utils/currency";

interface IRows {
  id: string;
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
  hexColor: string;
  description: string;
  category: string;
  venue_id: string;
  venue_name: string;
  status: string;
  total: number;
  uniqueCode: string;
  hours: number;
  phone: string;
}

export const TableComponent: React.FC<{
  dataRows: IRows[];
  totalMoney: number;
}> = ({ dataRows, totalMoney }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{ fontWeight: "bold" }}>
            <TableCell align="center" size="small">
              No.
            </TableCell>
            <TableCell align="center">Nama</TableCell>
            <TableCell align="center">Organisasi/Tim</TableCell>
            <TableCell align="center">Kontak</TableCell>
            <TableCell align="center">Venue</TableCell>
            <TableCell align="center">Kategori</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Durasi</TableCell>
            <TableCell align="center">Waktu</TableCell>
            <TableCell align="center">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataRows.map((row, i) => (
            <TableRow
              key={row.id ?? i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{i + 1}</TableCell>
              <TableCell align="center">{row.title.split("-")[0]}</TableCell>
              <TableCell align="center">{row.title.split("-")[1]}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">{row.venue_name}</TableCell>
              <TableCell align="center">{row.category.toUpperCase()}</TableCell>
              <TableCell align="center">
                <Chip
                  label={row.status}
                  color={row.status === "BOOKED" ? "primary" : "success"}
                />
              </TableCell>
              <TableCell align="center">{row.hours} Jam</TableCell>
              <TableCell align="center">
                {moment(row.start).format("DD MMM YYYY")}
              </TableCell>
              <TableCell align="center">
                <p style={{ fontWeight: 600 }}>
                  {rupiah(row.status === "BOOKED" ? row.total / 2 : row.total)}
                </p>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={7} align="right">
              <p style={{ margin: 0, fontSize: 24 }}>Total</p>
            </TableCell>
            <TableCell colSpan={3} align="right">
              <p style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
                {rupiah(totalMoney)}
              </p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
