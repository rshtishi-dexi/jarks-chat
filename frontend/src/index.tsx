import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import LogInPage from "./Pages/login/LogIn";
import Chat from "./Pages/chat/Chat";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState("");



  return (
    <>
      {(isLoggedIn) ? (
        <Chat



        />
      ) : (
        <LogInPage
          connect={(name: string) => {
            setIsLoggedIn(true)
            setId(name)
          }}
        />
      )}
    </>
  );
};
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();