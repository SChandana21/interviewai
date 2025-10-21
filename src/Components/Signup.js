import React, { useState } from 'react'
import Internshiplogo from '../img/Startup.png';
import { useRef, useEffect } from 'react';

const Signup = () => {
    const [emailfocus, setemailfocus]  = useState(false);
    const [useremail, setuseremail] = useState('');
    const [validuseremail, setvaliduseremail] = useState(false);
    const [password, setpassword]  = useState('')
    const [validpassword, setvalidpassword] = useState(false);
    const [passwordfocus, setpasswordfocus] = useState(false);
    const [matchingpassword, setmatchingpassword] = useState(false);
    const [errmsg, seterrmsg]  = useState('');
    
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    useEffect(() => {
        const timeout = setTimeout(() => {
            const result = EMAIL_REGEX.test(useremail);
            setvaliduseremail(result)
            //testing once
            console.log(result);
        }, 600);
        return () => clearTimeout(timeout);
        }, [useremail]);


    useEffect(() => {
        const timeout = setTimeout(() => {
            const result = PASSWORD_REGEX.test(password);
            setvalidpassword(result);
            const passwordsmatchingresult = password === matchingpassword
            setmatchingpassword(passwordsmatchingresult);
        },600);
        return () => clearTimeout(timeout);
    }, [password, matchingpassword]);

    useEffect(() => {
        seterrmsg('')
    }, [useremail, password, matchingpassword])

  return (
    <>
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
          hover:bg-violet-600 focus:bg-violet-700
          focus:outline-none focus:ring-4 focus:ring-violet-200
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
            <img src={Internshiplogo} className='w-full h-full object-contain' alt=''/>
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
                <input className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="email" type="text" autoComplete='off' onChange={(e) => setuseremail(e.target.value)} value={useremail} required/>
                </label>
              </div>
              <div>
                <label htmlFor='password' className="block mb-2 text-sm font-medium text-gray-900 font-poppins">
                  Password
                <input className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"  id="password" type="password" required autoComplete='off' onChange={(e) => setpassword(e.target.value)} value={password}/>
                </label>
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 font-poppins">
                  Confirm password
                <input className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 font-poppins"  id="confirmPassword" type="password" required autoComplete='off'/>
                </label>
              </div>
              <div className="flex items-start">
                
              </div>

              <button class="w-full cursor-pointer font-poppins  bg-sky-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
                Create an account
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
