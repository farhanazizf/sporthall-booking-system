import { Container } from "@mui/material";
import React from "react";
import TopMenu from "./top-menu";
import NavbarMenu from "./navbar";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import logoSweat from "../assets/sweatt.png";

const FooterComponent: React.FC = () => {
  return (
    <footer className="navbar py-5 bg-light mt-5">
      <div className="container d-flex align-items-start">
        <div className="col-md-3">
          <img src={logoSweat} alt="logo" style={{ width: "100%" }} />
        </div>
        <div className="col-md-3" style={{ minHeight: 125 }}>
          <h4>Sweat</h4>
          <p className="text-secondary" id="foot">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            voluptatem numquam facilis harum est, eum nesciunt magnam neque
            culpa quod!
          </p>
        </div>
        <div className="col-md-3 float-right" style={{ minHeight: 125 }}>
          <h4>USER</h4>
          <p className="my-0">
            <span className="text-secondary">Users</span>
          </p>
          <p className="my-0">
            <span className="text-secondary">Register User</span>
          </p>
          <p className="my-0">
            <span className="text-secondary">Terms & Condition</span>
          </p>
          <p className="my-0">
            <span className="text-secondary">FAQ User</span>
          </p>
        </div>
        <div className="col-md-3" style={{ minHeight: 125 }}>
          <h4>Follow us on</h4>
          <div className="social mt-3">
            <FacebookIcon className="mr-3" fontSize="large" />
            <InstagramIcon className="mr-3" fontSize="large" />
            <TwitterIcon className="mr-3" fontSize="large" />
            {/* <i id="instagram" className="fab fa-instagram mr-3"></i> */}
          </div>
        </div>
      </div>
    </footer>
  );
};
const MainLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div>
      <TopMenu />
      <NavbarMenu />
      <Container maxWidth="lg">{children}</Container>
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
