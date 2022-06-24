import { Alert, AlertColor, Snackbar } from "@mui/material";
import React from "react";

type UseToast = [
  React.FC,
  (property: { message: string; type?: AlertColor | undefined }) => void
];

const defaultToastProperty = {
  message: "",
  type: "error" as AlertColor,
};

function useToast(): UseToast {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [toastProperty, setProperty] = React.useState<{
    message: string;
    type?: AlertColor | undefined;
  }>(() => ({
    ...defaultToastProperty,
  }));

  const setToast = React.useCallback(
    (property) => {
      setProperty({ ...defaultToastProperty, ...property });
      setVisible(true);
    },
    [setVisible, setProperty]
  );

  const Toast: React.FC = () => (
    <Snackbar
      open={visible}
      autoHideDuration={2500}
      onClose={() => setVisible(false)}
      style={{ width: "80%" }}
    >
      <Alert
        severity={toastProperty.type}
        sx={{ width: "100%", fontSize: 24, fontWeight: "bold" }}
      >
        {toastProperty.message}
      </Alert>
    </Snackbar>
  );

  return [Toast, setToast];
}

export default useToast;
