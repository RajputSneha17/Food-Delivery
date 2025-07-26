import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import AddItem from "./pages/AddItem/AddItem.jsx";
import Home from "./pages/Home/Home.jsx";
import ListItem from "./pages/ListItem/ListItem.jsx";
import Order from "./pages/Order/Order.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  const url = "https://food-delivery-5nzz.onrender.com";
  return (
    <>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddItem url={url} />} />
          <Route path="/list" element={<ListItem url={url} />} />
          <Route path="/order" element={<Order url={url} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
