import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { GiJusticeStar } from "react-icons/gi";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔄 ब्लॉग डेटा और कमेंट्स लोड करने का फ़ंक्शन
  const fetchBlogData = async () => {
    try {
      const [blogRes, commentRes] = await Promise.all([
        axios.get(`/api/blog/${id}`),
        axios.get(`/api/blog/comments/${id}`) 
      ]);

      if (blogRes.data.success) {
        setBlog(blogRes.data.blog);
      }
      
      if (commentRes.data.success) {
        setComments(commentRes.data.comments || []); 
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to load blog data");
    }
  };

  // 💬 नया कमेंट सबमिट करने का फ़ंक्शन
  const addComment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blogId: id, 
        name: name.trim(),
        content: content.trim(),
      });

      if (data.success) {
        toast.success(data.message || "Comment posted!");
        setName("");
        setContent("");
        fetchBlogData(); // कमेंट लिस्ट तुरंत अपडेट करें
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogData();
    }
  }, [id]);

  if (!blog) return <Loader />;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-10 flex flex-col items-center">
        {/* Header Section */}
        <header className="text-center mb-8">
          <p className="text-gray-400 text-sm uppercase tracking-widest font-medium">
            {moment(blog.createdAt).format("MMMM DD, YYYY")}
          </p>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            {blog.title}
          </h1>
          
          <div className="flex justify-center mt-6">
             <span className="px-4 py-1.5 flex gap-2 items-center border border-indigo-100 text-indigo-600 rounded-full text-sm font-medium bg-indigo-50/50">
                {blog?.author || "Admin"} <GiJusticeStar className="text-indigo-500" />
             </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl mb-10 border border-gray-100">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-500"
          />
        </div>

        {/* Blog Body Container (कस्टम डिज़ाइन क्लास के साथ) */}
        <article 
          className="blog-content w-full max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: blog.description }} 
        />

        <hr className="w-full my-16 border-gray-100" />

        {/* Comments Section */}
        <section className="w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 flex items-center gap-2">
            Discussions <span className="bg-gray-100 text-gray-600 px-3 py-0.5 rounded-full text-sm font-semibold">{comments.length}</span>
          </h2>

          <div className="space-y-6 mb-12">
            {comments.length === 0 ? (
              <p className="text-gray-400 italic text-center py-6">No comments yet. Be the first to start the discussion!</p>
            ) : (
              comments.map((item) => (
                <div key={item._id} className="flex gap-4 p-6 bg-gray-50/50 rounded-2xl border border-gray-100/80">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold shrink-0 border border-indigo-100">
                     {item.name ? item.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-bold text-gray-900 truncate">{item.name}</p>
                      <span className="text-xs text-gray-400 shrink-0">{moment(item.createdAt).fromNow()}</span>
                    </div>
                    <p className="text-gray-600 mt-2 leading-relaxed">"{item.content}"</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Comment Form */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Leave a reply</h3>
            <form onSubmit={addComment} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all text-gray-800 bg-gray-50/30"
                required
              />
              <textarea
                rows="4"
                placeholder="Write your comment here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all text-gray-800 bg-gray-50/30 resize-none"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-100 active:scale-[0.98] cursor-pointer"
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </button>
            </form>
          </div>

          {/* Social Share */}
          <div className="mt-16 text-center border-t border-gray-100 pt-10">
            <h4 className="font-semibold text-gray-400 mb-6 uppercase text-xs tracking-widest">Share this story</h4>
            <div className="flex justify-center gap-8 text-gray-400">
              <FaFacebook size={22} className="hover:text-indigo-600 cursor-pointer transition-colors" />
              <FaTwitter size={22} className="hover:text-indigo-600 cursor-pointer transition-colors" />
              <FaGoogle size={22} className="hover:text-indigo-600 cursor-pointer transition-colors" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;