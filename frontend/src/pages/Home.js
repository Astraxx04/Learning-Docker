import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import furniture from "../assets/table.svg";
import Laptop from "../assets/Laptop.svg";
import Chair from "../assets/Chair.svg";
import Food from "../assets/food.svg";
import axios from "axios";
import { BarChart, PieChart, Table } from "../components";

const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // const [notifications, setNotifications] = useState([]);
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState();
  const [messages, setMessages] = useState();
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  const count = (y) => {
    return data.filter((x) => x.category === y).length;
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/", { headers }).then((res) => {
      setData(res.data.items);
      setTableData(res.data.items);
      // console.log(res.data.items);
    });
  }, []);

  const token = localStorage.getItem("token");
  // Replace 'your_token_key' with the actual key you used to store the token.
  // console.log(token);
  // Create a headers object with the token
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/v1/alerts", { headers })
      .then((res) => {
        setNotification(res.data);
        console.log(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/v1/notifications", { headers })
      .then((res) => {
        setMessages(res.data);
        console.log(res.data);
      });
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 overflow-y-auto font-semibold self-stretch">
      <div className="py-6 px-4 shadow-md flex justify-between items-center bg-white rounded-lg">
        <p className="text-3xl text-start font-bold">Dashboard</p>
        <p
          className="border border-green-400 bg-gray-200 p-2 rounded-md text-lg cursor-pointer"
          onClick={toggleSidebar}
        >
          <IoIosNotificationsOutline />
        </p>
      </div>
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 h-full w-80 shadow-lg bg-cyan-50 transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        <div className="flex justify-end p-4">
          <p className="cursor-pointer" onClick={closeSidebar}>
            X {/* You can replace 'X' with your preferred close symbol */}
          </p>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <p className="text-2xl font-bold text-black">Notifications</p>
          <div className="space-y-2 gap-2 flex flex-col">
          {messages && messages.map((message, index) => (
            <div key={index} className="bg-gray-200 p-2 rounded-md text-sm">
              {message}
            </div>
          ))}
          {notification && notification.map((message, index) => (
            <div key={index} className="bg-gray-200 p-2 rounded-md text-sm">
              {message}
            </div>
          ))}
          </div>
        </div>
      </div>
      <div className=" gap-20 bg-white px-4 py-6 flex justify-between items-center rounded-lg">
        <PieChart />
        <p></p>
        <BarChart />
      </div>
      <div className="flex gap-4 bg-white px-4 py-6 rounded-lg">
        <div
          className="overflow-y-auto self-stretch"
          style={{ maxHeight: "calc(100vh - 500px)" }}
        >
          {/* Table section */}
          {/* Replace PieChart with your PieChart component */}

          <div className="flex justify-between mb-4 bg-cyan-50 w-80 rounded-lg px-4 items-center">
            <div className=" flex flex-col justify-evenly items-start self-stretch">
              <div>
                <p className="font-bold text-lg text-start text-black">
                  Furniture
                </p>
                <p className="text-black">Count : {count("furniture")}</p>{" "}
                {/* Pass the category */}
              </div>
              <button
                className="px-6 text-sm py-1 border border-green-400 rounded-md text-black"
                onClick={() => {
                  setTableData(data.filter((x) => x.category === "furniture"));
                }}
              >
                View
              </button>
            </div>
            <img className="w-32 h-32" src={furniture} alt="table" />
          </div>

          {/* Laptop section */}
          <div className="flex justify-between mb-4 bg-cyan-50 w-80 rounded-lg px-4 items-center">
            <div className="flex flex-col justify-evenly items-start self-stretch">
              <div>
                <p className="font-bold text-lg text-start text-black">
                  Hardware
                </p>
                <p className="text-black">Count : {count("hardware")}</p>{" "}
                {/* Pass the category */}
              </div>
              <button
                className="px-6 text-sm py-1 border border-green-400 rounded-md text-black"
                onClick={() =>
                  setTableData(data.filter((x) => x.category === "hardware"))
                }
              >
                View
              </button>
            </div>
            <img className="w-32 h-32" src={Laptop} alt="Food" />
          </div>

          {/* Chair section */}
          <div className="flex justify-between mb-4 bg-cyan-50 w-80 rounded-lg px-4 items-center">
            <div className="flex flex-col justify-evenly bg-green-50 items-start self-stretch">
              <div>
                <p className="font-bold text-lg text-start text-black">Food</p>
                <p className="text-black">Count : {count("food")}</p>{" "}
                {/* Pass the category */}
              </div>
              <button
                className="px-6 text-sm py-1 border border-green-400 rounded-md text-black"
                onClick={() =>
                  setTableData(data.filter((x) => x.category === "food"))
                }
              >
                View
              </button>
            </div>
            <img className="w-24 h-24" src={Food} alt="Chair" />
          </div>
        </div>
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 500px)" }}
        >
          {/* Replace Table with your Table component */}
          <Table data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
