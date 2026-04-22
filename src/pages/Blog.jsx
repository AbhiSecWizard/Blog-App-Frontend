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
const fetchBlogData = async () => {
  try {
    const [blogRes, commentRes] = await Promise.all([
      axios.get(`/api/blog/${id}`),
      // Fix: Method GET hona chahiye aur path backend se match hona chahiye
      axios.get(`/api/blog/comments/${id}`) 
    ]);

    if (blogRes.data.success) {
        setBlog(blogRes.data.blog);
    }
    
    if (commentRes.data.success) {
        // Fix: Ensure comments array exists
        setComments(commentRes.data.comments || []); 
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    toast.error("Failed to load blog data");
  }
};

const addComment = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const { data } = await axios.post("/api/blog/add-comment", {
      // DHAYN DEIN: 'blog' ko 'blogId' likhna hai
      blogId: id, 
      name: name,
      content: content,
    });

    if (data.success) {
      toast.success(data.message);
      setName("");
      setContent("");
      fetchBlogData(); // Refresh list
    }
  } catch (error) {
    // Backend se aaya hua exact error message dikhayega
    const message = error.response?.data?.message || error.message;
    toast.error(message);
  } finally {
    setIsSubmitting(false);
  }
};

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  if (!blog) return <Loader />;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-10 flex flex-col items-center">
        {/* Header Section */}
        <header className="text-center mb-8">
          <p className="text-gray-400 text-sm uppercase tracking-widest">
            {moment(blog.createdAt).format("MMMM DD, YYYY")}
          </p>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex justify-center mt-6">
             <span className="px-4 py-1.5 flex gap-2 items-center border border-primary/30 text-primary rounded-full text-sm font-medium">
                {blog?.author || "Admin"} <GiJusticeStar />
             </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-10">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Blog Body (The part you were asking about) */}
        <article 
          className="prose prose-lg max-w-none w-full text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.description }} 
        />

        <hr className="w-full my-16 border-gray-100" />

        {/* Comments Section */}
        <section className="w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">
            Discussions ({comments.length})
          </h2>

          <div className="space-y-6 mb-12">
            {comments.map((item) => (
              <div key={item._id} className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                   {item.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-gray-900">{item.name}</p>
                    <span className="text-xs text-gray-400">{moment(item.createdAt).fromNow()}</span>
                  </div>
                  <p className="text-gray-600 mt-2 italic">"{item.content}"</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Form */}
          <div className="bg-white p-8 rounded-2xl border shadow-sm">
            <h3 className="font-bold text-lg mb-4">Leave a reply</h3>
            <form onSubmit={addComment} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                required
              />
              <textarea
                rows="4"
                placeholder="Message"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 disabled:bg-gray-300 transition-all"
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </button>
            </form>
          </div>

          {/* Social Share */}
          <div className="mt-16 text-center border-t pt-10">
            <h4 className="font-semibold text-gray-400 mb-6 uppercase text-xs tracking-widest">Share this story</h4>
            <div className="flex justify-center gap-8 text-gray-400">
              <FaFacebook size={24} className="hover:text-primary cursor-pointer transition-colors" />
              <FaTwitter size={24} className="hover:text-primary cursor-pointer transition-colors" />
              <FaGoogle size={24} className="hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;