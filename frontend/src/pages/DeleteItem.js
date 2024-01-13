import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteItem = () => {
  const [qrData, setQrData] = useState("");
  const [item, setItem] = useState(null);
  const token = localStorage.getItem("token");
  // Replace 'your_token_key' with the actual key you used to store the token.
  // console.log(token);
  // Create a headers object with the token
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    // Fetch the item data using qrData (assuming you have an API endpoint for this)
    if (qrData) {
      axios
        .get(`http://localhost:5000/api/v1/${qrData}`, {
          headers,
        })
        .then((res) => {
          const itemData = res.data.item;
          setItem(itemData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [qrData]);
  const handleError = (error) => {
    console.error(error);
  };

  const handleResult = (result) => {
    if (result) {
      setQrData(result.text);
    }
  };

  const handleDelete = () => {
    if (item) {
      axios
        .delete(`http://localhost:5000/api/v1/delete/${qrData}`)
        .then((res) => {
          console.log("Item deleted successfully");
          toast("Item deleted successfully!");
          setItem(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div>
        <p>Delete Item</p>
      </div>
      <QrReader
        delay={300}
        onError={handleError}
        onResult={handleResult}
        style={{ width: "100%" }}
      />
      <p>{qrData ? qrData : "Scan properly"}</p>
      {item ? (
        <div>
          <p>Item Details:</p>
          <p>Name: {item.name}</p>
          <p>Description: {item.description}</p>
          <p>Category: {item.category}</p>
          <p>Location: {item.location}</p>
          <p>Incharge: {item.userId}</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <p>{qrData ? "No such item to delete" : ""}</p>
      )}
    </div>
  );
};

export default DeleteItem;
