import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { BsQrCodeScan } from "react-icons/bs";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Icon from "../assets/icon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!isCollapsed);
  };
  const token = localStorage.getItem("token");
  // Replace 'your_token_key' with the actual key you used to store the token.
  console.log(token);
  // Create a headers object with the token
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleLogOut = () => {
    axios.post("http://localhost:5000/api/v1/logout", { headers }).then(() => {
      // toast("log out sucessfull");
      navigate("/");
    });
  };
  return (
    <div
      className={`p-6  h-screen bg-primary text-white transition-all flex flex-col justify-between ${
        isCollapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          {isCollapsed ? (
            <img className="w-10" src={Icon} alt="logo.png" />
          ) : (
            <Link to="/">
              <img className="w-32" src={Logo} alt="logo.png" />
            </Link>
          )}
          <button
            className="text-white hover:text-gray-400 transition duration-300"
            onClick={toggleSidebar}
          >
            {isCollapsed ? (
              <>
                <AiOutlineRight />
              </>
            ) : (
              <>
                <AiOutlineLeft />
              </>
            )}
          </button>
        </div>

        <Link to="/dashboard/home" className="flex items-center gap-2 text-lg">
          <RxDashboard />
          <span className={`text-sm ${isCollapsed ? "hidden" : ""}`}>
            Dashboard
          </span>
        </Link>
        <Link
          to="/dashboard/QRGenerator"
          className="flex items-center gap-2 text-lg"
        >
          <BsQrCodeScan />
          <span className={`text-sm ${isCollapsed ? "hidden" : ""}`}>
            Generate QR
          </span>
        </Link>
        <Link
          to="/dashboard/ManageInventory"
          className="flex items-center gap-2 text-lg"
        >
          <MdOutlineInventory2 />
          <span className={`text-sm ${isCollapsed ? "hidden" : ""}`}>
            Manage Inventory
          </span>
        </Link>
        <Link to="/dashboard/Track" className="flex items-center gap-2 text-lg">
          <MdOutlineLogout />
          <span className={`text-sm ${isCollapsed ? "hidden" : ""}`}>
            Track
          </span>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <p
          className={` text-start font-semibold ${isCollapsed ? "hidden" : ""}`}
        >
          Account
        </p>
        <p className="flex items-center gap-2 text-lg">
          <FaRegUserCircle />
          <span className={`text-sm ${isCollapsed ? "hidden" : ""}`}>
            Ayushi Sah
          </span>
        </p>
        <button
          onClick={handleLogOut}
          className="flex items-center gap-2 text-lg"
        >
          <MdOutlineLogout />
          <span className={`text-sm ${isCollapsed ? "hidden" : ""}`}>
            Log Out
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
