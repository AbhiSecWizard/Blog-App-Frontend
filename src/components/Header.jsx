import { GiJusticeStar } from "react-icons/gi";


const Header = () => {
    return (
    <div className='mx-8 sm:mx-16 xl-mx-24 relative'>
        <div className='text-center'>
               <div className=' bg-gray-100/5 text-primary hover:text-blue-700 inline-flex items-center rounded-full border gap-3 border-blue-500 hover:border-blue-700 cursor-pointer w-60 px-2.5 justify-center py-2'>
                <p className=''>New: AI feature integrated </p>
                  <GiJusticeStar className=''  />
               </div>
        <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>
            Your Own <span className='text-primary'>blogging</span> <br /> platform
        </h1>
        <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>
            Welcome to a space where ideas turn into stories, and stories spark inspiration. This blog is crafted for curious minds who love learning, building, and exploring the world of technology, creativity, and growth
        </p>
        <div className='rounded inline-flex border border-gray-400 px-1 py-1 gap-0.5 '>
            <input type="text" placeholder='search for blogs' className='border-none outline-0 pl-2 rounded capitalize' />
        <button className='bg-primary text-white rounded px-4 py-1 '>Search</button>
        </div>
     
        </div>
        <img className='bg-linear-to-r from-slate-100 to-slate-100' alt="" />
    </div>
  )
}

export default Header
