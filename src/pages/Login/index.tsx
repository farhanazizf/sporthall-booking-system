import React from "react";
import { useHistory } from "react-router-dom";
import MainLayout from "../../components/main-layout";
import useToast from "../../components/toast";
import { setStorageValue } from "../../utils/local-storage";
import { EMAIL, PASSWORD } from "./auth";
import "./style.css";

const Login: React.FC = () => {
  const history = useHistory();
  const [Toast, setToast] = useToast();

  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    if (loginData.email === EMAIL && loginData.password === PASSWORD) {
      setStorageValue("auth", "admin", "user");
      history.push("/");
    } else {
      setToast({ message: "wrong email/password" });
    }
  };

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
            <button
              onClick={handleSubmit}
              type="button"
              className="btn btn-primary"
              style={{ width: "50%" }}
            >
              Submit
            </button>
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
