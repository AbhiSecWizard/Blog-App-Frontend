import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  // Destructure with safe defaults
  const {
    title = "Untitled Blog",
    description = "",
    category = "General",
    image = "https://via.placeholder.com/400x225?text=No+Image",
    _id
  } = blog || {};

  // Clean description for preview (removes HTML tags if they exist)
  const cleanDescription = description.replace(/<[^>]*>?/gm, '');
  const previewText = cleanDescription.length > 90 
    ? cleanDescription.substring(0, 90) + "..." 
    : cleanDescription;

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className='group w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100'
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          src={image}
          alt={title}
        />
      </div>

      {/* Content Container */}
      <div className='p-5'>
        <span className='px-3 py-1 inline-block bg-blue-50 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest mb-3'>
          {category}
        </span>

        <h5 className='text-lg font-bold text-gray-900 line-clamp-2 mb-2 leading-tight'>
          {title}
        </h5>

        <p className='text-sm text-gray-600 line-clamp-3 leading-relaxed'>
          {previewText}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;