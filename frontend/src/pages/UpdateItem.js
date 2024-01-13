import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateItem = ({ itemId }) => {
  const [qrData, setQrData] = useState("");
  const [item, setItem] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
    qrId: "",
    userId: "",
  });
  const token = localStorage.getItem("token");
  // Replace 'your_token_key' with the actual key you used to store the token.
  // console.log(token);
  // Create a headers object with the token
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (qrData) {
      axios
        .get(`http://localhost:5000/api/v1/${qrData}`, {
          headers,
        })
        .then((res) => {
          // const itemData = res.data; // Assuming the API response contains item data
          setItem(res.data.item);
        })
        .then(console.log(item))
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, [qrData]);

  const handleResult = (result) => {
    if (result) {
      setQrData(result.text);
      setItem({ ...item, qrId: result.text });
    }
  };

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `http://localhost:5000/api/v1/update/${qrData}`,
        item
      ) // Assuming you have an API endpoint for updating items
      .then((res) => {
        console.log(res);
        toast("Updates saved succesfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-md rounded-lg bg-primary">
      <h2 className="text-3xl font-bold text-center">Edit Item</h2>

      <QrReader
        delay={300}
        onError={(error) => console.error(error)}
        onResult={handleResult}
        style={{ width: "100%" }}
      />

      <p className="text-center mt-4 text-2xl color-primary">
        {qrData ? qrData : "Scan properly"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <label htmlFor="name" className="block text-sm font-medium w-1/4">
            Name:{" "}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={item.name}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-lg flex-grow"
          />
        </div>

        <div className="flex items-center">
          <label
            htmlFor="description"
            className="block text-sm font-medium w-1/4"
          >
            Description:{" "}
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={item.description}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-lg flex-grow"
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="category" className="block text-sm font-medium w-1/4">
            Category:{" "}
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={item.category}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-lg flex-grow"
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="location" className="block text-sm font-medium w-1/4">
            Location:{" "}
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={item.location}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-lg flex-grow"
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="userId" className="block text-sm font-medium w-1/4">
            Incharge:{" "}
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={item.userId}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-lg flex-grow"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out w-full"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
