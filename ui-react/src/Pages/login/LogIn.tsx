import React, { useState } from "react";
import { Input, TextField } from "@mui/material";
import "./LogIn.css";
const LogInPage = () => {
  const [isLogIn, setIsLogIn] = useState(false);
  return (
    <div className="login-container">
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
          className={`login-input ${
            !isLogIn ? "login-show-verify" : "login-hide-verify"
          }`}
          type="text"
          placeholder="Verify Password"
        />
      </div>
    </div>
  );
};

export default LogInPage;
