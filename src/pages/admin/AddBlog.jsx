import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import toast from "react-hot-toast";

import upload_area from "../../assets/upload_area.svg";
import { blogCategories } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { parse } from "marked";

const AddBlog = () => {
  const { axios } = useAppContext();

  // --- State ---
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false); // AI Loading State
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // --- AI Content Generation ---
  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title first to generate content");

    try {
      setLoading(true);
      const { data } = await axios.post("/api/blog/generate", { prompt: title });
      
      if (data.success) {
        // Use marked to parse markdown from AI and inject into Quill
        quillRef.current.root.innerHTML = parse(data.content);
        toast.success("Content generated successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Initialize Editor ---
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Start writing your story...",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "clean"],
          ],
        },
      });
    }
  }, []);

  // --- Helpers ---
  const resetForm = () => {
    setTitle("");
    setSubTitle("");
    setImage(null);
    setIsPublished(false);
    setCategory("Startup");
    if (quillRef.current) quillRef.current.root.innerHTML = "";
  };

  // --- Submit Handler ---
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const description = quillRef.current?.root.innerHTML;

    if (!image) return toast.error("Thumbnail is required");
    if (!description || description === "<p><br></p>") {
      return toast.error("Content cannot be empty");
    }

    try {
      setIsAdding(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subTitle", subTitle);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("isPublished", String(isPublished));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-4 md:p-10 h-full overflow-y-auto">
      <form
        onSubmit={onSubmitHandler}
        className="max-w-4xl mx-auto bg-white p-6 md:p-10 shadow-sm rounded-xl border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Create New Post</h2>

        {/* Image Upload */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Thumbnail Image</p>
          <label htmlFor="image" className="inline-block">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt="Preview"
              className="w-40 h-24 object-cover rounded-lg border-2 border-dashed border-gray-200 cursor-pointer hover:border-indigo-600 transition-all"
            />
            <input
              type="file"
              id="image"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>

        {/* Titles */}
        <div className="grid gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Blog Title</label>
            <input
              type="text"
              placeholder="e.g. 10 Days in Manali"
              required
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Sub Title</label>
            <input
              type="text"
              placeholder="A brief introduction..."
              required
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>
        </div>

        {/* Editor Area */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-gray-700">Content</label>
            
            {/* --- AI GENERATE BUTTON --- */}
            <button
              type="button"
              onClick={generateContent}
              disabled={loading}
              className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition-colors disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate with AI"}
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 shadow-inner">
            <div ref={editorRef} className="h-80 text-gray-800 bg-white" />
          </div>
        </div>

        {/* Category & Status */}
        <div className="mt-10 flex flex-wrap items-center gap-8 border-t pt-8">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none min-w-[150px] cursor-pointer"
            >
              {blogCategories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100 cursor-pointer">
            <input
              type="checkbox"
              id="publish"
              className="w-5 h-5 accent-indigo-600 cursor-pointer"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            <label htmlFor="publish" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
              Publish immediately
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isAdding}
          className={`mt-10 w-full md:w-52 py-3 rounded-lg font-bold text-white transition-all shadow-lg 
            ${isAdding ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-indigo-200"}`}
        >
          {isAdding ? "Saving Post..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;