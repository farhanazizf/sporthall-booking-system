import {
  CalendarMonthOutlined,
  LibraryBooksOutlined,
  PriceChangeOutlined,
  Star,
  StarOutline,
} from "@mui/icons-material";
import { Divider } from "@mui/material";

import React, { useEffect, useState } from "react";
import MainLayout from "../../components/main-layout";
import Styled from "./style";
import { Calendar, dateFnsLocalizer, SlotInfo, View } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import idID from "date-fns/locale/id";
import moment from "moment";
// import ModalsNow from "./_modal";
import { Input } from "../../components/ui/inputs";

import "./big-calendar.css";
import Modals from "../../components/modal";
import { TimeInput } from "../../components/ui/timeinput";
import Buttons from "../../components/ui/button";
import { rupiah } from "../../utils/currency";
import { uuid } from "../../utils/uid";
// import {
//   getStorageValue /* setStorageValue */,
// } from "../../utils/local-storage";
import { useLocation, useParams } from "react-router-dom";
import useToast from "../../components/toast";
import http from "../../utils/http";
import {
  EventComponents,
  IEvents,
  IEventsGET,
  // IRangeTime,
  ITime,
  IVenue,
  defaultVal,
  defaultVenue,
  // myEventsList,
} from "./interface";
import { ModalsPaymentQR } from "./component";
// import { DatePicker } from "@mui/lab";

