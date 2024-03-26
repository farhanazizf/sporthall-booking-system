import React from "react";
import {
  InputBaseComponentProps,
  StandardTextFieldProps,
  TextField,
} from "@mui/material";
import Styled from "./style";

interface IProps extends StandardTextFieldProps {
  name: string;
  label: string;
  loading?: boolean;
  placeholder?: string;
  min?: string;
  max?: string;
  minlength?: number;
  maxlength?: number;
  disabled?: boolean;
  value: number | string | boolean | undefined;
  hasLine?: boolean;
  type?: "text" | "email" | "tel" | "number" | "password";
  width?: string;
  onChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined;
  inputProps?: InputBaseComponentProps;
}

export const monthList = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const Input: React.FC<IProps> = ({
  label,
  name,
  type = "text",
  disabled = false,
  onChange,
  value,
  width,
  // inputProps,
  ...rest
}) => {
  return (
    <Styled.Row style={label === "Kode Booking" ? { margin: 0 } : undefined}>
      <TextField
        disabled={disabled}
        label={label}
        name={name}
        fullWidth={width === "100%"}
        variant="outlined"
        onChange={onChange}
        value={value}
        type={type}
        autoComplete="off"
        style={{
          width,
          margin: 0,
        }}
        // InputProps={{
        //   endAdornment: (
        //     <InputAdornment position="start">
        //       <IconButton
        //         aria-label="toggle password visibility"
        //         // onClick={handleClickShowPassword}
        //         // onMouseDown={handleMouseDownPassword}
        //         // onKeyUp={(e) =>e.}
        //       >
        //         <Search />
        //       </IconButton>
        //     </InputAdornment>
        //   ),
        // }}
        {...rest}

        // endAdornment={
        //   <InputAdornment position="end">
        //     <IconButton
        //       aria-label="toggle password visibility"
        //       onClick={handleClickShowPassword}
        //       onMouseDown={handleMouseDownPassword}
        //     >
        //       {showPassword ? <VisibilityOff /> : <Visibility />}
        //     </IconButton>
        //   </InputAdornment>
        // }
      />
    </Styled.Row>
  );
};
