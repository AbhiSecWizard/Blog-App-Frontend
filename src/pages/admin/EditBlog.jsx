import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import ReactQuill from 'react-quill-new'; 
import 'react-quill-new/dist/quill.snow.css'; 
import toast from 'react-hot-toast';

const EditBlog = () => {
  const params = useParams();
  const id = params.id || params.blogId; 
  const { axios } = useAppContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "", // 👈 FIXED: Lowercase 'subtitle' match with schema
    description: "",
    category: "",
    isPublished: false,
    image: null,
  });

  useEffect(() => {
    const fetchBlogDetails = async () => {
      if (!id) {
        toast.error("Invalid Blog ID provided in URL");
        setFetching(false);
        return;
      }
      try {
        setFetching(true);
        const { data } = await axios.get(`/api/blog/${id}`);
        if (data && data.success && data.blog) {
          setFormData({
            title: data.blog.title || "",
            subtitle: data.blog.subtitle || "", // 👈 FIXED: Direct binding with 'subtitle'
            description: data.blog.description || "",
            category: data.blog.category || "",
            isPublished: data.blog.isPublished || false,
            image: null,
          });
          setImagePreview(data.blog.image || "");
        } else {
          toast.error("Failed to parse data payload from server");
        }
      } catch (error) {
        console.error("Fetch Details Error:", error);
        toast.error(error.response?.data?.message || "Failed to load blog data");
      } finally {
        setFetching(false);
      }
    };
    
    fetchBlogDetails();
  }, [id, axios]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dataToSend = new FormData();
      dataToSend.append("title", formData.title);
      dataToSend.append("subtitle", formData.subtitle); // 👈 FIXED: Sent as 'subtitle'
      dataToSend.append("description", formData.description); 
      dataToSend.append("category", formData.category);
      dataToSend.append("isPublished", formData.isPublished);
      
      if (formData.image) {
        dataToSend.append("image", formData.image);
      }

      const { data } = await axios.post(`/api/blog/editblog/${id}`, dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success("Blog updated successfully!");
        navigate("/admin"); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'clean']
    ],
  };

  if (fetching) return <div className="p-10 text-center animate-pulse text-gray-500 text-sm font-medium">Fetching blog details...</div>;

  return (
    <div className="max-w-3xl mx-auto my-6 p-4 sm:p-6 md:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Edit Blog Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">Blog Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2.5 text-sm sm:text-base border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        </div>

        {/* Subtitle */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">Subtitle</label>
          <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} className="w-full px-4 py-2.5 text-sm sm:text-base border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        </div>

        {/* Category & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2.5 text-sm sm:text-base border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          </div>
          <div className="flex items-center sm:pt-6">
            <label className="flex items-center gap-3 bg-gray-50/50 p-3 sm:p-0 sm:bg-transparent rounded-xl border border-gray-100 sm:border-none cursor-pointer font-semibold text-sm text-gray-700 w-full select-none">
              <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} className="w-5 h-5 sm:w-4 sm:h-4 rounded accent-blue-600 focus:ring-blue-500 border-gray-300" />
              Publish instantly (Make Live)
            </label>
          </div>
        </div>

        {/* Image */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Update Cover Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-xs sm:text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all" />
          {imagePreview && (
            <div className="mt-2 bg-gray-50/50 p-2 rounded-xl border border-gray-100">
              <p className="text-[11px] font-medium text-gray-400 mb-1.5 pl-1">Current Image Preview:</p>
              <img src={imagePreview} alt="Preview" className="h-40 sm:h-52 w-full object-cover rounded-xl shadow-inner" />
            </div>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Description</label>
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
            <ReactQuill theme="snow" modules={modules} value={formData.description} onChange={handleDescriptionChange} className="min-h-[220px] text-sm sm:text-base" placeholder="Write your blog content here..." />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-5 border-t border-gray-100">
          <button type="button" onClick={() => navigate("/admin")} className="w-full sm:w-auto text-center px-5 py-2.5 text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">Cancel</button>
          <button type="submit" disabled={loading} className="w-full sm:w-auto text-center px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-xl transition-all shadow-md shadow-blue-100">
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;