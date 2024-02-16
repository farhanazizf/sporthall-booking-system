// import { Divider } from "@mui/material";
import React, { useState } from "react";
import QRCode from "qrcode.react";

import Buttons from "../../components/ui/button";
import Styled from "./style";
import Modals, { ModalProps } from "../../components/modal";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";
// import { Input } from "../../components/ui/inputs";

type IMethod = "ONSITE" | "ONLINE";

const QRIS_BG = "https://xendit.co/wp-content/uploads/2020/03/iconQris.png";

interface IPopupPayment extends ModalProps {
  total: number;
  uniqueCode?: string;
  onOnlinePayment?: () => void;
}

export const ModalsPayment: React.FC<IPopupPayment> = ({
  visible,
  uniqueCode,
  onDismiss,
}) => {
  const downloadQR = (id: string) => {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "123456.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Modals visible={visible} onDismiss={onDismiss}>
      {uniqueCode ? (
        <Styled.ModalWrapper>
          <div
            className="d-flex"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <h2>{uniqueCode}</h2>
          </div>
          <div
            className="d-flex"
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <QRCode
              id={uniqueCode}
              value={uniqueCode}
              renderAs="canvas"
              includeMargin
              size={244}
            />
            <div>
              <Buttons onClick={() => downloadQR(uniqueCode)}>
                {" "}
                Download QR{" "}
              </Buttons>
            </div>
          </div>
          {/* <Buttons disabled width="100%" mt={24} onClick={onDismiss}>
            <span style={{ fontSize: 22, margin: 8 }}>Ok</span>
          </Buttons> */}
        </Styled.ModalWrapper>
      ) : null}
    </Modals>
  );
};

export const ModalsPaymentQR: React.FC<IPopupPayment> = ({
  visible,
  uniqueCode,
  onDismiss,
  onOnlinePayment,
}) => {
  const [method, setMethod] = useState<IMethod>();

  const downloadQR = (id: string) => {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "123456.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const SectionBookingId: React.FC = () => {
    return (
      <div className="d-flex flex-column align-items-center">
        <div>
          <p style={{ fontSize: 16, margin: 0, fontWeight: "bold" }}>
            Catat/Simpan QR Kode Booking dibawah ini
          </p>
        </div>

        {uniqueCode ? (
          <div className="d-flex flex-column" style={{ alignItems: "center" }}>
            <div className="mt-4">
              <p style={{ fontSize: 14, margin: 0, textAlign: "center" }}>
                Kode Booking
              </p>
              <Styled.TextUniqueCode>
                {uniqueCode.toUpperCase()}
              </Styled.TextUniqueCode>
            </div>

            <QRCode
              id={uniqueCode}
              value={uniqueCode}
              renderAs="canvas"
              includeMargin
              size={172}
            />

            <Buttons
              mt={0}
              bgColor="white"
              onClick={() => downloadQR(uniqueCode)}
              style={{
                border: "1px solid black",
                color: "black",
              }}
            >
              Download QR
            </Buttons>

            <div className="mt-3">
              <p style={{ fontSize: 14, margin: 0 }}>
                INFO:{" "}
                <strong>
                  {method === "ONSITE"
                    ? "Tunjukkan QR/Booking Code ke kasir atau petugas venue untuk pembayaran booking"
                    : "Tunjukkan QR/Booking Code pada saat hari penyewaan"}
                </strong>
              </p>
            </div>

            <Buttons
              style={{ width: "100%" }}
              bgColor="black"
              onClick={() => {
                setMethod(undefined);
                onDismiss();
              }}
            >
              Ok
            </Buttons>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <Modals visible={visible} onDismiss={onDismiss}>
      {uniqueCode ? (
        <Styled.ModalWrapper>
          {!method ? (
            <div>
              <div>
                <Styled.SectionMethod>
                  <p style={{ fontSize: 18 }}>
                    Silahkan melakukan pembayaran melalui QRIS
                  </p>
                </Styled.SectionMethod>
                <Styled.SectionMethod>
                  <Styled.SectionQRIS>
                    <img src={QRIS_BG} alt="gambars_qris" />
                  </Styled.SectionQRIS>
                  <QRCode
                    id={uniqueCode}
                    value={uniqueCode}
                    renderAs="canvas"
                    includeMargin
                    size={172}
                  />
                  <Buttons
                    mt={0}
                    bgColor="white"
                    onClick={() => downloadQR(uniqueCode)}
                    style={{
                      border: "1px solid black",
                      color: "black",
                    }}
                  >
                    Download QR
                  </Buttons>

                  <div className="d-flex flex-column mt-4">
                    <p style={{ fontSize: 14, margin: 0 }}>
                      Klik dibawah ini bila sudah melakukan pembayaran
                    </p>

                    <Buttons
                      bgColor="black"
                      onClick={() => {
                        setMethod("ONLINE");
                        onOnlinePayment?.();
                      }}
                    >
                      Konfirmasi Pembayaran
                    </Buttons>
                  </div>
                </Styled.SectionMethod>
              </div>

              <div>
                <Styled.SectionMethod>
                  <p style={{ fontSize: 18, margin: "4px 0" }}>atau</p>
                  <div>
                    <Buttons
                      mt={0}
                      bgColor="white"
                      onClick={() => {
                        setMethod("ONSITE");
                      }}
                      style={{ border: "1px solid black", color: "black" }}
                    >
                      Bayar langsung di tempat
                    </Buttons>
                  </div>
                </Styled.SectionMethod>
              </div>
            </div>
          ) : null}

          {/* next develop */}
          {method === "ONSITE" || method === "ONLINE" ? (
            <SectionBookingId />
          ) : null}

          {/* <Buttons disabled width="100%" mt={24} onClick={onDismiss}>
            <span style={{ fontSize: 22, margin: 8 }}>Ok</span>
          </Buttons> */}
        </Styled.ModalWrapper>
      ) : null}
    </Modals>
  );
};
