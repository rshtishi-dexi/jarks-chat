import React, { useEffect, useState } from "react";
import { Message } from "../../jark.models";



export interface chatMessageBoxProps {
    id: string
    message: Message
}
const ChatMessageBox = (props: chatMessageBoxProps) => {

    const getStyles = () => {
        let styles: React.CSSProperties = {
            backgroundColor: "#f1f1f1",
            border: "2px solid #dedede",
            borderRadius: "5px",
            padding: "20px",
            margin: "10px 0",
            width: "60%"
        }

        if (props.id != props.message.sender) {
            styles.backgroundColor = "#6B5471";
            styles.color = "white";
            styles.float = "right";
            return styles
        }
        else {
            styles.backgroundColor = "#D9D9D9"
            styles.float = "left";
        }
        return styles
    }

    const getStylesWrapper = () => {
        let styles: React.CSSProperties = {
            display: "flex",
            flexDirection: "row"
        }
        return styles
    }

    return (
        <div className="chatMessageWrapper" style={getStylesWrapper()}>
            <div className="logo" style={{
                paddingRight: "10px"
            }}>
                <img></img>
            </div>
            <div style={getStyles()}>
                <div className="msg-info-name">
                    Klara
                    {props.message.sender}
                </div>
                <p>
                    {props.message.content}
                    Hello. How are you today?
                </p>
                <span className="time-right"
                    style={{
                        float: "right",
                        color: "#aaa",
                    }}>
                    11:00
                    {props.message.created?.toString()}
                </span>
            </div>
        </div>

    )


}



export default ChatMessageBox;