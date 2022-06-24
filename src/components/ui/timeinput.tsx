import React from "react";
// import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

import { MobileTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Styled from "./style";
import moment from "moment";
import { CSSProperties } from "styled-components";

interface IProps {
  name: string;
  label: string;
  loading?: boolean;
  placeholder?: string;
  min?: string | Date;
  max?: string | Date;
  minlength?: number;
  maxlength?: number;
  disabled?: boolean;
  value: string | Date | null;
  hasLine?: boolean;
  type?: "text" | "email" | "tel" | "number" | "password";
  width?: string;
  onChange: (value: string | Date | null) => void;
  style?: CSSProperties;
}

export const TimeInput: React.FC<IProps> = ({
  label,
  name,
  type = "text",
  loading = false,
  width = "100%",
  disabled = false,
  onChange,
  value,
  min = moment("9:00am", "h:mma").toDate(),
  max = moment("9:00am", "h:mma").toDate(),
  ...rest
}) => {
  // const { control, errors } = useFormContext();

  return (
    <Styled.Row style={rest.style}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/* <DateTimePicker format="hh:mm" disableCalendar /> */}
        <MobileTimePicker
          // name={name}
          label={label}
          value={value}
          showToolbar={false}
          ampm={false}
          minTime={min}
          maxTime={max}
          // label="For mobile"
          // minTime={
          //   pureName?.toString() === 'time_end' || name === 'time_end'
          //     ? minimumTime
          //     : new Date(rest.minTime)
          // }
          // maxTime={new Date(rest.maxTime)}
          // onOpen={() => {
          //   if (pureName?.toString() === 'time_end') {
          //     setMinimumTime(getValues().input[rest.indexes].time_start)
          //   } else if (name === 'time_end') {
          //     setMinimumTime(getValues().time_start)
          //   }
          // }}
          onAccept={(values) => {
            onChange(values);
          }}
          onChange={(values) => {
            onChange(values);
          }}
          minutesStep={60}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Styled.Row>
  );
};
