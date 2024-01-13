import React, { useState } from "react";
import logo from "../assets/logo.png";
import landing from "../assets/landing.png";
import { Link } from "react-router-dom";

const Landing = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const taglineStyle = {
    textAlign: "center",
    fontSize: "45px",
    fontWeight: "bold",
    margin: "20px 0",
  };

  const tagline = {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    margin: "20px 0",
  };

  const imageStyle = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "30%",
    maxHeight: "100vh",
  };

  // Inline CSS styles
  const sidebarStyle = {
    position: "fixed",
    top: "0",
    left: isSidebarOpen ? "0" : "-100%",
    width: "80%",
    height: "100%",
    backgroundColor: "#0074e4",
    zIndex: "1000",
    transition: "left 0.3s ease-in-out",
    overflowY: "auto",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    fontSize: "24px",
    cursor: "pointer",
    color: "white",
  };

  return (
    <div className="bg-background h-screen">
      {/* Mobile sidebar navigation */}
      <div style={Object.assign({}, sidebarStyle, isSidebarOpen && { left: "0" })}>
        <button
          style={closeButtonStyle}
          onClick={toggleSidebar}
        >
          &#x2716;
        </button>
        <img src={logo} alt="Image" className="h-10 w-25 mx-auto" />
        <ul className="mt-6 space-y-4 text-2xl">
          {/* Sidebar content */}
          {/* <li>
            <a href="/home" style={navbarTextStyle}>
              Home
            </a>
          </li>
          <li>
            <a href="/pricing" style={navbarTextStyle}>
              Pricing
            </a>
          </li>
          <li>
            <a href="/control" style={navbarTextStyle}>
              Control
            </a>
          </li> */}
          <li>
            <a href="/dashboard/Login" style={navbarTextStyle}>
              Login
            </a>
          </li>
          <li>
            <a href="/dashboard/Register" style={navbarTextStyle}>
              Get Started
            </a>
          </li>
        </ul>
      </div>

      <nav className={`bg-primary p-4 md:flex justify-between items-center text-white br-15 ${isSidebarOpen ? 'hidden' : ''}`}>
        {!isSidebarOpen && (
          <>
            <div className="flex items-center">
              <Link to="/">
                <img src={logo} alt="Image" className="h-10 w-25" />
              </Link>
            </div>
            { /*<div className="hidden md:block">
              <ul className="space-x-10 text-2xl flex flex-justify items-center">
                <li className="p-15">
                  <Link to="/home" style={navbarTextStyle}>
                    Home
                  </Link>
                </li>
                <li className="p-15">
                  <Link to="/pricing" style={navbarTextStyle}>
                    Pricing
                  </Link>
                </li>
                <li className="p-15">
                  <Link to="/control" style={navbarTextStyle}>
                    Control
                  </Link>
                </li>
              </ul>
            </div> */}
            <div className="hidden md:block">
              <ul className="flex space-x-6">
                <li>
                  <Link to="/dashboard/Login" style={navbarTextStyle}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/Register" style={navbarTextStyle}>
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
        <button
          className={`md:hidden text-white text-3xl cursor-pointer absolute top-2 right-2 ${isSidebarOpen ? 'hidden' : ''}`}
          onClick={toggleSidebar}
        >
          &#x2630;
        </button>
      </nav>
      <div>
        <h1 style={taglineStyle}>"Redefining Inventory, One Scan at a Time"</h1>
        <h4 style={tagline}>Revolutionizing inventory management through scanning technology</h4>
        <img src={landing} alt="Landing" style={imageStyle} />
      </div>
    </div>
  );
};

const navbarTextStyle = {
  fontSize: "20px",
  color: "white"
};

export default Landing;
