// import React from 'react'
import mainLogo from "/logo.png"
import { MdArrowRightAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";


const Navbar = () => {
// const navigate = useNavigate()

const {token ,navigate} = useAppContext()

  return (
    <div className='flex justify-between py-5 mx-6 sm:mx-10 xl:mx-15'>
      <img src={mainLogo} alt="" className="w-32 sm:w-36" onClick={()=>navigate("/")}/>
   <div className="flex items-center">
       <button 
       onClick={()=> navigate("/admin")}
       className=" flex items-center gap-1.5 
  px-5 py-2
  text-sm sm:text-base
  font-medium
  rounded-3xl  border border-gray-300
  bg-primary
 text-white
  hover:bg-hover_primary 
  hover:border-gray-400
  hover:shadow-md
  transition-all duration-200
  active:scale-95
  cursor-pointer
">
  {token ? 'Dashboard':'Login'}

  <MdArrowRightAlt size={25} />
</button>
   </div>
    </div>
  )
}

export default Navbar
