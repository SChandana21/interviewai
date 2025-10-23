import React from 'react'

const Header = () => {
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
          hover:bg-sky-700 focus:bg-sky-700
          focus:outline-none focus:ring-4 focus:ring-sky-200
          transition duration-300
          "
                    >
                        Login
                    </button>
                </div>

            </nav>
    </>
  )
}

export default Header