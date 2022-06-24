import * as React from "react";
import { Chart } from "react-chartjs-2";
import {
  MenuItem,
  Select,
  InputLabel,
  Paper,
  Divider,
  capitalize,
  Button,
} from "@mui/material";

import MainLayout from "../../components/main-layout";
import { getStorageValue } from "../../utils/local-storage";
import { myEventsList } from "../Detail";
import { rupiah } from "../../utils/currency";
import Styled from "../Home/style";
import CardCategory from "../Home/_mini-card";
import { listMenu, listVenue } from "../Home";
import moment from "moment";
import { monthList } from "../../components/ui/inputs";

import "chart.js/auto";
import { TableComponent } from "./chart";

export default function ReportPage() {
  const [rows, setRows] = React.useState(myEventsList);
  const [month, setMonth] = React.useState<string | number>(
    new Date().getMonth()
  );
  const [years, setYears] = React.useState<string | number>(
    new Date().getFullYear()
  );
  const [category, setCategory] = React.useState("all");
  const [showTable, setShowTable] = React.useState(false);

  // const defaultRows = rows.filter((val) => val.category !== "x");

  const filteredRows = rows
    .filter((val) => val.category !== "x")
    .filter((val) => (category === "all" ? val : val.category === category))
    .filter((val) => (month === 13 ? val : moment(val.start).month() === month))
    .filter((val) => moment(val.start).year() === years);

  React.useEffect(() => {
    getFilter();
  }, []);

  const totalMoney = filteredRows.reduce(
    (prev, now) => prev + (now.status === "BOOKED" ? now.total / 2 : now.total),
    0
  );

  const totalEachCategory = [
    {
      total: filteredRows
        .filter((val) => val.category === "futsal")
        .reduce(
          (prev, now) =>
            prev + (now.status === "BOOKED" ? now.total / 2 : now.total),
          0
        ),
      category: "futsal",
    },
    {
      total: filteredRows
        .filter((val) => val.category === "basket")
        .reduce(
          (prev, now) =>
            prev + (now.status === "BOOKED" ? now.total / 2 : now.total),
          0
        ),
      category: "basket",
    },
    {
      total: filteredRows
        .filter((val) => val.category === "badminton")
        .reduce(
          (prev, now) =>
            prev + (now.status === "BOOKED" ? now.total / 2 : now.total),
          0
        ),
      category: "badminton",
    },
    {
      total: filteredRows
        .filter((val) => val.category === "sepak_bola")
        .reduce(
          (prev, now) =>
            prev + (now.status === "BOOKED" ? now.total / 2 : now.total),
          0
        ),
      category: "sepak_bola",
    },
  ];

  // console.log("no duplicate", uniqueArr);

  const checkUp = filteredRows.map((val) => {
    if (category === "all") {
      return {
        category: val.category,
        total: val.total,
        venue_name: val.venue_name,
        venue_id: val.venue_id,
      };
    }

    return {
      category,
      total: val.status === "BOOKED" ? val.total / 2 : val.total,
      venue_name: val.venue_name,
      venue_id: val.venue_id,
    };
  });

  // function if there's venue 0 transaction
  const checkings = listVenue
    .filter((val) => val.category === category)
    .filter((obj) => {
      return !checkUp.some((obj2) => {
        return obj.id === obj2.venue_id;
      });
    });

  const uniqueArr = checkUp.filter(
    (v, i, a) => a.findIndex((v2) => v2.venue_id === v.venue_id) === i
  );
  // console.log("match", checkings);

  const labelChartAll = listMenu
    .filter((val) => val.category !== "all")
    .map((val) => val.title);

  const labelChartVenue = listVenue
    .filter((val) => val.category === category)
    .map((val) => val.title);
  // console.log(labelChartAll);
  // console.log("chart", checkUp);

  const isEmpty = filteredRows.length === 0;

  const unusedVenue = checkings
    .filter((vals) => vals.category === category)
    .map((vals) => {
      return {
        category,
        total: 0,
        venue_name: vals.title,
        venue_id: vals.id,
      };
    });

  const parsingVenue =
    checkings.length > 0 && checkUp.length > 0
      ? [...uniqueArr, ...unusedVenue]
      : checkUp;

  const chartData = {
    labels: category === "all" ? labelChartAll : labelChartVenue,
    datasets: [
      {
        data: category === "all" ? totalEachCategory : parsingVenue,
        parsing: {
          key: "total",
        },
        backgroundColor: ["red", "green", "blue", "brown", "purple", "grey"],
      },
    ],
  };

  const getFilter = async () => {
    try {
      const data = await getStorageValue("list_event", myEventsList);
      setRows(data);
      // console.log(data);
    } catch (error) {
      //todo: error
    }
  };

  const handleCategory = (category: string) => {
    setCategory(category);
  };

  return (
    <MainLayout>
      <Styled.SectionCategory>
        <Styled.TitleSectionWrapper>
          <h3>Kategori Olahraga</h3>
        </Styled.TitleSectionWrapper>

        <Styled.CategoryWrapper>
          {listMenu.map((val) => (
            <CardCategory
              name={val.title}
              key={val.category}
              logo={val.logo}
              venue={val.venue}
              onClick={() => handleCategory(val.category)}
            />
          ))}
        </Styled.CategoryWrapper>
      </Styled.SectionCategory>

      <div className="d-flex justify-content-end mb-4">
        <div className="mr-2">
          <InputLabel>Month</InputLabel>
          <Select
            value={month}
            label="Month"
            name="month"
            onChange={(val) => setMonth(val.target.value)}
          >
            <MenuItem value={13}>All Months</MenuItem>
            {monthList.map((val, i) => (
              <MenuItem key={val} value={i}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="mr-2">
          <InputLabel>Year</InputLabel>
          <Select
            value={years}
            label="Years"
            name="years"
            onChange={(val) => setYears(val.target.value)}
          >
            {[
              2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
            ].map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className=" mb-4">
        <h2 style={{ textAlign: "center", marginBottom: 16 }}>
          Laporan {category === "all" ? "Keseluruhan" : capitalize(category)}{" "}
          {/* {moment(
            new Date().setMonth(typeof month === "string" ? 0 : month)
          ).format("MMMM")} */}
          {monthList[typeof month === "string" ? 0 : month]}
        </h2>
        {!isEmpty ? (
          <Paper className=" p-4" style={{ width: "100%" }}>
            <div
              className="d-flex"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <div
                className="d-flex mr-3"
                style={{
                  width: "50%",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {category === "all"
                  ? totalEachCategory.map((val, i) => (
                      <div key={i} style={{ width: "40%" }}>
                        <h3>{capitalize(val.category.replaceAll("_", " "))}</h3>

                        <p>Jumlah Penyewaan</p>
                        <h4>
                          {
                            filteredRows.filter(
                              (valz) => valz.category === val.category
                            ).length
                          }{" "}
                          kali
                        </h4>

                        <p>Pemasukan</p>
                        <h4>{rupiah(val.total)}</h4>

                        <Divider style={{ marginTop: 16, marginBottom: 24 }} />
                      </div>
                    ))
                  : parsingVenue.map((val, i) => (
                      <div key={i} style={{ width: "40%" }}>
                        <h3>{capitalize(val.venue_name)}</h3>

                        <p>Jumlah Penyewaan</p>
                        <h4>
                          {
                            filteredRows.filter(
                              (valz) => valz.venue_id === val.venue_id
                            ).length
                          }{" "}
                          kali
                        </h4>

                        <p>Pemasukan</p>
                        <h4>{rupiah(val.total)}</h4>

                        <Divider style={{ marginTop: 16, marginBottom: 24 }} />
                      </div>
                    ))}
              </div>
              <div className="mb-4" style={{ width: 500 }}>
                <Chart
                  type="pie"
                  title="Total Pemasukan"
                  width={10}
                  height={10}
                  options={{
                    elements: {
                      arc: {
                        borderWidth: 0,
                      },
                    },
                  }}
                  data={chartData}
                />
              </div>
            </div>
            <div className="d-flex">
              <p style={{ margin: 0, fontSize: 24 }}>Total&emsp;</p>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
                {rupiah(totalMoney)}
              </p>
            </div>
          </Paper>
        ) : (
          <Paper>
            <div
              className="d-flex justify-content-center"
              style={{ height: 500, alignItems: "center" }}
            >
              <h3>Belum ada penyewaan pada bulan ini</h3>
            </div>
          </Paper>
        )}
      </div>

      <div className="w-100 d-flex my-5" style={{ justifyContent: "center" }}>
        <Button
          variant="outlined"
          size="large"
          style={{
            borderRadius: 8,
            borderColor: "darkgreen",
            color: "darkgreen",
          }}
          onClick={() => setShowTable(!showTable)}
        >
          {showTable ? "Sembunyikan Transaksi" : "Lihat Transaksi"}
        </Button>
      </div>

      {!isEmpty && showTable ? (
        <TableComponent dataRows={filteredRows} totalMoney={totalMoney} />
      ) : null}
    </MainLayout>
  );
}
