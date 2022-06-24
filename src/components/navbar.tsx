import { Container } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { AccountCircleOutlined } from "@mui/icons-material";
import LogoSweat from "../assets/sweatt.png";
import { useHistory } from "react-router-dom";
import { getStorageValue, setStorageValue } from "../utils/local-storage";
import Modals from "./modal";
import StyledM from "../pages/Detail/style";
import { Input } from "./ui/inputs";
import Buttons from "./ui/button";
import { myEventsList } from "../pages/Detail";
import useToast from "./toast";

const Styled = {
  NavWrapper: styled(Container)`
    &&& {
      display: flex;
      background: #ffffff;
      // width: 100%;
      padding: 30px 0;
    }
    p {
      margin: 0;
    }
  `,
  Container: styled(Container)`
    &&& {
      display: flex;
    }
  `,
  FlexWrapper: styled.div<{ justify: string }>`
    display: flex;
    width: 33%;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    p {
      margin: 0 10px;
      cursor: pointer;
      font-weight: 600;
    }
    svg {
      cursor: pointer;
    }
    div {
      margin: 0 15px;
    }
  `,
};

const NavbarMenu: React.FC = () => {
  const history = useHistory();

  const [Toast, setToast] = useToast();
  const auth = getStorageValue("auth", "user");
  const data = getStorageValue("list_event", myEventsList);

  const [modals, setModals] = React.useState(false);
  const [code, setCode] = React.useState("");

  const handleLogout = () => {
    setStorageValue("auth", "user", "user");

    history.push("/login");
  };

  const handleSubmit = () => {
    console.log(data);

    const foundedData = data.filter((val) => val.uniqueCode === code);

    if (foundedData.length > 0) {
      const indexData = data.findIndex((val) => val.uniqueCode === code);

      data[indexData].status = "DONE";

      setStorageValue("list_event", data, data);

      setCode("");
      setToast({ message: "Transaksi Selesai!", type: "success" });
      setModals(false);
      window.location.reload();
    } else {
      setToast({ message: "Kode tidak ditemukan", type: "error" });
    }
    // setModals(false);
    console.log(data.filter((val) => val.uniqueCode === code));
  };

  const isDisabled = code === "";
  return (
    <Styled.NavWrapper maxWidth={false}>
      <Toast />

      <Modals visible={modals} onDismiss={() => setModals(false)}>
        <StyledM.ModalWrapper>
          <h3 style={{ textAlign: "center" }}>Konfirmasi Kode Unik Booking</h3>
          <div
            className="d-flex"
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Input
              label="Kode Unik"
              type="text"
              name="code"
              width="100%"
              onChange={(value) => {
                setCode(value.target.value);
              }}
              value={code}
            />
          </div>
          <Buttons
            disabled={isDisabled}
            width="100%"
            mt={24}
            onClick={handleSubmit}
          >
            <span style={{ fontSize: 22, margin: 8 }}>Submit</span>
          </Buttons>
        </StyledM.ModalWrapper>
      </Modals>

      <Styled.FlexWrapper
        justify="start"
        style={{ cursor: "pointer" }}
        onClick={() => history.push("/")}
      >
        <img src={LogoSweat} alt="logo" style={{ width: 100 }} />
      </Styled.FlexWrapper>
      <Styled.FlexWrapper justify="center">
        <p style={{ cursor: "pointer" }} onClick={() => history.push("/")}>
          Home
        </p>
        <p style={{ cursor: "pointer" }} onClick={() => setModals(true)}>
          Confirm Booking
        </p>
        {auth !== "user" && (
          <p
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/report")}
          >
            Report
          </p>
        )}
      </Styled.FlexWrapper>
      <Styled.FlexWrapper justify="end">
        <div></div>
        <div className="dropdown">
          <AccountCircleOutlined
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-expanded="false"
          />
          {/* <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown button
          </button> */}
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {auth === "user" ? (
              <span
                className="dropdown-item"
                onClick={() => history.push("/login")}
              >
                Login as Admin
              </span>
            ) : (
              <>
                <span className="dropdown-item disabled">My Profile</span>
                <span className="dropdown-item" onClick={() => handleLogout()}>
                  Logout
                </span>
              </>
            )}
          </div>
        </div>
      </Styled.FlexWrapper>
    </Styled.NavWrapper>
  );
};

export default NavbarMenu;
