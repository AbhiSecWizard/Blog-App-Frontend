import React, { useEffect, useState, useCallback } from "react";
import { FaRegCircleXmark, FaRegTrashCan } from "react-icons/fa6";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import moment from "moment";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const ListBlog = () => {
  const { axios } = useAppContext();
  const [blogs, setBlogs] = useState([]); 
  const [loading, setLoading] = useState(true);

  // 1. Fetch Blogs from Backend
  const fetchAllBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/blog/all");
      
      if (data?.success) {
        // YAHAN CHANGE HAI: Agar array 'message' key mein hai
        setBlogs(Array.isArray(data.message) ? data.message : []);
      } else {
        toast.error("Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error(error.response?.data?.error || "Server Error");
    } finally {
      setLoading(false);
    }
  }, [axios]);

  // 2. Toggle Publish Status
  const handleTogglePublish = async (id) => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", { id });
      if (data.success) {
        toast.success("Status Updated");
        fetchAllBlogs(); 
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 3. Delete Blog
  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const { data } = await axios.post("/api/blog/delete", { id });
      if (data.success) {
        toast.success("Blog Deleted Successfully");
        fetchAllBlogs();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, [fetchAllBlogs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-gray-500 font-medium">Loading Admin Data...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Blogs</h1>
        <p className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
          Total Blogs: {blogs?.length || 0}
        </p>
      </div>

      <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 uppercase text-[11px] font-bold tracking-wider border-b">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Blog Title</th>
              <th className="px-6 py-4">Created Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {blogs && blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <tr className="hover:bg-blue-50/20 transition-colors" key={blog._id}>
                  <td className="px-6 py-4 font-medium text-gray-400">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={blog.image} 
                        alt="" 
                        className="w-10 h-10 rounded-md object-cover bg-gray-50 border border-gray-100" 
                      />
                      <span className="font-semibold text-gray-700 line-clamp-1">{blog.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {moment(blog.createdAt).format("DD MMM YYYY")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                      blog.isPublished 
                        ? "bg-green-100 text-green-700" 
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {blog.isPublished ? "Live" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleTogglePublish(blog._id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          blog.isPublished 
                            ? "text-amber-600 bg-amber-50 hover:bg-amber-100" 
                            : "text-green-600 bg-green-50 hover:bg-green-100"
                        }`}
                      >
                        {blog.isPublished ? <FaRegCircleXmark /> : <IoCheckmarkDoneCircleOutline />}
                        {blog.isPublished ? "Unpublish" : "Publish"}
                      </button>
                      <button 
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="p-2 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
                      >
                        <FaRegTrashCan size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-16 text-center text-gray-400 italic">
                  No blogs found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;