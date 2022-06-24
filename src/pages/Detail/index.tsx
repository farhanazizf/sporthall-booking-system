import {
  CalendarMonthOutlined,
  LibraryBooksOutlined,
  PriceChangeOutlined,
  Star,
  StarOutline,
} from "@mui/icons-material";
import { Divider } from "@mui/material";
import React, { useEffect } from "react";
import MainLayout from "../../components/main-layout";
import Styled from "./style";
// @ts-ignore
import {
  Calendar,
  dateFnsLocalizer,
  Event,
  SlotInfo,
} from "react-big-calendar";
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
import { getStorageValue, setStorageValue } from "../../utils/local-storage";
import { useLocation } from "react-router-dom";
import useToast from "../../components/toast";
// import { DatePicker } from "@mui/lab";

interface ITime {
  start: string | Date | null;
  end: string | Date | null;
}

interface IEvents {
  id: string;
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
  hexColor: string;
  description: string;
  category: string;
}

interface IVenue {
  id: string;
  category: string;
  price: number;
  picture: string;
  title: string;
}

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

const defaultVenue = {
  id: "4f11d1b1-44e5-4e6b-8e49-b81e83042e2c",
  category: "futsal",
  price: 200000,
  picture:
    "https://i.pinimg.com/originals/bf/61/bd/bf61bd125649fbdb1d0aeaaac6b23c93.jpg",
  title: "Lapangan Futsal A",
};

export const myEventsList = [
  {
    id: "id",
    title: "Farhan - Perbanas Univ",
    allDay: false,
    start: new Date("2022-06-17T19:00:00+07:00"),
    end: new Date("2022-06-17T21:00:00+07:00"),
    hexColor: "11979e",
    description: "deskripsi",
    category: "x",
    venue_id: "",
    venue_name: "",
    status: "BOOKED",
    total: 10,
    uniqueCode: "",
    hours: 1,
    phone: "",
  },
  {
    id: "idx",
    title: "Jojo - Perbanas Univ",
    allDay: false,
    start: new Date("2022-06-17T21:00:00+07:00"),
    end: new Date("2022-06-17T23:00:00+07:00"),
    hexColor: "11979e",
    description: "deskripsi",
    category: "x",
    venue_name: "",
    venue_id: "",
    status: "BOOKED",
    total: 10,
    uniqueCode: "",
    hours: 1,
    phone: "",
  },
];

const defaultVal = {
  name: "",
  phone: "",
  team: "",
  total: 0,
  hours: 1,
};

const DetailPage: React.FC = () => {
  const { state: detailVenue } = useLocation<IVenue>();
  const [Toast, setToast] = useToast();

  const isAdmin = getStorageValue("auth", "user");
  const [dateNow, setDateNow] = React.useState(new Date());
  const [uniqueCode, setUniqueCode] = React.useState<string | undefined>();
  const [showModal, setShowModal] = React.useState(false);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [formData, setFormData] = React.useState(defaultVal);
  const [venue, setVenue] = React.useState<IVenue>(defaultVenue);
  const [allSchedule, setAllSchedule] = React.useState<IEvents[]>([]);
  const [eventList, setEventList] = React.useState<IEvents[]>([]);
  const [timeSelect, setTimeSelect] = React.useState<ITime>({
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

  const checkHours = moment
    .duration(moment(timeSelect.end).diff(timeSelect.start))
    .asHours();

  const showCalendarSchedule = async () => {
    const data = await getStorageValue(`list_event`, myEventsList);
    const formatted = data
      .filter(
        (val) =>
          val.category === detailVenue.category &&
          val.venue_id === detailVenue.id
      )
      .map((val) => {
        return {
          ...val,
          start: new Date(val.start),
          end: new Date(val.end),
        };
      });

    setAllSchedule(data);
    setEventList(formatted);
    setShowCalendar(true);
    setVenue(detailVenue);
  };

  useEffect(() => {
    showCalendarSchedule();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailVenue]);

  const EventComponent: React.FC<{ event: Event }> = (data) => {
    const { event } = data;
    return <span style={{ textOverflow: "none" }}>{event?.title}</span>;
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

    if (isAdmin !== "user") {
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
    } else {
      setToast({
        message: "Hanya admin yang dapat melakukan input data booking!",
      });
    }
  };

  const handleSubmit = () => {
    const uidNow = uuid();

    const differentHours = moment
      .duration(moment(moment(timeSelect.end)).diff(timeSelect.start))
      .asHours();

    const newData = {
      id: uidNow,
      title: `${capitalizeFirstLetter(formData.name)} - ${capitalizeFirstLetter(
        formData.team
      )}`,
      allDay: false,
      start: timeSelect.start,
      end: timeSelect.end,
      hexColor: "11979e",
      description: "deskripsi",
      category: venue.category,
      venue_id: venue.id,
      venue_name: venue.title,
      status: "BOOKED",
      total: formData.total,
      uniqueCode: uidNow.split("-")[4],
      hours: differentHours,
      phone: formData.phone,
    };

    setStorageValue(`list_event`, [...allSchedule, newData], myEventsList);
    setUniqueCode(uidNow.split("-")[4]);
  };

  const handleClose = () => {
    setUniqueCode(undefined);
    setShowModal(false);
    setFormData(defaultVal);
    showCalendarSchedule();
  };

  const isDisabled = Object.values(formData).some(
    (val) => val === "" || val === 0
  );
  return (
    <MainLayout>
      <Toast />
      <Modals visible={showModal} onDismiss={handleClose}>
        {!uniqueCode ? (
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

            <Input
              label="Organisasi/Tim"
              name="organisasi"
              onChange={(value) =>
                setFormData({ ...formData, team: value.target.value })
              }
              value={formData.team}
            />

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
        ) : (
          <Styled.ModalWrapper>
            <div
              className="d-flex"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <h2>{uniqueCode}</h2>
            </div>
            <Buttons
              disabled={isDisabled}
              width="100%"
              mt={24}
              onClick={handleClose}
            >
              <span style={{ fontSize: 22, margin: 8 }}>Ok</span>
            </Buttons>
          </Styled.ModalWrapper>
        )}
      </Modals>

      <Styled.SectionBanner>
        <img src="https://via.placeholder.com/2000x300" alt="gambars" />
      </Styled.SectionBanner>

      <Styled.SectionHeader>
        <h2>{venue.title}</h2>
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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex,
            reiciendis eveniet praesentium debitis enim velit ad harum nobis
            quia illo vero commodi repudiandae, cupiditate sed, molestias aut
            nostrum totam iure.
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
          {showCalendar && (
            <Calendar
              // selectable={isAdmin !== "user"}
              selectable
              defaultDate={dateNow}
              localizer={localizer}
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
              // step={0}
              components={{
                // @ts-ignore
                event: EventComponent,
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
              onSelectSlot={(e) => handleSelectTime(e)}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DetailPage;
