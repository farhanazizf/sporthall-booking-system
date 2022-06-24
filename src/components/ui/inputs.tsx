import React from "react";
import { TextField } from "@mui/material";
import Styled from "./style";

interface IProps {
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
  // ...rest
}) => {
  return (
    <Styled.Row>
      <TextField
        disabled={disabled}
        label={label}
        name={name}
        fullWidth={width === "100%"}
        variant="outlined"
        onChange={onChange}
        value={value}
        type={type}
      />
    </Styled.Row>
  );
};
