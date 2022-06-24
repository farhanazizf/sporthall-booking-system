import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import Homepage from "./pages/Home";
import DetailPage from "./pages/Detail";
import Login from "./pages/Login";
import ReportPage from "./pages/ReportTable";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Homepage} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/detail" component={DetailPage} exact />
        <Route path="/report" component={ReportPage} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
