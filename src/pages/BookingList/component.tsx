import React from "react";
import { ModalProps } from "../../components/modal";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface IModals extends ModalProps {
  status: string;
  onConfirm: () => void;
}

export const ModalConfirmBooking: React.FC<IModals> = ({
  status,
  visible,
  onConfirm,
  onDismiss,
}) => {
  return (
    <Dialog
      open={visible}
      onClose={onDismiss}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Pastikan data dan kode booking sudah sesuai
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {status === "SUBMITTED"
            ? "Booking belum dibayar, "
            : "Booking sudah dibayar, "}
          apabila anda melakukan konfirmasi booking, <br />
          status transaksi booking akan di-update menjadi{" "}
          <strong>{"VERIFIED"}</strong>.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="warning" onClick={onDismiss}>
          Batal
        </Button>
        <Button variant="contained" onClick={onConfirm} autoFocus>
          Lanjutkan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmBooking;
