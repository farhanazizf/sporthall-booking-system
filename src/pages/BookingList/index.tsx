import React, { useCallback, useEffect, useState } from "react";
import MainLayout from "../../components/main-layout";
import {
  Button,
  Chip,
  IconButton,
  InputAdornment,
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
import { ModalConfirmBooking } from "./component";
import { useHistory } from "react-router-dom";
import { ErrorTypes } from "../../utils/constant";
import { rupiah } from "../../utils/currency";
import { Input } from "../../components/ui/inputs";
import { Close, Search, Visibility, VisibilityOff } from "@mui/icons-material";

interface Column {
  id:
    | "booking_name"
    | "code"
    | "venue"
    | "time"
    | "phone"
    | "status"
    | "action"
    | "total";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "booking_name", label: "Booking Name", minWidth: 170, align: "center" },
  { id: "code", label: "Kode Booking", minWidth: 100, align: "center" },
  {
    id: "venue",
    label: "Venue",
    minWidth: 120,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "time",
    label: "Waktu",
    minWidth: 120,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "total",
    label: "Total",
    align: "center",
    format: (value: number) => rupiah(value),
  },
  {
    id: "phone",
    label: "No HP",
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
    label: "",
    minWidth: 130,
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
  total: number;
  action: React.ReactNode;
}

const initialFilter = { page: 0, limit: 10 };

const BookingListPartner: React.FC = () => {
  const history = useHistory();
  const [Toast, setToast] = useToast();
  const auth = getStorageValue("auth", { auth: "" });

  const [list, setList] = useState<Data[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selected, setSelected] = useState({ status: "SUBMITTED", code: "" });
  const [code, setCode] = useState("");
  const [filter, setFilter] = useState(initialFilter);
  const [total, setTotal] = useState(0);

  const confirmBooking = async () => {
    try {
      const { data } = await http.put(
        "/partner/booking/status",
        {
          status: "VERIFIED",
          code: selected.code.toLowerCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${auth.auth}`,
          },
        }
      );
      setToast({ message: "Sukses melakukan verifikasi!", type: "success" });
      history.push(`/detail/${data.data.id_arena}`);
    } catch (err) {
      const error = err as ErrorTypes;
      setToast({
        message: error?.response.data.data.message ?? "",
        type: "error",
      });
    }
  };

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

  const getListBooking = useCallback(
    async (code?: string, action?: string) => {
      try {
        const isReset = action === "reset";

        const { data } = await http.get("/partner/booking/list", {
          headers: {
            Authorization: `Bearer ${auth.auth}`,
          },
          params: {
            code,
            page: isReset ? 1 : filter.page + 1,
            limit: isReset ? 10 : filter.limit,
          },
        });

        if (isReset) {
          setFilter(initialFilter);
        }

        const formatTime = data.data.map((v: IBookingList) => {
          const times = getDateRange(v.start_time, v.end_time);
          return {
            ...v,
            time: times,
          };
        });

        setTotal(data.meta.total);

        setList(formatTime);
      } catch (error) {
        setToast({ message: "Error get list" });
      }
    },
    [auth.auth, filter, setToast]
  );

  useEffect(() => {
    if (code === "") {
      getListBooking();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const handleChangePage = (event: unknown, newPage: number) => {
    // console.log("new", newPage);
    setFilter({ ...filter, page: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter({ page: 0, limit: +event.target.value });
  };

  const mapStatusColor = (status: string) => {
    if (status === "SUBMITTED") return "default";
    if (status === "PAID") return "primary";
    if (status === "VERIFIED") return "secondary";
    return "success";
  };

  const handleConfirmation = (status: string, code: string) => {
    setSelected({ status, code });
    setShowConfirm(true);
  };

  const handleSearch = (codes: string) => {
    getListBooking(codes, "reset");
  };

  const handleReset = () => {
    setCode("");
    setFilter(initialFilter);
    // getListBooking(undefined, "reset");
  };

  return (
    <MainLayout>
      <div className="mb-5 text-center py-2" style={{ background: "#20c997" }}>
        <p
          className="m-0"
          style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}
        >
          Booking List
        </p>
      </div>

      <div
        className="d-flex mb-2"
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <p
          className="d-flex mr-2"
          style={{ justifyContent: "center", margin: 0 }}
        >
          Cari
        </p>
        <Input
          label="Kode Booking"
          type="text"
          name="code"
          width="100%"
          onChange={(value) => {
            setCode(value.target.value);
          }}
          value={code}
          onKeyUp={(e) => (e.key === "Enter" ? handleSearch(code) : null)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                {code.length > 0 && (
                  <IconButton onClick={() => handleReset()}>
                    <Close />
                  </IconButton>
                )}
                <IconButton
                  color="primary"
                  onClick={() => handleSearch(code)}
                  style={{
                    border: "1px solid #007bff",
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* <IconButton
          onClick={() => getListBooking(code)}
          // onMouseDown={handleMouseDownPassword}
          // onKeyUp={(e) =>e.}
        >
          <Search />
        </IconButton> */}
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Toast />
        <ModalConfirmBooking
          status={selected.status}
          visible={showConfirm}
          onConfirm={() => confirmBooking()}
          onDismiss={() => setShowConfirm(false)}
        />

        <TableContainer style={{ overflow: "scroll" }} sx={{ maxHeight: 440 }}>
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
              {list.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell align="center">{row.booking_name}</TableCell>
                    <TableCell align="center">{row.code}</TableCell>
                    <TableCell align="center">{row.venue}</TableCell>
                    <TableCell align="center">{row.time}</TableCell>
                    <TableCell align="center">{rupiah(row.total)}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row.status}
                        color={mapStatusColor(row.status)}
                        style={{ display: "flex" }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {!["VERIFIED", "DONE"].includes(row.status) ? (
                        <Button
                          variant={
                            row.status === "PAID" ? "contained" : "outlined"
                          }
                          style={{ textTransform: "none" }}
                          onClick={() =>
                            handleConfirmation(row.status, row.code)
                          }
                        >
                          {row.status === "PAID" ? "Sudah Bayar" : "Konfirmasi"}
                        </Button>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {code === "" && (
          <TablePagination
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={total}
            rowsPerPage={filter.limit}
            page={filter.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              border: "0.5px solid #6c757d",
              borderRadius: 2,
              ".MuiTablePagination-selectLabel": {
                margin: 0,
              },
              ".MuiTablePagination-displayedRows ": {
                margin: 0,
              },
            }}
          />
        )}
      </Paper>
    </MainLayout>
  );
};

export default BookingListPartner;
