import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { blogCategories } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import BlogCard from './BlogCard';

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  // 1. Data Mapping: Correctly extracts the array from the "message" key
  const blogArray = useMemo(() => {
    if (!blogs) return [];
    
    // If blogs is the object { success: true, message: [...] }
    if (blogs.message && Array.isArray(blogs.message)) {
      return blogs.message;
    }
    
    // Fallback if the API structure changes to { blogs: [...] }
    if (blogs.blogs && Array.isArray(blogs.blogs)) {
      return blogs.blogs;
    }

    // If blogs is directly the array
    if (Array.isArray(blogs)) {
      return blogs;
    }

    return [];
  }, [blogs]);

  // 2. Filtering Logic
  const filteredBlogs = useMemo(() => {
    return blogArray.filter((blog) => {
      const searchTerm = input?.toLowerCase() || "";
      
      const matchesSearch = searchTerm === "" ||
        blog.title?.toLowerCase().includes(searchTerm) ||
        blog.category?.toLowerCase().includes(searchTerm);

      const matchesCategory = menu === "All" ||
        blog.category?.toLowerCase() === menu.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [blogArray, input, menu]);

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative flex-wrap'>
        {blogCategories.map((item) => (
          <div className='relative' key={item}>
            <button
              onClick={() => setMenu(item)}
              className={`transition-colors duration-300 cursor-pointer py-2 px-5 z-10 relative text-sm sm:text-base font-medium ${
                menu === item ? 'text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId='activeTab'
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className='absolute inset-0 bg-primary rounded-full -z-10'
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 px-6 sm:px-10 lg:px-20'>
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-400 text-lg">No blogs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;