import React from "react";

const Loader = () => {
  return (
    // Backdrop overlay: isme ease-in-out transition aur accessibility select-none lagayi hai
    <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-md z-50 select-none transition-all duration-300">
      
      {/* Container to handle spinner and text */}
      <div className="flex flex-col items-center gap-3">
        
        {/* Animated Spinner - Mobile par thoda customized aur smooth loading feel */}
        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-4 border-gray-200 border-t-indigo-600 animate-spin shadow-sm"></div>
        
        {/* Optional: Subtle Loading text for better user experience */}
        <p className="text-xs sm:text-sm font-medium text-gray-500 tracking-wide animate-pulse">
          Loading...
        </p>
        
      </div>
      
    </div>
  );
};

export default Loader;