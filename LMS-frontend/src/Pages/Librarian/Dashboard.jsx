import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUsers, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import API from "../../api"; 

export default function Dashboard() {
  const [totalBooks, setTotalBooks] = useState(0);
  const [availableBooks, setAvailableBooks] = useState(0);
  const [borrowRecords, setBorrowRecords] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const booksRes = await API.get("/books");
        setTotalBooks(booksRes.data.length); 

       
        const available = booksRes.data.filter(book => book.available > 0).length;
        setAvailableBooks(available);

       
        const borrowRes = await API.get("/borrow/records", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        // Count only currently borrowed books
        const currentBorrows = borrowRes.data.filter(record => !record.returnDate);
        setBorrowRecords(currentBorrows.length);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Dashboard</h1>
     
      <div className="grid grid-cols-1 md:grid-cols-3 w-300 ml-35 gap-6">
        {/* Total Books */}
        <div className="bg-white shadow-xl border border-2 border-gray-100 rounded-xl p-6 flex items-center gap-4 h-60 hover:scale-95 transition">
          <div className="bg-blue-500 text-white p-4 rounded-full">
            <FontAwesomeIcon icon={faBook} size="2x" />
          </div>
          <div>
            <h2 className="text-gray-500 font-semibold mb-1">Total Books</h2>
            <p className="text-2xl font-bold">{totalBooks}</p>
          </div>
        </div>

        {/* Borrow Records */}
        <div className="bg-white shadow-xl border border-2 border-gray-100 rounded-xl p-6 flex items-center gap-4 hover:scale-95 transition">
          <div className="bg-green-500 text-white p-4 rounded-full">
            <FontAwesomeIcon icon={faUsers} size="2x" />
          </div>
          <div>
            <h2 className="text-gray-500 font-semibold mb-1">Borrow Records</h2>
            <p className="text-2xl font-bold">{borrowRecords}</p>
          </div>
        </div>

        {/* Available Books */}
        <div className="bg-white shadow-xl border border-2 border-gray-100 rounded-xl p-6 flex items-center gap-4 hover:scale-95 transition">
          <div className="bg-yellow-500 text-white p-4 rounded-full">
            <FontAwesomeIcon icon={faBookOpen} size="2x" />
          </div>
          <div>
            <h2 className="text-gray-500 font-semibold mb-1">Available Books</h2>
            <p className="text-2xl font-bold">{availableBooks}</p>
          </div>
        </div>
      </div>

      <div className="w-300 bg-gradient-to-r from-blue-300 to-bluee-500 rounded-xl shadow-lg p-10 mt-4 ml-35">
        <h2 className="text-xl font-semibold text-white mb-2">Welcome!</h2>
        <p className="text-white mb-2">
          This is your library management dashboard. Here you can view statistics, manage books, borrowers, and more. Use the sidebar to navigate through the system.
        </p>
        <ul className="list-disc list-inside text-white mt-2">
          <li>View and manage all books in the library</li>
          <li>Track borrowed and returned books</li>
          <li>Manage borrower and librarian accounts</li>
          <li>Access attendance and contact information</li>
        </ul>
      </div>
    </div>
  );
}
