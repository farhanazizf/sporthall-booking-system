import { Chip, Container } from "@mui/material";
import React from "react";
import styled from "styled-components";
import {
  AccountCircleOutlined,
  Face,
  Store,
  VerifiedUser,
} from "@mui/icons-material";
import LogoSweat from "../assets/sweatt.png";
import { useHistory } from "react-router-dom";
import {
  getStorageValue,
  removeStorageValue,
  // setStorageValue,
} from "../utils/local-storage";
import Modals from "./modal";
import StyledM from "../pages/Detail/style";
import { Input } from "./ui/inputs";
import Buttons from "./ui/button";
import useToast from "./toast";
// import { myEventsList } from "../pages/Detail/interface";
import http from "../utils/http";
import { ErrorTypes, initialLocalStorage } from "../utils/constant";

type IChipColor =
  | "default"
  | "primary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "secondary";

const Styled = {
  NavWrapper: styled(Container)`
    &&& {
      display: flex;
      background: #ffffff;
      // width: 100%;
      padding: 30px 0;
      // position: sticky;
      // top: 0;
      // width: 100%;
      // box-shadow: 0 2px 3px #aaaaaa;
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
  const auth = getStorageValue("auth", initialLocalStorage);

  const [Toast, setToast] = useToast();
  // const auth = getStorageValue("auth", "user");
  // const data = getStorageValue("list_event", myEventsList);

  const [modals, setModals] = React.useState(false);
  const [code, setCode] = React.useState("");

  const handleLogout = () => {
    // setStorageValue("auth", "user", "user");
    removeStorageValue("auth");

    history.push("/login");
  };

  const handleSubmit = async () => {
    try {
      const { data } = await http.put(
        "/partner/booking/status",
        {
          status: "DONE",
          code: code.toLowerCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${auth.auth}`,
          },
        }
      );
      setToast({ message: "Venue sudah dapat digunakan!", type: "success" });

      history.push(`/detail/${data.data.id_arena}`);
      setModals(false);
    } catch (err) {
      const error = err as ErrorTypes;
      setToast({
        message: error?.response.data.data.message ?? "",
        type: "error",
      });
    }
  };

  const iconSelection = (roles: string) => {
    if (roles === "PARTNER") {
      return { icon: <Store />, color: "primary" };
    } else if (roles === "admin") {
      return { icon: <VerifiedUser />, color: "success" };
    }
    return { icon: <Face />, color: "default" };
  };

  const isDisabled = code.length < 8;

  return (
    <Styled.NavWrapper maxWidth={false}>
      <Toast />

      <Modals visible={modals} onDismiss={() => setModals(false)}>
        <StyledM.ModalWrapper>
          <h3 style={{ textAlign: "center" }}>Konfirmasi Kode Booking</h3>
          <div
            className="d-flex"
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Input
              label="Kode Booking"
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
        {["PARTNER"].includes(auth.roles) ? (
          <p
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/partner")}
          >
            Daftar Booking
          </p>
        ) : null}
        {["admin", "PARTNER"].includes(auth.roles) ? (
          <p style={{ cursor: "pointer" }} onClick={() => setModals(true)}>
            Verifikasi Kode Booking
          </p>
        ) : null}

        {!auth.auth && (
          <p
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/login")}
          >
            Login
          </p>
        )}
        {/* {auth !== "user" && (
          <p
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/report")}
          >
            Report
          </p>
        )} */}
      </Styled.FlexWrapper>
      <Styled.FlexWrapper justify="end">
        <div></div>
        <div className="d-flex" style={{ alignItems: "center", margin: 0 }}>
          {auth.roles && (
            <Chip
              className="mx-0 mr-2"
              color={iconSelection(auth.roles).color as IChipColor}
              icon={iconSelection(auth.roles).icon}
              label={auth.roles.toUpperCase()}
              role="none"
            />
          )}
          {auth.name && (
            <p style={{ margin: 0, cursor: "default" }}>{auth.name}</p>
          )}
        </div>
        <div className="dropdown mx-0 ml-1">
          <AccountCircleOutlined
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-expanded="false"
          />
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {auth.auth ? (
              <>
                <span className="dropdown-item disabled">My Profile</span>
                <span className="dropdown-item" onClick={() => handleLogout()}>
                  Logout
                </span>
              </>
            ) : (
              <span
                className="dropdown-item"
                onClick={() => history.push("/login")}
              >
                Login
              </span>
            )}
            {/* {auth === "user" ? (
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
            )} */}
          </div>
        </div>
      </Styled.FlexWrapper>
    </Styled.NavWrapper>
  );
};

export default NavbarMenu;
