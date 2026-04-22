import { CiViewList } from "react-icons/ci";
import { FaRegComments } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { CgCalendarNext } from "react-icons/cg";
import { useEffect, useState } from "react";
import BlogTableItem from "./BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const DashboardStats = () => {
  const { axios } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  // 1. Fetch Stats & Recent Blogs
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/dashboard");
      if (data.success) {
        setDashboardData({
          blogs: data.blogs,
          comments: data.comments,
          drafts: data.drafts,
          recentBlogs: data.recentBlogs,
        });
      }
    } catch (error) {
      toast.error("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  // 2. Toggle Publish Status Logic
  const handleTogglePublish = async (id) => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", { id });
      if (data.success) {
        toast.success("Status updated!");
        fetchDashboardStats(); // Refresh the list and stats
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // 3. Delete Blog Logic
  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const { data } = await axios.post("/api/blog/delete", { id });
      if (data.success) {
        toast.success("Blog deleted successfully");
        fetchDashboardStats(); // Refresh the list and stats
      }
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading) return <div className="p-10 text-center animate-pulse">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* ===== Stats Grid ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
         {/* ... (Your existing Stat Cards here) ... */}
         <StatCard icon={<CiViewList size={28}/>} color="blue" label="Total Blogs" value={dashboardData.blogs} />
         <StatCard icon={<FaRegComments size={28}/>} color="purple" label="Comments" value={dashboardData.comments} />
         <StatCard icon={<LuNotebookPen size={28}/>} color="orange" label="Drafts" value={dashboardData.drafts} />
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-gray-800">
            <CgCalendarNext size={24} className="text-gray-400" />
            <h3 className="text-xl font-bold tracking-tight">Latest Blogs</h3>
          </div>
        </div>

        {/* Table View */}
        <div className="hidden md:block overflow-hidden bg-white shadow-sm border border-gray-100 rounded-2xl">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold uppercase text-gray-400">
              <tr>
                <th className="px-6 py-4">Blog Title</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem 
                  key={blog._id} 
                  blog={blog} 
                  index={index} 
                  onTogglePublish={handleTogglePublish} // PASSING PROPS
                  onDelete={handleDeleteBlog}           // PASSING PROPS
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Simple StatCard helper component to keep code clean
const StatCard = ({ icon, color, label, value }) => (
    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`p-3 text-${color}-600 bg-${color}-50 rounded-xl`}>{icon}</div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
      </div>
    </div>
);

export default DashboardStats;