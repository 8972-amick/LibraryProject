import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState } from "react";

// Auth pages
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import NotFound from "./Pages/User/NotFound";

// Borrower pages
import Bar from "./Pages/Index/Bar";
import Home from "./Pages/Index/Home";
import Dashboard from "./Pages/Index/Dashboard";
import AboutUs from "./Pages/Index/AboutUs";
import ContactUs from "./Pages/Index/ContactUs";
import Book from "./Pages/Index/Book";

// Librarian pages
import LBar from "./Pages/Librarian/LBar";
import LibrarianDashboard from "./Pages/Librarian/Dashboard";
import AddBooks from "./Pages/Librarian/AddBooks";
import ManageBooks from "./Pages/Librarian/ManageBooks";
import BorrowRecords from "./Pages/Librarian/BorrowRecords";

// ProtectedRoute Component
const ProtectedRoute = ({ allowedRoles, children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/login" replace />;

  return children;
};

// Borrower Layout Wrapper
const BorrowerLayout = ({ search, setSearch }) => (
  <Bar search={search} setSearch={setSearch}>
    <Outlet />
  </Bar>
);

// Librarian Layout Wrapper
const LibrarianLayout = () => (
  <LBar>
    <Outlet />
  </LBar>
);

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Borrower routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["borrower"]}>
              <BorrowerLayout search={search} setSearch={setSearch} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="book" element={<Book search={search} />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="contactus" element={<ContactUs />} />
        </Route>

        {/* Librarian routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["librarian"]}>
              <LibrarianLayout />
            </ProtectedRoute>
          }
        >
          <Route path="librarian/dashboard" element={<LibrarianDashboard />} />
          <Route path="librarian/managebooks" element={<ManageBooks />} />
          <Route path="librarian/addbooks" element={<AddBooks />} />
          <Route path="librarian/borrowrecord" element={<BorrowRecords />} />
        </Route>

        {/* Logout */}
        <Route path="/logout" element={<Navigate to="/login" replace />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
