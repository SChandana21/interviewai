import React, { useState } from 'react'
import Internshiplogo from '../img/Startup.png';
import { useRef, useEffect } from 'react';
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';

const Signup = () => {
    const [useremail, setuseremail] = useState('');
    const [validuseremail, setvaliduseremail] = useState(false);
    const [password, setpassword] = useState('')
    const [validpassword, setvalidpassword] = useState(false);
    const [confirmpassword, setconfirmpassword] = useState('')
    const [matchingpassword, setmatchingpassword] = useState(false);
    const [errmsg, seterrmsg] = useState('');

    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;


    useEffect(() => {
        const timeout = setTimeout(() => {
            const result = EMAIL_REGEX.test(useremail);
            setvaliduseremail(result)
            //testing once
            console.log(result);
            if (useremail && !result) {
                toast.error("Invalid email address", {
                    duration: 5000,
                    ariaProps: { role: "alert", "aria-live": "assertive" },
                });
            }
        }, 600);
        return () => clearTimeout(timeout);
    }, [useremail]);


    useEffect(() => {
        const timeout = setTimeout(() => {
            const result = PASSWORD_REGEX.test(password);
            setvalidpassword(result);
            console.log(result);
            if (!result && password) {
                toast.error("Invalid Password", {
                    duration: 5000,
                    ariaProps: { role: "alert", "aria-live": "assertive" },
                })
            }
        }, 600);
        return () => clearTimeout(timeout);

    }, [password]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const passwordmatchingres = password === confirmpassword;
            setmatchingpassword(passwordmatchingres);
            console.log(matchingpassword);
            if (!passwordmatchingres && confirmpassword) {
                toast.error("Passwords not matching, Please check", {
                    duration: 5000,
                    ariaProps: { role: "alert", "aria-live": "assertive" },
                })
            }
        }, 600);
        return () => clearTimeout(timeout);
    }, [confirmpassword, password])

    const submitform = axios.post()

    return (
        <>
            <Toaster />
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
                    <span className="text-sm hidden sm:text-base">Already have an account?</span>
                    <button
                        className="
          cursor-pointer rounded-lg px-5 py-2 h-12
          bg-sky-600 border border-violet-500
          text-white text-base
          hover:bg-sky-700 focus:bg-sky-700
          focus:outline-none focus:ring-4 focus:ring-sky-200
          transition duration-300
          "
                    >
                        Login
                    </button>
                </div>

            </nav>
            {/* Form section */}
            <div className=' mt-12 px-4 grid grid-cols-1 gap-2 md:grid-cols-2 md:mt-16 gap-2 md:px-16 py-4'>
                <div className='py-5 flex-1 flex flex-col items-start md: items-center justify-center gap-8' > {/* Grid Section 1 */}
                    <div className='flex items-center gap-2 justify-center bg-sky-200 px-2 py-1 rounded-full'>
                        <p className='text-base text-sky-600 font-semibold font-[poppins]'>Your Personal Mentor</p>
                        <div className='w-6 h-6 bg-white rounded-full overflow-hidden drop-shadow-xl'>
                            <img src={Internshiplogo} className='w-full h-full object-contain' alt='' />
                        </div>
                    </div>
                    <p className='mt-5 text-[2.5rem] font-[poppins] font-bold tracking-wide text-headingColor'>
                        Ace your Next Interview With
                        <span className='text-sky-600 text-[3rem]'>
                            Interview AI</span></p>
                    <p className='text-base text-gray-400'>Tailored Interview Practice — Powered by Your Own Resume. 🚀</p>
                </div>
                <div className=' py-5 flex-1'> {/* Grid section 2 */}
                    <form>
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                            <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                                <div className="p-10 space-y-4 md:space-y-6 sm:p-8">
                                    <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl font-poppins">
                                        Create an account


                                    </p>
                                    <div>
                                        <label htmlFor='email' className="block mb-2 text-base font-medium text-gray-900 font-poppins">
                                            Email
                                            <input className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="email" type="text" autoComplete='off' onChange={(e) => setuseremail(e.target.value)} value={useremail} required aria-describedby={!validuseremail && useremail ? "email-error" : undefined} />
                                            {!validuseremail && useremail && (
                                                <span id="email-error" className="sr-only">
                                                    Invalid email address
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor='password' className="block mb-2 text-sm font-medium text-gray-900 font-poppins">
                                            Password
                                            <input className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="password" type="password" required autoComplete='off' onChange={(e) => setpassword(e.target.value)} value={password} aria-describedby={!validpassword && password ? "password-error" : undefined} />
                                            {!validpassword && password && (
                                                <span id="password-error" className="sr-only">
                                                    Invalid Password
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor='confirmpassword' class="block mb-2 text-sm font-medium text-gray-900 font-poppins">
                                            Confirm password
                                            <input className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 font-poppins" id="confirmpassword" type="password" required autoComplete='off' onChange={(e) => setconfirmpassword(e.target.value)} value={confirmpassword} aria-describedby={!matchingpassword && confirmpassword ? "confirmpass-error" : undefined} />
                                            {!matchingpassword && confirmpassword && (
                                                <span id="confirmpass-error" className="sr-only">
                                                    Passwords Not matching
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                    <div className="flex items-start">

                                    </div>

                                    <button
                                        disabled={!validuseremail || !password || !confirmpassword}
                                        className={`w-full font-poppins text-sm px-5 py-2.5 rounded-lg text-center font-medium focus:outline-none focus:ring-4 ${validpassword && validuseremail && matchingpassword
                                                ? "bg-sky-600 hover:bg-sky-700 focus:ring-blue-800 cursor-pointer"
                                                : "bg-sky-200 bg-opacity-50 cursor-not-allowed focus:ring-blue-300"
                                            } text-white`}
                                        type="submit"
                                    > Create Account
                                    </button>

                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>

        </>
    )
}

export default Signup
