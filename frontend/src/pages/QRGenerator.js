import React, { useState } from "react";
import { jsPDF } from "jspdf";
import axios from "axios";

const QRGenerator = ({ hexImages }) => {
  const [number, setNumber] = useState(0);
  const [data, setData] = useState([]);

  const PAGE_WIDTH = 210;
  const PAGE_HEIGHT = 297;
  const IMAGE_WIDTH = 50;
  const IMAGE_HEIGHT = 50;
  const IMAGES_PER_ROW = Math.floor(PAGE_WIDTH / IMAGE_WIDTH);
  const handlePrintClick = () => {
    const doc = new jsPDF();

    let rowIndex = 0;
    let colIndex = 0;
    let currentY = 10;

    data.forEach((hex, index) => {
      if (colIndex >= IMAGES_PER_ROW) {
        colIndex = 0;
        rowIndex++;
        currentY += IMAGE_HEIGHT;
      }

      if (currentY + IMAGE_HEIGHT > PAGE_HEIGHT) {
        rowIndex = 0;
        currentY = 10;
        doc.addPage();
      }

      const x = colIndex * IMAGE_WIDTH + 10;
      const y = currentY;

      // const imgData = hexToDataURL(hex);
      doc.addImage(hex, "PNG", x, y, IMAGE_WIDTH, IMAGE_HEIGHT);

      colIndex++;
    });

    // Save or print the PDF
    doc.save("QR.pdf");
  };

  const token = localStorage.getItem("token");
  // Replace 'your_token_key' with the actual key you used to store the token.
  console.log(token);
  // Create a headers object with the token
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const handleGenerate = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/v1/noofQrCodes",
        {
          numberOfQrCodes: number,
        },
        { headers }
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg py-6 px-4  ">
        <p className="text-start text-3xl font-bold">Generate QR</p>
      </div>
      <div className="bg-white flex flex-justify rounded-lg py-6 px-4  ">
        <input
          className="w-3/4 rounded-md focus:border-primary border-0 py-2 px-2 hover:border-2 hover:border-primary"
          onChange={(e) => setNumber(e.target.value)}
          type="text"
          id="noQrCodes"
          placeholder="Enter the number of QR Codes to be generated"
        />
        <button
          className="px-4 ml-4 py-2 text-white bg-primary rounded-md text-sm md:text-xl"
          onClick={handleGenerate}
        >
          Generate
        </button>
      </div>
      {data.length > 0 && (
        <div className="bg-white rounded-lg py-6 px-4">
          <div className="flex flex-wrap gap-4">
            {data.map((hex, index) => (
              <img
                className="h-32 w-32 object-cover"
                src={hex}
                alt={`Image ${index}`}
              />
            ))}
          </div>
          <div className="text-lg text-white">
            <button
              className="px-16 py-4 bg-primary rounded-md font-semibold"
              onClick={handlePrintClick}
            >
              Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
