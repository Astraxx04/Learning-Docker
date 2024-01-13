import React from "react";
import { Link } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import Table from "../assets/table.svg";
import Laptop from "../assets/Laptop.svg";
import Chair from "../assets/Chair.svg";
import Tracker from "./Tracker";
const TrackDashboard = () => {
  return (
    <div className="flex flex-col gap-4  overflow-y-auto font-semibold self-stretch ">
      <div className="py-6 px-4 shadow-md flex justify-between items-center bg-white rounded-lg">
        <p className="text-3xl text-start font-bold">Tracker</p>
        <div>
          <Link className="bg-primary text-white px-4 py-2 font-semibold rounded-md">
            Add Tracker
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-6  bg-white px-4 py-6 rounded-lg ">
        <div className="flex flex-col items-start gap-4 py-6 px-6 bg-green-50 w-80 rounded-md">
          <p className="text-lg font-bold ">Gagan</p>
          <div className="flex gap-8 items-center ">
            <p className="text-sm ">Should Return : 67</p>
            <Link to="/track/hackman" className="border px-4 py-1 rounded-md">
              Track
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 py-6 px-6 bg-green-50 w-80 rounded-md">
          <p className="text-lg font-bold ">Ayushui</p>
          <div className="flex gap-8 items-center ">
            <p className="text-sm ">Should Return : 48</p>
            <Link to="/track/hackman" className="border px-4 py-1 rounded-md">
              Track
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackDashboard;
