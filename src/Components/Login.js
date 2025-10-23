import React, { useState, useEffect, useContext } from 'react';
import Internshiplogo from '../img/Startup.png';
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import Header from './Header';
import { UserContext } from '../Context/Usercontext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [useremail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const LOGIN_URL = "http://localhost:3500/Login";

  // Validate email
  useEffect(() => {
    const timeout = setTimeout(() => {
      const isValid = EMAIL_REGEX.test(useremail);
      setValidEmail(isValid);
      if (useremail && !isValid) toast.error("Invalid email address", { duration: 4000 });
    }, 500);
    return () => clearTimeout(timeout);
  }, [useremail]);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!useremail || !password) return;

    try {
      const response = await axios.post(
        LOGIN_URL,
        { email: useremail, password },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );

      toast.success(response.data.message);
      setUser({ email: response.data.email, accessToken: response.data.accessToken });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('email', response.data.email);

      navigate('/upload', { replace: true }); 

    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) toast.error("Invalid email or password");
        else if (status === 404) toast.error("Account not found");
        else toast.error("Server error, please try again later");
      } else {
        toast.error("Network error, please try again");
      }
    }
  };

  return (
    <>
      <Toaster />
      <Header />
      <div className='mt-12 px-4 grid grid-cols-1 gap-2 md:grid-cols-2 md:mt-16 md:px-16 py-4'>
        {/* Left Info */}
        <div className='py-5 flex-1 flex flex-col items-start md:items-center justify-center gap-8'>
          <div className='flex items-center gap-2 justify-center bg-sky-200 px-2 py-1 rounded-full'>
            <p className='text-base text-sky-600 font-semibold font-[poppins]'>Your Personal Mentor</p>
            <div className='w-6 h-6 bg-white rounded-full overflow-hidden drop-shadow-xl'>
              <img src={Internshiplogo} className='w-full h-full object-contain' alt='' />
            </div>
          </div>
          <p className='mt-5 text-[2.5rem] font-[poppins] font-bold tracking-wide text-headingColor'>
            Ace your Next Interview With
            <span className='text-sky-600 text-[3rem]'> Interview AI</span>
          </p>
          <p className='text-base text-gray-400'>Tailored Interview Practice — Powered by Your Own Resume. 🚀</p>
        </div>

        {/* Login Form */}
        <div className='py-5 flex-1'>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
              <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-10 space-y-4 md:space-y-6 sm:p-8">
                  <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl font-poppins">
                    Login
                  </p>

                  <div>
                    <label htmlFor='email' className="block mb-2 text-base font-medium text-gray-900 font-poppins">
                      Email
                      <input
                        id="email"
                        type="text"
                        autoComplete='off'
                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        onChange={(e) => setUserEmail(e.target.value)}
                        value={useremail}
                        required
                      />
                    </label>
                  </div>

                  <div>
                    <label htmlFor='password' className="block mb-2 text-sm font-medium text-gray-900 font-poppins">
                      Password
                      <input
                        id="password"
                        type="password"
                        autoComplete='off'
                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!validEmail || !password}
                    className={`w-full font-poppins text-sm px-5 py-2.5 rounded-lg text-center font-medium focus:outline-none focus:ring-4 ${
                      validEmail && password
                        ? "bg-sky-600 hover:bg-sky-700 focus:ring-blue-800 cursor-pointer"
                        : "bg-sky-200 bg-opacity-50 cursor-not-allowed focus:ring-blue-300"
                    } text-white`}
                  >
                    Login
                  </button>

                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
