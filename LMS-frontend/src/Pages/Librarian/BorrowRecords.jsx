import React, { useEffect, useState } from "react";
import API from "../../api";

export default function BorrowRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    try {
      const res = await API.get("/borrow/records");
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching records:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-600">Loading borrow records...</p>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div className="text-center mb-4">
          <h2 className="text-4xl pl-160 font-bold mb-1">Borrow Records</h2>
          <p className=" italic pl-160">Keep the record</p>
        </div>
        <button
          onClick={fetchRecords}
          className="bg-blue-400 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600 transition"
        >
          Refresh
        </button>
      </div>

      {records.length === 0 ? (
        <p className="text-gray-500">No borrow records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse bg-white shadow rounded">
            <thead className="bg-blue-200">
              <tr>
                <th className="p-2 border text-blue-500">User</th>
                <th className="p-2 border text-blue-500">Email</th>
                <th className="p-2 border text-blue-500">Book</th>
                <th className="p-2 border text-blue-500">Author</th>
                <th className="p-2 border text-blue-500">Borrow Date</th>
                <th className="p-2 border text-blue-500">Return Date</th>
                <th className="p-2 border text-blue-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr
                  key={record._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-orange-100"}
                >
                  <td className="p-2 border border-blue-300 text-blue-600 text-center">
                    {record.user || (
                      <span className="text-red-500 italic">Unknown User</span>
                    )}
                  </td>
                  <td className="p-2 border border-blue-300 text-blue-600 text-center">
                    {record.email || "-"}
                  </td>
                  <td className="p-2 border border-blue-300 text-blue-600 text-center">
                    {record.book || (
                      <span className="text-red-500 italic">Deleted Book</span>
                    )}
                  </td>
                  <td className="p-2 border border-blue-300 text-blue-600 text-center">
                    {record.author || "-"}
                  </td>
                  <td className="p-2 border border-blue-300 text-blue-600 text-center">
                    {new Date(record.borrowDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 border border-blue-300 text-blue-600 text-center">
                    {record.returnDate
                      ? new Date(record.returnDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="p-2 border border-blue-300 text-blue-600 text-center font-semibold">
                    {record.status === "Borrowed" ? (
                      <span className="text-red-600">Borrowed</span>
                    ) : (
                      <span className="text-green-600">Returned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
