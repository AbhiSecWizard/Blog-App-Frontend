import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
      <div className="h-14 w-14 rounded-full border-4 border-gray-300 border-t-black animate-spin"></div>
    </div>
  );
};

export default Loader;