import React from "react";
import mainLogo from "../assets/logo.png";
import { FaYoutube, FaInstagramSquare, FaFacebook } from "react-icons/fa";
import { GrTwitter } from "react-icons/gr";

const Footer = () => {
  return (
    // FIXED: w-screen ko w-full se badla taaki horizontal scrollbug na aaye
    <div className="bg-gray-400/10 rounded-t-2xl w-full overflow-hidden border-t border-gray-100">
      
      {/* Grid Container: Mobile par single column, tablets par 2, desktops par 4 columns */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 py-12 md:py-16">
        
        {/* Brand / Logo Section */}
        <div className="flex flex-col space-y-4">
          <img 
            src={mainLogo} 
            className="h-[60px] w-auto max-w-[180px] object-contain" 
            alt="BlogBeam Logo" 
          />
          <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, autem dicta. Dolore porro atque debitis autem. Repellendus aperiam earum.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-sm text-gray-600 flex flex-col space-y-2.5">
          <h4 className="text-gray-800 font-bold uppercase tracking-wider text-xs mb-1">Quick Links</h4>
          <p className="cursor-pointer hover:text-indigo-600 transition-colors w-fit">Home</p>
          <p className="cursor-pointer hover:text-indigo-600 transition-colors w-fit">Best Sellers</p>
          <p className="cursor-pointer hover:text-indigo-600 transition-colors w-fit">Offers & Deals</p>
          <p className="cursor-pointer hover:text-indigo-600 transition-colors w-fit">Contact Us</p>
          <p className="cursor-pointer hover:text-indigo-600 transition-colors w-fit">FAQs</p>
        </div>   

        {/* Support Section */}
        <div className="text-sm text-gray-600 flex flex-col space-y-2.5">
          <h4 className="text-gray-800 font-bold uppercase tracking-wider text-xs mb-1">Need Help</h4>
          <p className="cursor-pointer hover:text-indigo-600 transition-colors w-fit">Delivery Information</p>
          <p className="cursor-pointer hover:text-indigo-600 transition-colors w-fit">Return & Refund Policy</p>
          <p className="cursor-pointer hover:text-indigo-600 transition-colors w-fit">Payment Methods</p>
          <p className="cursor-pointer hover:text-indigo-600 transition-colors w-fit">Track your Order</p>
          <p className="cursor-pointer hover:text-indigo-600 transition-colors w-fit">Contact Us</p>
        </div>   

        {/* Social Media Links */}
        <div className="text-sm text-gray-600 flex flex-col space-y-2.5">
          <h4 className="text-gray-800 font-bold uppercase tracking-wider text-xs mb-1">Follow Us</h4>
          <p className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors w-fit">
            <FaInstagramSquare className="text-base" /> Instagram
          </p>
          <p className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors w-fit">
            <GrTwitter className="text-base" /> Twitter
          </p>
          <p className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors w-fit">
            <FaFacebook className="text-base" /> Facebook
          </p>
          <p className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors w-fit">
            <FaYoutube className="text-base" /> YouTube
          </p>
        </div>
                  
      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-gray-200/60 max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-400 text-center sm:text-left">
          &copy; {new Date().getFullYear()} by BlogBeam. All rights reserved.
        </p>
        <div className="flex gap-4 text-xs text-gray-400">
          <span className="cursor-pointer hover:text-gray-600">Privacy Policy</span>
          <span className="cursor-pointer hover:text-gray-600">Terms of Service</span>
        </div>
      </div>

    </div>
  );
};

export default Footer;