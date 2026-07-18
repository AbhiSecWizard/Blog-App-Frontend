import React from 'react';
import moment from 'moment';
import { FaRegCircleXmark, FaRegTrashCan } from "react-icons/fa6";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const BlogTableItem = ({ blog, onTogglePublish, onDelete, onEdit }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
      {/* Blog Title */}
      <td className="px-6 py-4 font-medium text-gray-800 max-w-xs truncate">
        {blog.title}
      </td>
      
      {/* Created Date */}
      <td className="px-6 py-4 text-gray-500 text-sm">
        {moment(blog.createdAt).format("DD MMM YYYY")}
      </td>
      
      {/* Status Badge */}
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          blog.isPublished ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
        }`}>
          {blog.isPublished ? "Live" : "Draft"}
        </span>
      </td>
      
      {/* Action Buttons */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-4">
          
          {/* Publish / Unpublish Toggle */}
          <button 
            onClick={() => onTogglePublish(blog._id)}
            className={`flex items-center gap-1 text-xs font-bold cursor-pointer transition-colors ${
              blog.isPublished ? "text-orange-500 hover:text-orange-700" : "text-green-600 hover:text-green-800"
            }`}
            title={blog.isPublished ? "Move to Draft" : "Make Live"}
          >
            {blog.isPublished ? <FaRegCircleXmark size={16}/> : <IoCheckmarkDoneCircleOutline size={16}/>}
            {blog.isPublished ? "Unpublish" : "Publish"}
          </button>

          {/* Edit Button */}
          <button 
            onClick={() => onEdit(blog._id)}
            className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
            title="Edit Blog"
          >
            <MdEdit size={17} />          
          </button>

          {/* Delete Button */}
          <button 
            onClick={() => onDelete(blog._id)}
            className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
            title="Delete Blog"
          >
            <FaRegTrashCan size={15} />
          </button>
          
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;