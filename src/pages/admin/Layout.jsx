import { Outlet } from "react-router-dom";
import { useState } from "react";
import { IoExitOutline, IoMenu, IoClose } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import mainLogo from "/logo.png";
import { useAppContext } from "../../context/AppContext";
import { motion } from "framer-motion";

const Layout = () => {
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);
 const { axios, setToken, navigate } = useAppContext();

const logout = () => {
  // 1. LocalStorage se token hatayein
  localStorage.removeItem('token');

  // 2. Axios headers ko clean karein taaki purana token headers mein na rahe
  // Dhyan dein: image mein 'Authorization' header use ho raha hai
  axios.defaults.headers.common['token'] = null; 
  axios.defaults.headers.common['Authorization'] = null;

  // 3. Global state reset karein
  setToken(null);

  // 4. User ko login page ya home page par bhej dein
  navigate('/');
  
  // Optional: Success message dikhane ke liye
  // toast.success("Logged out successfully");
}
  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== Top Navbar ===== */}
      <div className="flex justify-between items-center py-4 px-6 sm:px-16 border-b">
        {/* Hamburger */}
        <button
          className="sm:hidden text-3xl"
          onClick={() => setOpen(true)}
        >
          <IoMenu />
        </button>

        <img src={mainLogo} alt="logo" className="w-28 sm:w-36"  onClick={()=>navigate("/")}/>

        <button
          onClick={() =>{
              navigate("/")
              logout()
          } }
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium
          rounded-full border bg-primary text-white cursor-pointer"
        >
          Logout
          <IoExitOutline size={20} />
        </button>
      </div>

      {/* ===== Main Section ===== */}
      <div className="flex flex-1 relative">
        {/* Desktop Sidebar */}
        <div className="hidden sm:block w-64 border-r bg-white">
          <Sidebar />
        </div>

        {/* ===== Mobile Animated Sidebar ===== */}
        <AnimatePresence>
          {open && (
            <>
              {/* Overlay */}
              <motion.div
                className="fixed inset-0 bg-black/40 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />

              {/* Sliding Sidebar */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl"
              >
                <button
                  className="absolute top-4 right-4 text-2xl"
                  onClick={() => setOpen(false)}
                >
                  <IoClose />
                </button>

                <Sidebar onLinkClick={() => setOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;