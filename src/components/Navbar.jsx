import React, { useState } from 'react';
import mainLogo from "/logo.png";
import { MdArrowRightAlt, MdMenu, MdClose } from "react-icons/md";
import { useAppContext } from "../context/AppContext";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { token, navigate } = useAppContext();
  // Mobile drawer toggle karne ke liye state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper function to handle navigation and close menu safely
  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className='w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100'>
      {/* Main Navbar Container */}
      <div className='flex justify-between items-center py-4 mx-4 sm:mx-10 xl:mx-20 max-w-7xl md:mx-auto'>
        
        {/* Logo */}
        <img 
          src={mainLogo} 
          alt="BlogBeam Logo" 
          className="w-28 sm:w-36 cursor-pointer object-contain active:scale-98 transition-all" 
          onClick={() => handleNavigation("/")}
        />

        {/* 💻 Desktop Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <span onClick={()=>{
            document.getElementById("home")?.scrollIntoView({behavior:"smooth"})
          }} className="cursor-pointer hover:text-indigo-600 transition-colors">Home</span>
          <span 
  onClick={() => {
    document.getElementById("blogList")?.scrollIntoView({ behavior: "smooth" });
  }} 
  className="cursor-pointer hover:text-indigo-600 transition-colors"
>
  Blogs
</span>
          <span className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={()=>{
            document.getElementById("about")?.scrollIntoView({behavior:"smooth"})
          }}>About</span>
        </div>

        {/* Action Button & Hamburger */}
        <div className="flex items-center gap-3">
          {/* Main Action Button (Desktop to Mobile scalable) */}
          <button 
            onClick={() => handleNavigation("/admin")}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-full border border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700 hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-100 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            {token ? 'Dashboard' : 'Login'}
            <MdArrowRightAlt size={20} className="sm:size-[22px]" />
          </button>

          {/* Hamburger Icon: Visible ONLY on Mobile/Tablet */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full md:hidden transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            <MdMenu size={26} />
          </button>
        </div>
      </div>

      {/* 📱 Mobile Slide-in Drawer Overlap Layer */}
      <div className={`fixed inset-0 bg-black/40 z-50 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}>
        {/* Drawer Content */}
        <div 
          className={`absolute right-0 top-0 h-full w-64 bg-white shadow-2xl p-6 flex flex-col space-y-6 transform transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()} // Drawer ke andar click karne par close na ho
        >
          {/* Close Button Inside Drawer */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-lg">Menu</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
            >
              <MdClose size={24} />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col space-y-4 text-base font-medium text-gray-600">
            <div onClick={() => handleNavigation("/")} className="py-2 px-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">Home</div>
            <div onClick={() => handleNavigation("/")} className="py-2 px-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">Blogs</div>
            <div className="py-2 px-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">About</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;