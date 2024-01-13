import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";

const Tracker = () => {
  const [qrData, setQrData] = useState("");
  const [qrDataArray, setQrDataArray] = useState([]);
  const [item, setItem] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
    qrId: "",
    userId: "",
    expiry: "",
  });
  const [userId, setUserId] = useState("");

  const token = localStorage.getItem("token");
  // Replace 'your_token_key' with the actual key you used to store the token.
  console.log(token);
  // Create a headers object with the token
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (qrData) {
      axios
        .get(`http://localhost:5000/api/v1/${qrData}`, { headers })
        .then((res) => {
          setItem(res.data.item);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [qrData]);

  const handleResult = (result) => {
    if (result) {
      console.log(result.text);
      setQrData(result.text);
      setItem({ ...item, qrId: result.text });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(qrDataArray);

    const updatePromises = qrDataArray.map((qrCode) => {
      const newStatus = qrCode.status === "given" ? "received" : "given";
      return axios.patch(
        `http://localhost:5000/api/v1/update/${qrCode}`,
        {
          userId,
          status: newStatus,
        },
        { headers }
      );
    });

    Promise.all(updatePromises)
      .then((responses) => {
        setItem({
          name: "",
          description: "",
          category: "",
          location: "",
          qrId: "",
          userId: "",
          expiry: "",
        });
        console.log(responses);
        setQrData("");
        setQrDataArray([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-bgbackground">
      <div className="w-full max-w-md p-4 border border-gray-300 rounded-md bg-white">
        <h2 className="text-3xl font-bold text-center text-black">Edit Item</h2>

        <input
          type="text"
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Incharge"
          className="mt-4 p-2 border rounded-lg w-full"
        />

        <QrReader
          delay={300}
          onError={handleError}
          onResult={handleResult}
          style={{ width: "100%" }}
        />

        <p className="text-center mt-4 text-2xl text-black text">
          {qrData ? qrData : "Scan properly"}
        </p>

        <button
          onClick={handleSubmit}
          className="bg-primary text-white px-4 py-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out w-full mt-4"
        >
          Scan
        </button>
      </div>
    </div>
  );
};

export default Tracker;
