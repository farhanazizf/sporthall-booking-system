import React from "react";
import { Button } from "@mui/material";

interface IProps {
  className?: string;
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: () => void;
  width?: string;
  bgColor?: string;
  mt?: number;
  style?: React.CSSProperties;
}

export const Buttons: React.FC<IProps> = ({
  type = "submit",
  disabled = false,
  onClick,
  width,
  bgColor,
  mt,
  children,
  style,
  className,
}) => {
  return (
    <Button
      className={className}
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
        ...style,
      }}
    >
      {children}
    </Button>
  );
};

export default Buttons;
