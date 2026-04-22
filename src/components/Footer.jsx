import mainLogo from "../assets/logo.png";
import { FaYoutube } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { GrTwitter } from "react-icons/gr";

const Footer = () => {



  return (
    <div className='bg-gray-400/20 rounded-t-xl w-screen overflow-hidden'>
        {/* Changed h-[300px] to sm:h-[300px] and added h-auto + padding for mobile */}
        <div className='grid sm:grid-cols-[2fr_1fr_1fr_1fr] grid-cols-1 sm:h-[300px] h-auto gap-8 sm:gap-0 p-10 sm:p-0'>
          
          <div className='flex flex-col justify-center items-start sm:items-stretch'>
                <img src={mainLogo} className='h-[100px] w-[200px] mb-4 sm:mb-0' alt="Logo" />
                <p className='sm:px-10 text-md text-gray-600 [word-spacing:5px] text-justify'>
                 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, autem dicta. Dolore porro atque debitis autem. Repellendus aperiam earum
                </p>
         </div>

          <div className='text-md text-gray-600 flex flex-col justify-center'>
             <h1 className='text-gray-800 font-medium mb-2'>Quick Links</h1>
             <p className="cursor-pointer hover:text-gray-900">Home</p>
             <p className="cursor-pointer hover:text-gray-900">Best Sellers</p>
             <p className="cursor-pointer hover:text-gray-900">Offers & Deals</p>
             <p className="cursor-pointer hover:text-gray-900">Contact Us</p>
             <p className="cursor-pointer hover:text-gray-900">FAQs</p>
         </div>   

          <div className='text-md text-gray-600 flex flex-col justify-center '>
             <h1 className="text-gray-800 font-medium mb-2">Needs Help</h1>
             <p>Delivery Information</p>
             <p>Return & Refund Policy</p>
             <p>Payment Methods</p>
             <p>Track your Order</p>
             <p>Contact Us</p>
         </div>   

          <div className='text-md text-gray-600 flex flex-col justify-center '>
             <h1 className="text-gray-800 font-medium mb-2">Follow Us</h1>
             <p className="flex items-center gap-1.5 mb-1 cursor-pointer"><span><FaInstagramSquare/></span>Instagram</p>
             <p className="flex items-center gap-1.5 mb-1 cursor-pointer"><span><GrTwitter/></span>Twitter</p>
             <p className="flex items-center gap-1.5 mb-1 cursor-pointer"><span><FaFacebook/></span>Facebook</p>
             <p className="flex items-center gap-1.5 mb-1 cursor-pointer"><span><FaYoutube/></span>YouTube</p>
         </div>
                  
    </div>

    <hr className="border-t border-gray-500 my-2 mx-7" />
    
    <div className='pb-6 justify-center flex w-full'>
        <h1 className='text-xs text-gray-500'>Copyright {new Date().getFullYear()} by BlogBeam All right reserved</h1>
    </div>  
    </div>
  )
}

export default Footer