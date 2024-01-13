import React, { useState, useEffect } from "react";
import { Sidebar, Navbar } from "../components";
import { Outlet } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";

import axios from "axios";

const Dashboard = () => {
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   axios.get("http://").then((response) => {
  //     setItems(response.data);
  //   });
  // }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4 rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