const locales = {
  "id-ID": idID,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getBanner = (type: string) => {
  switch (type) {
    case "BASKETBALL":
      return "https://blog.nasm.org/hubfs/Training%20Basketball%20Players-1.jpg";
    case "FUTSAL":
      return "https://asset.ayo.co.id/photos/62106/1.%20Keuntungan%20Sparring%20Futsal%20dalam%20Meningkatakan%20Kualitas%20Permainan.jpg";
    case "MINISOCCER":
      return "https://gelora-public-storage.s3-ap-southeast-1.amazonaws.com/upload/public-20230110035949.jpg";
    default:
      return "https://sportsvenuecalculator.com/wp-content/uploads/2022/11/Sponsor-6.jpg";
  }
};

const DetailPage: React.FC<{ id: string }> = () => {
  const { id } = useParams<{ id: string }>();
  const { state: detailVenue } = useLocation<IVenue>();
  const [Toast, setToast] = useToast();

  const [dateNow, setDateNow] = useState(new Date());
  const [uniqueCode, setUniqueCode] = useState<string | undefined>();
  const [total, setTotal] = useState<number>(0);
  // const [transactionId, setTransactionId] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState(defaultVal);
  const [venue, setVenue] = useState<IVenue>(defaultVenue);
  // const [allSchedule, setAllSchedule] = useState<IEvents[]>([]);
  const [eventList, setEventList] = useState<IEvents[]>([]);
  const [showPayment, setShowPayment] = useState(false);

  // const [month, setMonth] = useState(new Date().getMonth() + 1);

  const [timeSelect, setTimeSelect] = useState<ITime>({
    start:
      new Date().getHours() >= 23
        ? moment("9:00am", "h:mma").toDate()
        : new Date().getHours() <= 8
        ? moment("9:00am", "h:mma").toDate()
        : new Date(),
    end:
      new Date().getHours() >= 23
        ? moment("9:00am", "h:mma").toDate()
        : new Date().getHours() <= 8
        ? moment("9:00am", "h:mma").toDate()
        : new Date(),
  });
  const [loading, setLoading] = React.useState(false);
  const [viewType, setViewType] = React.useState<string>();

  const checkHours = moment
    .duration(moment(timeSelect.end).diff(timeSelect.start))
    .asHours();

  const showCalendarSchedule = async () => {
    setShowCalendar(true);
  };

  const colorStatus = (statuss: string) => {
    if (statuss === "DONE") return "1AACAC";
    if (statuss === "PAID") return "362FD9";
    return "59B4C3"; // verified
  };

  const showAllEvent = async () => {
    try {
      setLoading(true);

      const isMonth = viewType === "month";

      const dateString = moment(dateNow).format();
      const { data } = await http.get<{ data: IEventsGET[] }>(
        `/booking/${id}/list`,
        {
          params: {
            time_type: isMonth ? "month" : "date",
            // date: new Date(rangeTime?.start ?? "").toISOString(),
            date: dateString,
          },
        }
      );

      const formatted = data.data.map((val) => {
        return {
          id: val.id,
          title: `${capitalizeFirstLetter(val.booking_name)}`,
          booking_name: val.booking_name,
          start: new Date(val.start_time),
          end: new Date(val.end_time),
          // hexColor: val.status === "DONE" ? "11979e" : "59B4C3",
          hexColor: colorStatus(val.status),
          allDay: false,
          status: val.status,
        };
      });

      setEventList(formatted);
      setShowCalendar(true);

      // setVenue(data.data);
    } catch (error) {
      setToast({ message: "Error get data" });
    } finally {
      setTimeout(() => setLoading(false), 200);
    }
  };

  const getDetailsVenue = async () => {
    try {
      setLoading(true);

      const { data } = await http.get(`/arena/${id}`);

      setVenue(data.data);
    } catch (error) {
      setToast({ message: "Error get data" });
    } finally {
      setTimeout(() => setLoading(false), 200);
    }
  };

  useEffect(() => {
    getDetailsVenue();
    showCalendarSchedule();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailVenue]);

  useEffect(() => {
    showAllEvent();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow, viewType]);

  const EventComponent: React.FC<EventComponents> = (data) => {
    const { event } = data;
    return <span style={{ textOverflow: "none" }}>{event?.booking_name}</span>;
  };

  const eventStyleGetter = ({ hexColor }: { hexColor: string }) => {
    let backgroundColor = "#" + hexColor;
    let style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  const handleSelectTime = (time: SlotInfo) => {
    const sameHour = new Date().getHours() === moment(time.start).hours();
    const beforeNow = moment(time.start).isBefore();

    // if (isAdmin !== "user") {
    if (!beforeNow || sameHour) {
      const differentHours = moment
        .duration(
          moment(moment(time.start).add(1, "hour").toDate()).diff(time.start)
        )
        .asHours();

      setDateNow(time.start);
      setFormData({
        ...formData,
        hours: differentHours,
        total: differentHours * venue.price,
      });
      setTimeSelect({
        start: time.start,
        end: moment(time.start).add(1, "hour").toDate(),
      });
      setShowModal(true);
    } else {
      setToast({
        message: "Waktu telah lewat tidak dapat menambah data booking",
      });
    }
  };

  // const submitBooking = async () => {
  //   try {
  //     const { data } = await http.post(`/arena/booking`, testSend, {
  //       headers: { Authorization: "Bearer " },
  //     });

  //     setShowPayment(true);

  //     setTransactionId(data.data.id);
  //     setShowModal(false);

  //   } catch (error) {

  //   }
  // }

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const uidNow = uuid();

      const differentHours = moment
        .duration(moment(moment(timeSelect.end)).diff(timeSelect.start))
        .asHours();

      const codex = uidNow.split("-")[4].slice(0, 8);

      const testSend = {
        // id: uidNow,
        booking_name: capitalizeFirstLetter(formData.name),
        start_time: timeSelect.start,
        end_time: timeSelect.end,
        // status: "BOOKED",
        id_arena: venue.id,
        code: codex,
        hours: differentHours,
        total: formData.total,
        phone: formData.phone,
      };

      setTotal(formData.total);
      setUniqueCode(codex);

      await http.post(`/arena/booking`, testSend, {
        headers: { Authorization: "Bearer " },
      });

      setShowPayment(true);

      // setTransactionId(data.data.id);
      setFormData(defaultVal);
      setShowModal(false);
    } catch (error) {
      setToast({ message: "Error booking schedule" });
    } finally {
      setLoading(false);
    }
  };

  const handlePaid = async () => {
    try {
      await http.put(
        "/online-payment",
        {
          code: uniqueCode?.toLowerCase(),
        },
        {
          headers: {
            Authorization: `Bearer`,
          },
        }
      );

      setToast({
        message:
          "Sukses melakukan pembayaran, admin akan melakukan verifikasi!",
        type: "success",
      });
      // history.push(`/detail/${data.data.id_arena}`);
    } catch (error) {
      setToast({ message: "Kode tidak ditemukan", type: "error" });
    }
  };

  const handleClose = () => {
    setUniqueCode(undefined);
    setShowModal(false);
    setFormData(defaultVal);
    showCalendarSchedule();
    showAllEvent();
  };

  const handleChangeRange = (
    range:
      | Date[]
      | {
          start: Date;
          end: Date;
        },
    view?: View | undefined
  ) => {
    // const ranges = range as IRangeTime;
    const rangeArr = range as Date[];

    if (range) {
      if (view === "month") {
        // const currentMonth = ranges.start.getMonth();
        // const date =
        //   ranges.start.getDate() > 22
        //     ? new Date(ranges.start).setMonth(currentMonth + 1)
        //     : ranges.start;
        // console.log("ramge", new Date(date));
        // let start = moment(ranges.start).startOf("month");
        // let end = moment(ranges.end).endOf("month");
        // start = start.startOf("week");
        // end = end.endOf("week");
        // console.log("starts", start);
        // console.log("ends", end);
        // setDateNow(ranges.);
      } else if (view === "day") {
        setDateNow(rangeArr[0]);
      }
    }
  };

  const handleNavigate = (date: Date, v: View) => {
    if (v === "month") {
      setDateNow(new Date(date));
    } else if (v === "day") {
      // console.log("day", date);
      setDateNow(date);
    }
  };

  const isDisabled = Object.values(formData).some(
    (val) => val === "" || val === 0
  );
  return (
    <MainLayout>
      <Toast />

      <ModalsPaymentQR
        visible={showPayment}
        onDismiss={() => {
          setShowPayment(false);
          showAllEvent();
        }}
        uniqueCode={uniqueCode ?? "xzx"}
        total={total}
        onOnlinePayment={handlePaid}
      />

      <Modals visible={showModal} onDismiss={handleClose}>
        <Styled.ModalWrapper>
          <h2>Isi data diri</h2>
          <Divider style={{ marginBottom: 50 }} />

          <Input
            label="Nama"
            name="name"
            onChange={(value) =>
              setFormData({ ...formData, name: value.target.value })
            }
            value={formData.name}
          />

          {/* <Input
              label="Organisasi/Tim"
              name="organisasi"
              onChange={(value) =>
                setFormData({ ...formData, team: value.target.value })
              }
              value={formData.team}
            /> */}

          <div style={{ display: "flex", width: "100%" }}>
            <TimeInput
              name="start time"
              label="start time"
              min={moment("9:00am", "h:mma").toDate()}
              max={moment("10:00pm", "h:mma").toDate()}
              onChange={(value) =>
                setTimeSelect({ ...timeSelect, start: value })
              }
              value={timeSelect.start}
              style={{ width: "40%", marginRight: 10 }}
            />
            <TimeInput
              name="end time"
              label="end time"
              min={moment(timeSelect.start).add(1, "hour").toDate()}
              max={moment("11:00pm", "h:mma").toDate()}
              onChange={(value) => {
                setTimeSelect({ ...timeSelect, end: value });
              }}
              style={{ width: "40%" }}
              value={timeSelect.end}
            />
          </div>

          <Input
            label="No HP"
            type="number"
            name="number_phone"
            onChange={(value) => {
              setFormData({ ...formData, phone: value.target.value });
            }}
            value={formData.phone}
          />

          <Input
            label="Total Harga"
            // type="number"
            disabled
            name="total"
            onChange={(value) =>
              setFormData({ ...formData, total: Number(value.target.value) })
            }
            value={rupiah(checkHours * venue.price)}
          />

          <Buttons disabled={isDisabled} width="100%" onClick={handleSubmit}>
            Submit
          </Buttons>
        </Styled.ModalWrapper>
      </Modals>

      <Styled.SectionBanner>
        {/* <img src="https://via.placeholder.com/2000x300" alt="gambars" /> */}
        <img src={getBanner(venue.category)} alt="gambars" />
      </Styled.SectionBanner>

      <Styled.SectionHeader>
        <h2>{venue.name}</h2>
        <div className="d-flex " style={{ alignItems: "center" }}>
          <Star color="warning" />
          <Star color="warning" />
          <Star color="warning" />
          <StarOutline />
        </div>
        <Divider style={{ marginTop: 32, marginBottom: 32 }} />
      </Styled.SectionHeader>

      <Styled.Wrapper>
        <div className="d-flex">
          <LibraryBooksOutlined className="mr-2" />
          <p>Deskripsi</p>
        </div>
        <div>
          <p>
            {venue.description}
            {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex,
            reiciendis eveniet praesentium debitis enim velit ad harum nobis
            quia illo vero commodi repudiandae, cupiditate sed, molestias aut
            nostrum totam iure. */}
          </p>
        </div>
      </Styled.Wrapper>

      <Styled.Wrapper>
        <div className="d-flex">
          <PriceChangeOutlined className="mr-2" />
          <p>Harga</p>
        </div>
        <div>
          <p>{`${rupiah(venue.price)} /jam`}</p>
        </div>
      </Styled.Wrapper>

      <div>
        <div className="d-flex">
          <CalendarMonthOutlined className="mr-2" />
          <p>Jadwal Saat ini</p>
        </div>

        <div>
          {showCalendar && !loading && (
            <Calendar
              // selectable={isAdmin !== "user"}
              selectable
              defaultDate={dateNow}
              localizer={localizer}
              // events={eventList.filter((v) => v.status === "BOOKED")}
              events={eventList}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              views={["month", "day"]}
              eventPropGetter={eventStyleGetter}
              timeslots={1}
              step={60}
              defaultView="day"
              min={moment("9:00am", "h:mma").toDate()}
              max={moment("11:00pm", "h:mma").toDate()}
              onRangeChange={(range, view) => handleChangeRange(range, view)}
              onNavigate={(date, view, act) => handleNavigate(date, view)}
              onView={(v) => setViewType(v)}
              onSelectSlot={(e) => handleSelectTime(e)}
              onShowMore={(event, date) => {
                const bufferOneHour = moment(
                  moment(date).add(1, "hour").toDate()
                ).toDate();

                setDateNow(bufferOneHour);
              }}
              components={{
                event: (prop) => <EventComponent {...prop} />,
                month: {
                  dateHeader: ({ date, label }) => {
                    if (new Date(date).getMonth() === new Date().getMonth()) {
                      const today =
                        new Date(date).getTime() === new Date().getTime();
                      return (
                        <span
                          style={
                            today
                              ? { color: "blue", margin: 2, fontSize: 24 }
                              : { color: "black", margin: 2, fontSize: 24 }
                          }
                        >
                          {label}
                        </span>
                      );
                    } else {
                      return (
                        <h3 style={{ color: "grey", margin: 2 }}>{label}</h3>
                      );
                    }
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DetailPage;
