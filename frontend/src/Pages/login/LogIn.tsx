import React, { CSSProperties, useEffect, useState } from "react";
import { rgbToHex, TextField } from "@mui/material";
import "./LogIn.css";
import logo from "./jark1.gif";
export interface LogInPageProps {
  theme: string
  setTheme: (name: string) => void;
}
const LogInPage = () => {
  ;
  const [isLogIn, setIsLogIn] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("rgb(99,61,109)");


  function getRandomColor() { //To give me a new rgb number everytime
    return (Math.floor(Math.random() * (255 - 10)) + 10);
  }

  function getColor() {
    return `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`;
  }

  useEffect(() => {
    setInterval(() => {

      setBackgroundColor(getColor())
    }, 1000)

  }, [])
  return (
    <div className="login-container" style={{ backgroundColor: backgroundColor }}>
      <img src={logo} />
      <div className="login-name">
        <span
          className={isLogIn ? "login-active-form" : ""}
          onClick={() => setIsLogIn(true)}
        >
          Log in
        </span>
        {" / "}
        <span
          className={!isLogIn ? "login-active-form" : ""}
          onClick={() => setIsLogIn(false)}
        >
          Register
        </span>
      </div>
      <div className="login-input-container">
        <TextField
          className="login-input"
          type="email"
          label="Email"
          placeholder="Email"
        />
      </div>
      <div className="login-input-container">
        <TextField className="login-input" type="text" placeholder="Password" />
      </div>
      <div className="login-input-container">
        <TextField
          className={`login-input ${!isLogIn ? "login-show-verify" : "login-hide-verify"
            }`}
          type="text"
          placeholder="Verify Password"
        />
      </div>
    </div>
  );
};

export default LogInPage;
