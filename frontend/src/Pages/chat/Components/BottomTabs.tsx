import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faGear } from "@fortawesome/free-solid-svg-icons";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./bottomTabs.css";
import UserList from "./UserList";
const BottomTabs = (props:{userSelected:(id:string)=>void}) => {

    let mockUsers = [{name:"nos"},{name:"klara"},{name:"jasmina"},{name:"rando"}]
  return (
    <div className="tabs-container">
      <Tabs>
        <TabList>
          <Tab>
            <FontAwesomeIcon icon={faAddressBook} />
            <p className="tab-title">Contacts</p>
          </Tab>
          <Tab>
            <FontAwesomeIcon icon={faGear} />
            <p className="tab-title">Settings</p>
          </Tab>
        </TabList>

        <TabPanel>
          <UserList users={mockUsers} click={props.userSelected} />
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default BottomTabs;
