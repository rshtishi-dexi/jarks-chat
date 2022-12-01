import React, { CSSProperties, useEffect, useState } from "react";
import { Input, TextField } from "@mui/material";
import "./chat.css";
import UserList from "./Components/UserList";
import useWindowSize, { Size } from "../../utils/useWindow";
import BottomTabs from "./Components/BottomTabs";
import ChatComponent from "./Components/ChatComponent";
const Chat = () => {
  const size: Size = useWindowSize();
  const [activeChat, setActiveChat] = useState("");

  let mockUsers = [
    { name: "nos" },
    { name: "klara" },
    { name: "jasmina" },
    { name: "rando" },
  ];

  const handleUserRowSelected = (userClickedID: string) => {
    console.log("clicked:", userClickedID);

    setActiveChat(userClickedID);
  };

  const handleWindowResize = () => {
    console.log("size changed :", JSON.stringify(size));

    if (!size.width || !size.height) return;
    if (size.width <= size.height) {
      setIsDesktopMode(false);
    } else {
      setIsDesktopMode(true);
    }
    console.log("is desktop : ", isDesktopMode);
  };
  useEffect(handleWindowResize, [size]);

  const [isDesktopMode, setIsDesktopMode] = useState(true);
  return (
    <div className={"main-container"}>
      {isDesktopMode && (
        <div className="desktop-content">
          <UserList users={mockUsers} click={handleUserRowSelected} />
          <ChatComponent
            back={() => {
              handleUserRowSelected("");
            }}
            isMobile={!isDesktopMode}
            id={activeChat}
          />
        </div>
      )}

      {!isDesktopMode &&
        (activeChat ? (
          <ChatComponent
            back={() => {
              handleUserRowSelected("");
            }}
            isMobile={!isDesktopMode}
            id={activeChat}
          />
        ) : (
          <BottomTabs userSelected={handleUserRowSelected} />
        ))}
    </div>
  );
};

export default Chat;
