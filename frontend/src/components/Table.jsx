import React, { useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";

const Table = ({ data }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      // If clicking on the same column, reverse the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If clicking on a different column, set it as the new sort column
      setSortColumn(columnName);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortColumn) {
      if (sortOrder === "asc") {
        return a[sortColumn].localeCompare(b[sortColumn]);
      } else {
        return b[sortColumn].localeCompare(a[sortColumn]);
      }
    }
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-sm">S.No</th>
            <th className="px-4 py-2 text-sm items-center">
              Item Name
              <button className="" onClick={() => handleSort("name")}>
                <BiSortAlt2 />
              </button>
            </th>
            <th className="px-4 py-2 text-sm">
              Category Name
              <button className="" onClick={() => handleSort("category")}>
                <BiSortAlt2 />
              </button>
            </th>
            <th className="px-4 py-2 text-sm">
              Location
              <button className="" onClick={() => handleSort("location")}>
                <BiSortAlt2 />
              </button>
            </th>
            <th className="px-4 py-2 text-sm">
              {" "}
              Incharge
              <button className="" onClick={() => handleSort("userId")}>
                <BiSortAlt2 />
              </button>
            </th>
            <th className="px-4 py-2 text-sm">
              Expiry
              <button className="" onClick={() => handleSort("expiry")}>
                <BiSortAlt2 />
              </button>
            </th>
            <th className="px-4 py-2 text-sm">
              Description
              <button className="" onClick={() => handleSort("description")}>
                <BiSortAlt2 />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-4 py-2 text-sm">{index + 1}</td>
              <td className="px-4 py-2 text-sm">{item.name}</td>
              <td className="px-4 py-2 text-sm">{item.category}</td>
              <td className="px-4 py-2 text-sm">{item.location}</td>
              <td className="px-4 py-2 text-sm">{item.userId}</td>
              <td className="px-4 py-2 text-sm">
                {item.expiry ? new Date(item.expiry).toLocaleDateString() : ""}
              </td>
              <td className="px-4 py-2 text-sm">{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
