import { Button, TextField } from "@mui/material";
import React from "react";
import "./chatComponent.css"

export interface ChatComponentProps{
    id:string
    isMobile:boolean
    back:()=>void
}

const ChatComponent = (props:ChatComponentProps)=>{

    return (
        <div className="chatarea" >
            {props.isMobile && <div className="top-bar">
                <Button variant="contained" onClick={props.back} className="back-button">{"< Back"}</Button>
            </div> }

            <div className="chat-conversation"></div>
            <div className="chat-text-area" >
                <TextField type="text" multiline={true}/>
            </div>
        </div>
    )
}

export default ChatComponent;