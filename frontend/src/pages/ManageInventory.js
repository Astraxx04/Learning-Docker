import React, { useEffect, useState } from "react";
import { Table } from "../components";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageInventory = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  // Replace 'your_token_key' with the actual key you used to store the token.
  // console.log(token);
  // Create a headers object with the token
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/", { headers })
      .then((res) => setData(res.data.items));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg py-6 px-4  ">
        <p className="text-start text-3xl font-bold">Manage Inventory</p>
      </div>
      <div className="rounded-lg bg-white py-6 px-4 ">
        <div className="flex flex-wrap justify-evenly">
          <button
            onClick={() => navigate("/item/add")}
            className="px-24 py-8 bg-green-100 rounded-md font-semibold"
          >
            Add Item
          </button>
          <button
            onClick={() => navigate("/item/update")}
            className="px-24 py-8 bg-yellow-100 rounded-md font-semibold"
          >
            Update Item
          </button>{" "}
          <button
            onClick={() => navigate("/item/delete")}
            className="px-24 py-8 bg-red-100 rounded-md font-semibold"
          >
            Delete Item
          </button>
        </div>
        <div className="mt-16 flex flex-col gap-4">
          <p className="text-start font-bold text-lg">Recently added Items</p>
          <div
            className="overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 400px)" }}
          >
            <Table data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageInventory;
