import React from "react";
import { UserInfo } from "./UserList";
import "./userRow.css"


const UserRow = (props:{user:UserInfo,click:(id:string)=>void})=>{
    return (
        <div className="user-row" onClick={()=>{props.click(props.user.name)}} >
            <div className="image-container">
            <img src={props.user.image?props.user.image:"./profile-image.png"} />
            </div>
            <p className="users-name">
                {props.user.name}
            </p>
        </div>
    )
}

export default UserRow;