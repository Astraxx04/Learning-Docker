import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials, setToken } from "../features/authSlice";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { username, password } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  // Replace 'your_token_key' with the actual key you used to store the token.
  // console.log(token);
  // Create a headers object with the token
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleUsernameChange = (e) => {
    dispatch(setCredentials({ username: e.target.value, password }));
  };

  const handlePasswordChange = (e) => {
    dispatch(setCredentials({ username, password: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:5000/api/v1/login", userData, {
        headers,
      })
      .then((res) => {
        const newToken = res.data.token;

        // Store the token in local storage
        localStorage.setItem("token", newToken);

        dispatch(setToken(newToken));

        // Add the token to the axios headers for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        navigate("/dashboard/home");
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Login failed. Please check your credentials.");
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
      <div className="flex flex-col items-center m-4 mt-24 justify-center">
        <div className="bg-gray-100 shadow-lg rounded-md p-8 w-full m-4 max-w-md">
          <h2 className="text-2xl md:text-4xl font-semibold mb-6 md:mb-10 text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                className="w-full px-4 py-2 border text-lg hover:border-primary rounded-md focus:outline-none focus:border-primary"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border rounded-md text-lg mb-6 hover:border-primary focus:outline-none focus:border-primary"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-primary text-white rounded-md px-4 py-2 text-lg md:text-xl hover:bg-opacity-80"
              >
                Log In
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

export default Login;
