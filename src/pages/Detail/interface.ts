import React from "react";
import { EventProps } from "react-big-calendar";

export type EventComponents = React.PropsWithChildren<EventProps<IEvents>>;
// export type EventComponents = React.PropsWithChildren<EventProps<IEvents>>;

export interface ITime {
  start: string | Date | null;
  end: string | Date | null;
}

export interface IEvents {
  id: string;
  title: string;
  booking_name?: string;
  allDay?: boolean;
  start: Date;
  end: Date;
  hexColor: string;
  status: string;

  // description: string;
  // category: string;
}

export interface IEventsGET {
  id: string;
  id_arena: string;
  booking_name: string;
  start_time: string;
  end_time: string;
  status: string;
}

export interface IEventsFormatted {
  id: string;
  id_arena: string;
  booking_name: string;
  start_time: Date;
  end_time: Date;
  status: string;
}

export interface IVenue {
  id: string;
  category: string;
  price: number;
  picture: string;
  title: string;
  name: string;
  description: string;
}

export const defaultVenue = {
  id: "4f11d1b1-44e5-4e6b-8e49-b81e83042e2c",
  category: "FUTSAL",
  price: 200000,
  picture:
    "https://i.pinimg.com/originals/bf/61/bd/bf61bd125649fbdb1d0aeaaac6b23c93.jpg",
  title: "Lapangan Futsal A",
  name: "Lapangan Futsal A",
  description: "Lapangan Futsal A",
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
    start: new Date("2023-11-09T21:00:00+07:00"),
    end: new Date("2023-11-09T23:00:00+07:00"),
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

export const defaultVal = {
  name: "",
  phone: "",
  // team: "",
  total: 0,
  hours: 1,
};

export interface IRangeTime {
  start: Date;
  end: Date;
}
