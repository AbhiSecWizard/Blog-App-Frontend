const Newslatter = () => {
  return (
    <div className='flex flex-col items-center my-20 justify-center text-center w-screen'>

      <h1 className='text-4xl font-medium my-4 mx-7'>Never Miss a Blog !</h1>
      <p className="my-6 text-gray-400">
        Subscribe to get the latest blog, new tech and exclusive news 
      </p>
      <form action="" className="items-center">
       <div className=" border-2 border-gray-300 rounded"    >
         <input
        type="text"

        className='h-10 pl-1.5 outline-none w-120 capitalize'
        placeholder='Search Latest Blog'
      />
      <button type="submit" className="bg-primary hover:bg-hover_primary  py-2 px-6 text-white font-bold"> 
        Subscribe
      </button>
       </div>
      </form>


    </div>
  )
}
export default Newslatter
