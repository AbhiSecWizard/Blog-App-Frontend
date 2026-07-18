import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from "react-hot-toast";

const Login = () => {
  // context से navigate को भी निकालें ताकि लॉगिन के बाद रीडायरेक्ट कर सकें
  const { axios, setToken, navigate } = useAppContext();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. इनपुट क्रेडेंशियल्स को भेजने से पहले साफ़ (Trim) करें
      const cleanEmail = email.trim();
      const cleanPassword = password.trim();

      // ⚡ ध्यान दें: यहाँ हमने ${API_URL} हटाकर सिर्फ रिलेटिव पाथ रखा है, 
      // क्योंकि Axios का baseURL आपके AppContext में पहले से ही कन्फ़िगर है।
      const { data } = await axios.post('/api/admin/login', { 
        email: cleanEmail, 
        password: cleanPassword 
      });
      
      if (data.success) {
        const formattedToken = `Bearer ${data.token}`;
        
        // 2. ब्राउज़र की Local Storage में टोकन सेव करें
        localStorage.setItem('token', data.token);
        
        // 3. ग्लोबल AppContext की स्टेट में टोकन सेट करें
        setToken(data.token);
        
        // 4. आने वाली अगली Axios रिक्वेस्ट्स के लिए ग्लोबल हेडर्स कन्फ़िगर करें
        axios.defaults.headers.common['Authorization'] = formattedToken;
        axios.defaults.headers.common['token'] = data.token; // बैकअप हेडर
        
        toast.success("Logged in successfully!");

        // 5. 🚀 सफल लॉगिन के बाद एडमिन को डैशबोर्ड पर भेजें
        if (navigate) {
          navigate('/admin'); // अपने रूट के हिसाब से इसे बदल सकते हैं (जैसे '/dashboard' या '/')
        }
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-50'>
      <div className='w-full max-w-sm p-8 mx-4 border border-indigo-100 shadow-xl bg-white rounded-xl'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full text-center'>
            <h1 className='text-3xl font-bold text-gray-800'>
              <span className='text-indigo-600'>Admin</span> Login
            </h1>
            <p className='font-light text-gray-500 mt-2 text-sm'>
              Enter your credentials to access the admin panel
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className='mt-6 w-full text-gray-600'>
            {/* Email Input */}
            <div className='flex flex-col mb-4'>
              <label className='text-sm font-medium mb-1 text-gray-700'>Email</label>
              <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required 
                placeholder="admin@gmail.com" 
                className='border-b-2 border-gray-200 py-2 outline-none focus:border-indigo-600 transition-colors text-gray-800 bg-transparent'
              />
            </div>
            
            {/* Password Input */}
            <div className='flex flex-col mb-6'>
              <label className='text-sm font-medium mb-1 text-gray-700'>Password</label>
              <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required 
                placeholder="••••••••" 
                className='border-b-2 border-gray-200 py-2 outline-none focus:border-indigo-600 transition-colors text-gray-800 bg-transparent'
              />
            </div>
            
            {/* Submit Button */}
            <button 
              type='submit' 
              disabled={loading}
              className='w-full py-3 font-medium bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-100 active:scale-[0.98]'
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;