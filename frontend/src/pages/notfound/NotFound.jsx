// Jai Shree Ram
import React from 'react'

function NotFound() {
  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <img 
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" 
        alt="404 animation"
        className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mb-4 sm:mb-6 md:mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] rounded-lg"
      />
      <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold tracking-tight [text-shadow:_0_0_30px_rgba(255,255,255,0.4)] animate-pulse">
        404
      </h1>
      <div className="w-16 sm:w-20 md:w-24 h-1 bg-red-600 my-4 sm:my-6 md:my-8 shadow-[0_0_20px_rgba(220,38,38,0.6)]"></div>
      <h2 className="text-xl sm:text-2xl md:text-4xl font-light mb-2 sm:mb-3 md:mb-4 text-center drop-shadow-[0_4px_3px_rgba(0,0,0,0.5)]">
        Page Not Found
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-400 text-center mb-6 sm:mb-7 md:mb-8 max-w-xs sm:max-w-sm md:max-w-md drop-shadow-[0_4px_3px_rgba(0,0,0,0.3)]">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <a 
        href="/"
        className="px-6 sm:px-7 md:px-8 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base bg-white text-black font-medium rounded hover:bg-gray-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
      >
        Go Back Home
      </a>
    </div>
  )
}

export default NotFound