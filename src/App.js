import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/blog/Update"
// DATABASE_PASSWORD: GtdSVzQdhFKyqAQK

function App() {

  function toastUpdated() {
    return toast('blog has been updated successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        type: 'success'
    })
}

  return (
    <BrowserRouter>
      <nav>
        <ToastContainer />
        <h1>supabase blogs</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create New Smoothie</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/blog/:id" element={<Update toastUpdated={toastUpdated} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
