import React from 'react';
import { GiJusticeStar } from "react-icons/gi";
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  // 1. AppContext se input state aur set karne wala function nikalein
  const { input, setInput } = useAppContext();
  const navigate = useNavigate();

  // 2. Form submission handler
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/'); 
  };

  return (
    // FIXED: Global margins aur maximum width ko handle kiya taaki layout na toote
    <div id='home' className='mx-4 sm:mx-16 xl:mx-24 max-w-7xl md:mx-auto relative pt-8 sm:pt-12'> 
      <div className='text-center flex flex-col items-center'>
        
        {/* Badge: Text size mobile par automatic scaling ke liye responsive kiya */}
        <div className='bg-gray-50 text-indigo-600 hover:text-indigo-700 inline-flex items-center rounded-full border gap-2 sm:gap-3 border-indigo-400 hover:border-indigo-600 cursor-pointer max-w-fit px-4 py-1.5 justify-center transition-colors shadow-sm shadow-indigo-50'>
          <p className='text-[10px] sm:text-xs font-bold tracking-widest uppercase'>BLOG MANAGE. SYSTEM</p>
          <GiJusticeStar className='text-sm sm:text-base' />
        </div>
 
        {/* Heading: Mobile par line-height (leading) fix ki taaki text overlapping na ho */}
        <h1 className='text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mt-6 tracking-tight leading-tight max-w-4xl'>
          Your Own <span className='text-indigo-600'>blogging</span> <br className="hidden sm:inline" /> platform
        </h1>

        {/* Paragraph: Mobile par line-clamp aur sizing optimize ki */}
        <p className='my-4 sm:my-6 max-w-xl md:max-w-2xl text-sm sm:text-base text-gray-500 leading-relaxed px-2'>
          Welcome to a space where ideas turn into stories, and stories spark inspiration. This blog is crafted for curious minds who love learning, building, and exploring the world of technology.
        </p>

        {/* 🔍 Search Box Container: Mobile par Full Width aur modern flex layout */}
        <form 
          onSubmit={handleSearchSubmit} 
          className='w-full max-w-md mx-auto flex items-center bg-white border border-gray-200 rounded-full p-1.5 shadow-md shadow-gray-100/50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all mt-4'
        >
          <input 
            type="text" 
            placeholder='Search for blogs...' 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            className='w-full bg-transparent border-none outline-none pl-4 pr-2 text-sm sm:text-base text-gray-700 placeholder-gray-400' 
          />
          <button 
            type="submit" 
            className='bg-indigo-600 text-white font-medium rounded-full text-sm px-5 py-2 cursor-pointer hover:bg-indigo-700 active:scale-95 transition-all shrink-0'
          >
            Search
          </button>
        </form>
     
      </div>
    </div>
  )
}

export default Header;