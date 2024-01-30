import React, { useCallback, useEffect, useState } from "react";
import MainLayout from "../../components/main-layout";
import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import useToast from "../../components/toast";
import http from "../../utils/http";
import { getStorageValue } from "../../utils/local-storage";
import moment from "moment";
import { IBookingList } from "./interface";

interface Column {
  id:
    | "booking_name"
    | "code"
    | "venue"
    | "time"
    | "phone"
    | "status"
    | "action";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "booking_name", label: "Booking Name", minWidth: 170, align: "center" },
  { id: "code", label: "Booking Code", minWidth: 200, align: "center" },
  {
    id: "venue",
    label: "Venue",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "time",
    label: "Time",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "phone",
    label: "Phone",
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "status",
    label: "Status",
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  booking_name: string;
  code: string;
  venue: string;
  time: string;
  phone: string;
  status: string;
  action: React.ReactNode;
}

function createData(
  booking_name: string,
  code: string,
  venue: string,
  time: string,
  phone: string,
  status: string
): Data {
  // const density = population / size;
  return {
    booking_name,
    code,
    venue,
    time,
    phone,
    status,
    action:
      status === "PAID" ? (
        <Button variant="contained" style={{ textTransform: "none" }}>
          Verify Code
        </Button>
      ) : (
        <Button variant="outlined" style={{ textTransform: "none" }}>
          Confirm
        </Button>
      ),
  };
}
// "name" | "code" | "venue" | "time" | "phone" | "status" |'action'
// const rows = [
//   createData(
//     "Jaka Irawan",
//     "B2302",
//     "Kujang Sport Arena",
//     "11 Des 2023 13:00 - 15:00",
//     "085708570857",
//     "PAID"
//   ),
//   createData(
//     "Doni Sawarma",
//     "B2322",
//     "212 Sport Arena",
//     "13 Des 2023 18:00 - 19:00",
//     "085708570857",
//     "SUBMITTED"
//   ),
// ];

const BookingListPartner: React.FC = () => {
  const [Toast, setToast] = useToast();
  const auth = getStorageValue("auth", { auth: "" });

  const [list, setList] = useState<Data[]>([]);

  const getDateRange = (firstDate: string, lastDate: string) => {
    if (
      moment(firstDate, "YYYY-MM-DD").isSame(
        moment(lastDate, "YYYY-MM-DD"),
        "day"
      )
    ) {
      return `${moment(firstDate).format("DD MMM YYYY hh:mm")} - ${moment(
        lastDate
      ).format("hh:mm")}`;
    } else {
      return `${moment(firstDate).format("DD MMM YYYY hh:mm")} - ${moment(
        lastDate
      ).format("DD MMM YYYY hh:mm")}`;
    }
  };

  const getListBooking = useCallback(async () => {
    try {
      const { data } = await http.get("/partner/booking/list", {
        headers: {
          Authorization: `Bearer ${auth.auth}`,
        },
      });

      const formatTime = data.data.map((v: IBookingList) => {
        const times = getDateRange(v.start_time, v.end_time);
        return {
          ...v,
          time: times,
        };
      });

      // console.log("list", formatTime);
      setList(formatTime);
    } catch (error) {
      setToast({ message: "Error get list" });
    }
  }, [auth.auth, setToast]);

  useEffect(() => {
    getListBooking();
  }, [getListBooking]);

  const handleChangePage = (event: unknown, newPage: number) => {
    // setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // setRowsPerPage(+event.target.value);
    // setPage(0);
  };

  return (
    <MainLayout>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Toast />
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
                    <b>{column.label}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })} */}
              {list.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell align="center">{row.booking_name}</TableCell>
                    <TableCell align="center">{row.code}</TableCell>
                    <TableCell align="center">{row.venue}</TableCell>
                    <TableCell align="center">{row.time}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row.status}
                        color={row.status === "PAID" ? "success" : "primary"}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {row.status === "PAID" ? (
                        <Button
                          variant="contained"
                          style={{ textTransform: "none" }}
                        >
                          Verify Code
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          style={{ textTransform: "none" }}
                        >
                          Confirm
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={20}
          rowsPerPage={10}
          page={1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </MainLayout>
  );
};

export default BookingListPartner;
