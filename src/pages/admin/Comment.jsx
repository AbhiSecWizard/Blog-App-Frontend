import React, { useEffect, useState, useCallback } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import CommentTableItem from "./CommentTableItem";

const Comment = () => {
  const { axios, token } = useAppContext();
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const [loading, setLoading] = useState(true);

  // 1. Fetch Comments
  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/comments", {
        headers: { token },
      });
      if (data.success) {
        setComments(data.comments || []);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load comments");
    } finally {
      setLoading(false);
    }
  }, [axios, token]);

  // 2. Approve/Unapprove Toggle Logic
  const onApprove = async (id, currentStatus) => {
    try {
      // Backend should receive 'isApproved' as a boolean
      const newStatus = !currentStatus;
      const { data } = await axios.post(
        "/api/admin/approve-comment",
        { id, isApproved: newStatus }, 
        { headers: { token } }
      );

      if (data.success) {
        toast.success(newStatus ? "Comment Approved" : "Comment Unapproved");
        fetchComments(); // Refresh list after action
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  // 3. Delete Comment
  const onDelete = async (id) => {
    if (!window.confirm("Permanent delete this comment?")) return;
    try {
      const { data } = await axios.post(
        "/api/admin/delete-comment",
        { id },
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Comment Deleted");
        fetchComments();
      }
    } catch (error) {
      toast.error("Deletion failed");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Filtering Logic
  const filteredComments = comments.filter((c) => 
    filter === "Approved" ? c.isApproved : !c.isApproved
  );

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center max-w-4xl mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Comments Management</h1>
          <p className="text-sm text-gray-500">Manage user feedback and approvals</p>
        </div>

        <div className="flex bg-white p-1 rounded-lg shadow-sm border">
          {["Not Approved", "Approved"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 text-xs font-semibold rounded-md transition-all ${
                filter === type
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">User & Comment</th>
              <th className="px-6 py-4 max-sm:hidden">Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center text-gray-400">
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </div>
                </td>
              </tr>
            ) : filteredComments.length > 0 ? (
              filteredComments.map((comment) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  onApprove={onApprove}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-16 text-center text-gray-400 italic">
                  No {filter.toLowerCase()} comments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comment;