import React from 'react';
import moment from 'moment';
import { FaRegCircleXmark, FaRegTrashCan } from "react-icons/fa6";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const BlogTableItem = ({ blog, onTogglePublish, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 font-medium text-gray-800">{blog.title}</td>
      <td className="px-6 py-4 text-gray-500 text-sm">
        {moment(blog.createdAt).format("DD MMM YYYY")}
      </td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
          blog.isPublished ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
        }`}>
          {blog.isPublished ? "Live" : "Draft"}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-4">
          {/* Publish/Unpublish Toggle */}
          <button 
            onClick={() => onTogglePublish(blog._id)}
            className={`flex items-center gap-1 text-xs font-bold ${
              blog.isPublished ? "text-orange-500" : "text-green-600"
            }`}
          >
            {blog.isPublished ? <FaRegCircleXmark size={16}/> : <IoCheckmarkDoneCircleOutline size={16}/>}
            {blog.isPublished ? "Unpublish" : "Publish"}
          </button>

          {/* Delete Button */}
          <button 
            onClick={() => onDelete(blog._id)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <FaRegTrashCan size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;