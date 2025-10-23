// Context/Usercontext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); //using our accesstoken and email as user obj

  const refreshAccessToken = async () => {
    try {
      const response = await axios.get("http://localhost:3500/refresh", { withCredentials: true });
      setUser({ email: response.data.email, accessToken: response.data.accesstoken });
      localStorage.setItem("accessToken", response.data.accesstoken);
      return true;
    } catch (err) {
      setUser(null);
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setUser({ email: null, accessToken: token });

    const interval = setInterval(async () => {
      const success = await refreshAccessToken();
      if (!success) clearInterval(interval);
    }, 9 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
