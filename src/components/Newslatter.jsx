import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }
    // Aap yahan apni API call integrate kar sakte hain
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    // FIXED: w-screen ko hata kar w-full lagaya aur max-width limit set ki
    <div className='w-full max-w-4xl mx-auto my-16 sm:my-24 px-4 flex flex-col items-center justify-center text-center'>

      {/* Heading: Mobile par text-3xl aur bade screens par text-4xl */}
      <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight mb-3'>
        Never Miss a Blog!
      </h2>
      
      {/* Subtitle */}
      <p className="text-sm sm:text-base text-gray-500 max-w-md mb-8 leading-relaxed">
        Subscribe to get the latest blogs, new tech trends, and exclusive news delivered straight to your inbox.
      </p>

      {/* 📬 Responsive Subscription Form */}
      <form 
        onSubmit={handleSubscribe} 
        className="w-full max-w-md mx-auto"
      >
        {/* Container: Mobile par input aur button alag lines mein (stacked) honge, sm: display par ek sath single row mein merge ho jayenge */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0 border-none sm:border sm:border-gray-200 sm:bg-white sm:rounded-full sm:p-1.5 sm:shadow-md sm:shadow-gray-100/50 focus-within:sm:border-indigo-500 focus-within:sm:ring-2 focus-within:sm:ring-indigo-100 transition-all">
          
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // FIXED: Mobile par independent stylish input, desktop par seamless row input
            className='w-full h-12 sm:h-auto pl-4 pr-3 outline-none text-sm sm:text-base text-gray-700 bg-white border border-gray-200 sm:border-none rounded-xl sm:rounded-none placeholder-gray-400'
            placeholder='Enter your email address'
          />
          
          <button 
            type="submit" 
            className="h-12 sm:h-auto bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] py-2.5 px-6 text-white font-semibold text-sm sm:text-base rounded-xl sm:rounded-full shadow-md sm:shadow-none transition-all cursor-pointer whitespace-nowrap shrink-0"
          > 
            Subscribe
          </button>

        </div>
      </form>

    </div>
  );
};

export default Newsletter;