import React, { useState } from "react";
import { Input, TextField } from "@mui/material";
import "./userlist.css";
import { userInfo } from "os";
import UserRow from "./UserRow";

export interface UserListProps{
    users:UserInfo[]
    click:(id:string)=>void
}

export interface UserInfo {
    name:string
    image?:string
}

const UserList = (props:UserListProps) => {

    

  const [isLogIn, setIsLogIn] = useState(false);
  return (
    <div className="user-list">
       {props.users.map((user,index)=> <UserRow  click={props.click} key={index}  user={user}/>)}
    </div>
  );
};

export default UserList;
