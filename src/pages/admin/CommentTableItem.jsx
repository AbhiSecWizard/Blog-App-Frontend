import React from "react";
import moment from "moment";

const CommentTableItem = ({ comment, onApprove, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-bold text-gray-800">{comment.name}</span>
          <span className="text-gray-500 text-xs mt-1 leading-relaxed">
            {comment.content}
          </span>
        </div>
      </td>
      
      <td className="px-6 py-4 max-sm:hidden text-gray-400 text-xs">
        {moment(comment.createdAt).format("DD MMM, YYYY")}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onApprove(comment._id, comment.isApproved)}
            className={`min-w-[100px] px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all border ${
              comment.isApproved
                ? "border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100"
                : "border-green-200 bg-green-50 text-green-600 hover:bg-green-100"
            }`}
          >
            {comment.isApproved ? "Unapprove" : "Approve"}
          </button>

          <button
            onClick={() => onDelete(comment._id)}
            className="px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition-all"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;