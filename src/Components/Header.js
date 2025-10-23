import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../Context/Usercontext';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3500/logout", {}, { withCredentials: true });
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("email");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Logout failed.");
    }
  };

  return (
    <nav className="flex flex-col sm:flex flex-row  justify-between items-center px-6 py-4 bg-white font-poppins">
      <div className="flex items-center gap-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png"
          alt="Logo"
          className="w-10 sm:w-16"
        />
        <h1 className="text-xl sm:text-2xl font-bold text-sky-600">InterviewAI</h1>
      </div>

      <div className="flex flex-col items-center gap-2 sm:gap-6 flex-row">
        {location.pathname === "/login" && (
          <>
            <span className="text-sm hidden sm:text-base">Don't have an account?</span>
            <button
              className="
                cursor-pointer rounded-lg px-5 py-2 h-12
                bg-sky-600 border border-violet-500
                text-white text-base
                hover:bg-sky-700 focus:bg-sky-700
                focus:outline-none focus:ring-4 focus:ring-sky-200
                transition duration-300
              "
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </>
        )}

        {user?.accessToken && location.pathname !== "/login" && (
          <button
            className="
              cursor-pointer rounded-lg px-5 py-2 h-12
              bg-sky-600 border border-violet-500
              text-white text-base
              hover:bg-sky-700 focus:bg-sky-700
              focus:outline-none focus:ring-4 focus:ring-sky-200
              transition duration-300
            "
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

        {!user?.accessToken && location.pathname !== "/login" && (
          <button
            className="
              cursor-pointer rounded-lg px-5 py-2 h-12
              bg-sky-600 border border-violet-500
              text-white text-base
              hover:bg-sky-700 focus:bg-sky-700
              focus:outline-none focus:ring-4 focus:ring-sky-200
              transition duration-300
            "
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
