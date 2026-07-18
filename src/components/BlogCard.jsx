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
      onClick={() => _id && navigate(`/blog/${_id}`)}
      className="group w-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md md:hover:shadow-xl md:hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden bg-gray-50">
        <img
          className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105"
          src={image}
          alt={title}
          loading="lazy" // Performance boost ke liye lazy loading lagayi
        />
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Category Tag */}
          <span className="px-2.5 py-0.5 inline-block bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2.5">
            {category}
          </span>

          {/* Title - Responsive font size (mobile par 16px, badon par 18px) */}
          <h5 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
            {title}
          </h5>

          {/* Description - Safe line clamping */}
          <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 sm:line-clamp-3 leading-relaxed">
            {previewText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;