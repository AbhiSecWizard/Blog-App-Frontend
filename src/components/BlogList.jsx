import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { blogCategories } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import BlogCard from './BlogCard';

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input, fetchBlogs } = useAppContext();

  // 🔄 Fetch latest backend data on mount
  useEffect(() => {
    if (fetchBlogs) {
      fetchBlogs();
    }
  }, []);

  // 1. Data Mapping: Safe parsing from multiple potential payloads
  const blogArray = useMemo(() => {
    if (!blogs) return [];
    if (blogs.message && Array.isArray(blogs.message)) return blogs.message;
    if (blogs.blogs && Array.isArray(blogs.blogs)) return blogs.blogs;
    if (Array.isArray(blogs)) return blogs;
    return [];
  }, [blogs]);

  // 2. Filtering Logic: Safe lookups across title, category, and text description
  const filteredBlogs = useMemo(() => {
    return blogArray.filter((blog) => {
      const searchTerm = input?.toLowerCase().trim() || "";
      
      const matchesSearch = searchTerm === "" ||
        blog.title?.toLowerCase().includes(searchTerm) ||
        blog.category?.toLowerCase().includes(searchTerm) ||
        blog.description?.toLowerCase().includes(searchTerm);

      const matchesCategory = menu === "All" ||
        blog.category?.toLowerCase() === menu.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [blogArray, input, menu]);

  return (
    <div className="w-full" id='blogList'>
      {/* 📱 Category Tabs: Responsive Horizontal Scroll on Mobile, Centered on Desktop */}
      <div className="w-full my-6 sm:my-10 px-4 sm:px-10">
        <div className="flex items-center md:justify-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar pb-3 md:pb-0 scroll-smooth snap-x">
          {blogCategories.map((item) => (
            <div className="relative shrink-0 snap-chip" key={item}>
              <button
                onClick={() => setMenu(item)}
                className={`transition-all duration-300 cursor-pointer py-2 px-4 sm:px-5 z-10 relative text-xs sm:text-sm md:text-base font-medium rounded-full select-none whitespace-nowrap ${
                  menu === item ? 'text-white font-semibold' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {item}
                {menu === item && (
                  <motion.div
                    layoutId="activeTab"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute inset-0 bg-indigo-600 rounded-full -z-10 shadow-md shadow-indigo-100"
                  />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🗺️ Blog Grid: Dynamic padding and modern layout matching all breakpoints */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-24 px-4 sm:px-8 lg:px-16 xl:px-24">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))
        ) : (
          <div className="col-span-full text-center py-16 sm:py-20 bg-gray-50/60 rounded-2xl border border-dashed border-gray-200 mx-2">
            <p className="text-gray-500 font-medium text-base sm:text-lg">No blogs found matching your criteria.</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 px-4">Try checking your spelling or selecting another category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;