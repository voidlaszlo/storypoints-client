import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import Start from "./Start";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="m-4">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path=":roomId" element={<App />} />
          <Route path="admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
