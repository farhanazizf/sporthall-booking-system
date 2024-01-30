import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import MainLayout from "../../components/main-layout";
import useToast from "../../components/toast";
import { setStorageValue } from "../../utils/local-storage";
import { EMAIL, PASSWORD } from "./auth";
import "./style.css";
import http from "../../utils/http";
import { LoadingButton } from "@mui/lab";

const Login: React.FC = () => {
  const history = useHistory();
  const [Toast, setToast] = useToast();

  const [loading, setLoading] = React.useState(false);
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  // const handleSubmit = () => {
  //   if (loginData.email === EMAIL && loginData.password === PASSWORD) {
  //     setStorageValue("auth", "admin", "user");
  //     history.push("/");
  //   } else {
  //     setToast({ message: "wrong email/password" });
  //   }
  // };

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await http.post(`/auth/api/v1/login`, loginData);
      setStorageValue("auth", { auth: data.token }, { auth: "" });
      history.push("/");
    } catch (error) {
      setToast({ message: "wrong email/password" });
    } finally {
      setLoading(false);
    }
  }, [history, loginData, setToast]);

  return (
    <MainLayout>
      <Toast />
      <div style={{ padding: 32 }}>
        <form>
          <h3>Sign In</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(val) =>
                setLoginData({ ...loginData, email: val.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(val) =>
                setLoginData({ ...loginData, password: val.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              {/* <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label> */}
            </div>
          </div>
          <div className="d-flex" style={{ justifyContent: "flex-end" }}>
            <LoadingButton
              variant="contained"
              onClick={onSubmit}
              loading={loading}
              style={{ width: "50%" }}
            >
              Submit
            </LoadingButton>
            {/* <button
              onClick={handleSubmit}
              type="button"
              className="btn btn-primary"
              style={{ width: "50%" }}
              disabled={loading}
            >
              Submit
            </button> */}
          </div>
          {/* <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p> */}
        </form>
      </div>
    </MainLayout>
  );
};

export default Login;
