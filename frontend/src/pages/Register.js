import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: name,
      username: username,
      password: password,
      userType: userType,
    };
    console.log(userData);

    axios
      .post("http://localhost:5000/api/v1/register", userData)
      .then((res) => {
        // const newToken = res.data.token;

        // // Store the token in local storage
        // localStorage.setItem("token", newToken);

        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Registration failed. Please try again later.");
      });
  };

  return (
    <div className="h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="w-full">
        <Link to="/">
          <img
            src={logo}
            alt="logo.png"
            className="w-fit h-14 md:w-fit md:h-14 ml-4 pt-4"
          />
        </Link>
      </div>
      <div className="flex flex-col items-center m-4 mt-8 justify-center text-left">
        <div className="bg-gray-100 shadow-lg rounded-md p-8 w-full m-4 max-w-md">
          <h2 className="text-2xl md:text-4xl font-semibold mb-4 md:mb-6 text-center">
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-gray-600 font-semibold ml-2">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                className="w-full px-4 py-2 border text-lg hover:border-primary mt-1 rounded-md focus:outline-none focus:border-primary"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-600 font-semibold ml-2">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                className="w-full px-4 py-2 border text-lg mt-1 hover:border-primary rounded-md focus:outline-none focus:border-primary"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-600 font-semibold ml-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border mt-1 rounded-md text-lg hover:border-primary focus:outline-none focus:border-primary"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-600 font-semibold ml-2">
                User Type:
              </label>
              <select
                id="userType"
                name="userType"
                value={userType}
                onChange={handleUserTypeChange}
                className="w-full px-4 py-2 border text-lg mt-1 hover:border-primary rounded-md focus:outline-none focus:border-primary"
                required
              >
                <option value="">Select User Type</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-primary text-white rounded-md px-4 py-2 mt-6 text-lg md:text-xl hover:bg-opacity-80"
              >
                Register
              </button>
              {errorMessage && (
                <p className="text-red-500 mt-2">{errorMessage}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
