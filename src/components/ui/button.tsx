import React from "react";
import { Button } from "@mui/material";

interface IProps {
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: () => void;
  width?: string;
  bgColor?: string;
  mt?: number;
}

export const Buttons: React.FC<IProps> = ({
  type = "submit",
  disabled = false,
  onClick,
  width,
  bgColor,
  mt,
  children,
}) => {
  return (
    <Button
      variant="contained"
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        boxShadow: "none",
        textTransform: "none",
        width,
        background: bgColor,
        marginTop: mt ?? 12,
      }}
    >
      {children}
    </Button>
  );
};

export default Buttons;
