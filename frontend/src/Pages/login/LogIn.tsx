import React, { CSSProperties, useEffect, useState } from "react";
import { Button, rgbToHex, TextField } from "@mui/material";
import "./LogIn.css";
import logo from "./jark1.gif";
import { User } from "../../jark.models";

export interface LogInPageProps {
  theme: string
  setTheme: (name: string) => void;
}

const LogInPage = () => {
  ;
  const [isLogIn, setIsLogIn] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("rgb(99,61,109)");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');


  const handleSignIn = (event: any) => {
    console.log('handleSubmit ran');
    event.preventDefault();
    console.log('username', username);
    console.log('password ', password);

    let user = {
      username: username,
      password: password
    };

    setUsername('');
    setPassword('');
  };
  const handleRegister = (event: any) => {
    console.log('handleSubmit ran');
    event.preventDefault();


    console.log('username', username);
    console.log('password ', password);
    console.log('Verify password', verifyPassword);

    let user = {
      username: username,
      password: password
    };

    fetch("http://localhost:8090/signin", {

      method: 'POST',
      body: JSON.stringify(user),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    setUsername('');
    setPassword('');
    setVerifyPassword('');
  };


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
          type="text"
          label="Username"
          placeholder="Username"
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <div className="login-input-container">
        <TextField className="login-input" type="password" placeholder="Password"
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <div className="login-input-container">
        <TextField
          className={`login-input ${!isLogIn ? "login-show-verify" : "login-hide-verify"
            }`}
          type="password"
          placeholder="Verify Password"
          onChange={event => setVerifyPassword(event.target.value)}
        />
      </div>
      <div className="login-input-container">
        <Button variant="contained" onClick={handleSignIn} className={`login-input ${isLogIn ? "show-button" : "hide-button"
          }`}>Sign In</Button>
      </div>
      <div className="login-input-container">
        <Button variant="contained" onClick={handleRegister} className={`login-input ${!isLogIn ? "show-button" : "hide-button"
          }`}>Register</Button>
      </div>
    </div>
  );
};

export default LogInPage;
