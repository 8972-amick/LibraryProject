import React from "react";

const Dashboard = () => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="min-h-screen w-full rounded-lg flex flex-col justify-start p-10 items-center">
        <h2 className="text-5xl font-bold">Dashboard</h2>
        <p className="mb-10 italic">Books at your fingertips</p>

        {/* boxes */}
        <div className="grid grid-cols-3 gap-5 w-300 w-20">
          <div className="bg-white text-blue-800 h-65 rounded-2xl shadow-xl border border-2 border-blue-200 flex flex-col justify-center items-center p-6 hover:scale-95 transition">
            <span className="text-4xl">👥</span>
            <h3 className="font-semibold mt-2 text-2xl">Total Members</h3>
            <span>200 members</span>
          </div>

          <div className="bg-white text-blue-800 rounded-2xl shadow-xl border border-2 border-blue-200 flex flex-col justify-center items-center p-6  hover:scale-95 transition">
            <span className="text-4xl">📚</span>
            <h3 className="font-semibold mt-2 text-2xl">Books</h3>
            <span>300 Books</span>
          </div>

          <div className="bg-white text-blue-800 rounded-2xl shadow-xl border border-2 border-blue-200 flex flex-col justify-center items-center p-6  hover:scale-95 transition">
            <span className="text-4xl">📖</span>
            <h3 className="font-semibold mt-2 text-2xl">Books Issued</h3>
            <span>120 Books</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-300 to-blue-500 rounded-xl shadow-lg p-10 mt-4 ">
          <h2 className="text-xl font-semibold text-white mb-2">Welcome!</h2>
          <p className="text-white mb-2">
            This is your library management dashboard. Here you can view
            statistics, manage books, borrowers, and more. Use the sidebar to
            navigate through the system.
          </p>
          <ul className="list-disc list-inside text-white mt-2">
            <li>View and manage all books in the library</li>
            <li>Track borrowed and returned books</li>
            <li>Manage borrower and librarian accounts</li>
            <li>Access attendance and contact information</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
