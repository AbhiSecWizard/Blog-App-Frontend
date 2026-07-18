// // import React, { useEffect, useRef, useState } from "react";
// // import Quill from "quill";
// // import "quill/dist/quill.snow.css";
// // import toast from "react-hot-toast";

// // import upload_area from "../../assets/upload_area.svg";
// // import { blogCategories } from "../../assets/assets";
// // import { useAppContext } from "../../context/AppContext";

// // // Markdown parser configuration
// // import { marked } from "marked"; 

// // const AddBlog = () => {
// //   const { axios } = useAppContext();

// //   // --- States ---
// //   const [isAdding, setIsAdding] = useState(false);
// //   const [loading, setLoading] = useState(false); 
// //   const [image, setImage] = useState(null);
// //   const [title, setTitle] = useState("");
// //   const [subTitle, setSubTitle] = useState("");
// //   const [category, setCategory] = useState("Startup");
// //   const [isPublished, setIsPublished] = useState(false);

// //   const editorRef = useRef(null);
// //   const quillRef = useRef(null);

// //   // --- AI Content Generation ---
// //   const generateContent = async () => {
// //     if (!title) return toast.error("Please enter a title first to generate content");

// //     try {
// //       setLoading(true);
// //       const { data } = await axios.post("/api/blog/generate", { prompt: title });
      
// //       if (data.success) {
// //         const parsedHTML = marked(data.content);
        
// //         if (quillRef.current) {
// //           quillRef.current.clipboard.dangerouslyPasteHTML(parsedHTML);
// //           toast.success("Content generated successfully!");
// //         } else {
// //           toast.error("Editor is not ready yet");
// //         }
// //       } else {
// //         toast.error(data.message);
// //       }
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // --- Initialize Quill Editor ---
// //   useEffect(() => {
// //     if (editorRef.current && !quillRef.current) {
// //       quillRef.current = new Quill(editorRef.current, {
// //         theme: "snow",
// //         placeholder: "Start writing your story...",
// //         modules: {
// //           toolbar: [
// //             [{ header: [1, 2, false] }],
// //             ["bold", "italic", "underline", "blockquote"],
// //             [{ list: "ordered" }, { list: "bullet" }],
// //             ["link", "clean"],
// //           ],
// //         },
// //       });
// //     }
// //   }, []);

// //   // --- Helper: Form Reset ---
// //   const resetForm = () => {
// //     setTitle("");
// //     setSubTitle("");
// //     setImage(null);
// //     setIsPublished(false);
// //     setCategory("Startup");
// //     if (quillRef.current) quillRef.current.root.innerHTML = "";
// //   };

// //   // --- Submit Handler ---
// //   const onSubmitHandler = async (e) => {
// //     e.preventDefault();
// //     const description = quillRef.current?.root.innerHTML;

// //     if (!image) return toast.error("Thumbnail is required");
// //     if (!description || description === "<p><br></p>") {
// //       return toast.error("Content cannot be empty");
// //     }

// //     try {
// //       setIsAdding(true);
// //       const formData = new FormData();
// //       formData.append("title", title);
// //       formData.append("subTitle", subTitle);
// //       formData.append("description", description);
// //       formData.append("category", category);
// //       formData.append("isPublished", String(isPublished));
// //       formData.append("image", image);

// //       const { data } = await axios.post("/api/blog/add", formData);

// //       if (data.success) {
// //         toast.success(data.message);
// //         resetForm();
// //       } else {
// //         toast.error(data.message);
// //       }
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || error.message);
// //     } finally {
// //       setIsAdding(false);
// //     }
// //   };

// //   return (
// //     // FIXED: Fluid padding aur height adjustments responsive dashboard context ke liye
// //     <div className="flex-1 bg-gray-50/50 p-4 sm:p-6 md:p-10 min-h-screen overflow-y-auto">
// //       <form
// //         onSubmit={onSubmitHandler}
// //         className="max-w-4xl mx-auto bg-white p-5 sm:p-8 md:p-10 shadow-md shadow-gray-100/40 rounded-2xl border border-gray-100"
// //       >
// //         <h2 className="text-xl sm:text-2xl font-black text-gray-800 mb-6 sm:mb-8">Create New Post</h2>

// //         {/* Thumbnail Image */}
// //         <div className="mb-6">
// //           <p className="text-sm font-semibold text-gray-700 mb-2.5">Thumbnail Image</p>
// //           <label htmlFor="image" className="inline-block cursor-pointer">
// //             <div className="relative group">
// //               <img
// //                 src={image ? URL.createObjectURL(image) : upload_area}
// //                 alt="Preview"
// //                 className="w-full max-w-[240px] h-32 sm:h-36 object-cover rounded-xl border-2 border-dashed border-gray-200 group-hover:border-indigo-600 transition-all bg-gray-50/50"
// //               />
// //             </div>
// //             <input
// //               type="file"
// //               id="image"
// //               hidden
// //               accept="image/*"
// //               onChange={(e) => setImage(e.target.files[0])}
// //             />
// //           </label>
// //         </div>

// //         {/* Titles Grid: Mobile single stack to Desktop single row grid */}
// //         <div className="grid grid-cols-1 gap-5 sm:gap-6">
// //           <div className="flex flex-col gap-1.5">
// //             <label className="text-sm font-semibold text-gray-700">Blog Title</label>
// //             <input
// //               type="text"
// //               placeholder="e.g. 10 Days in Manali"
// //               required
// //               className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-sm sm:text-base text-gray-800 placeholder-gray-400"
// //               value={title}
// //               onChange={(e) => setTitle(e.target.value)}
// //             />
// //           </div>

// //           <div className="flex flex-col gap-1.5">
// //             <label className="text-sm font-semibold text-gray-700">Sub Title</label>
// //             <input
// //               type="text"
// //               placeholder="A brief introduction..."
// //               required
// //               className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-sm sm:text-base text-gray-800 placeholder-gray-400"
// //               value={subTitle}
// //               onChange={(e) => setSubTitle(e.target.value)}
// //             />
// //           </div>
// //         </div>

// //         {/* Editor & AI Button Area */}
// //         <div className="mt-6 sm:mt-8">
// //           <div className="flex items-center justify-between gap-4 mb-3">
// //             <label className="text-sm font-semibold text-gray-700">Content</label>
            
// //             <button
// //               type="button"
// //               onClick={generateContent}
// //               disabled={loading}
// //               className="text-xs font-bold bg-indigo-50 text-indigo-600 px-3.5 py-2 rounded-lg hover:bg-indigo-100/80 active:scale-95 transition-all disabled:opacity-50 shrink-0 cursor-pointer"
// //             >
// //               {loading ? "Generating..." : "Generate with AI"}
// //             </button>
// //           </div>
          
// //           {/* FIXED: Quill Toolbar clipping se bachne ke liye custom height logic lagaya */}
// //           <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm custom-quill-wrapper">
// //             <div ref={editorRef} className="h-64 sm:h-80 text-gray-800 bg-white text-sm sm:text-base" />
// //           </div>
// //         </div>

// //         {/* Category & Publish Status: Mobile stack layout config */}
// //         <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 border-t border-gray-100 pt-6 sm:pt-8">
// //           <div className="flex flex-col gap-1.5 w-full sm:w-auto">
// //             <label className="text-sm font-semibold text-gray-700">Category</label>
// //             <select
// //               value={category}
// //               onChange={(e) => setCategory(e.target.value)}
// //               className="p-3 bg-white border border-gray-200 rounded-xl outline-none min-w-[160px] cursor-pointer text-sm sm:text-base text-gray-700 focus:border-indigo-500"
// //             >
// //               {blogCategories.map((item) => (
// //                 <option key={item} value={item}>{item}</option>
// //               ))}
// //             </select>
// //           </div>

// //           <div className="flex items-center gap-3 bg-gray-50/80 p-3 rounded-xl border border-gray-200/50 cursor-pointer w-full sm:w-auto justify-start sm:mt-6">
// //             <input
// //               type="checkbox"
// //               id="publish"
// //               className="w-5 h-5 accent-indigo-600 cursor-pointer rounded-md"
// //               checked={isPublished}
// //               onChange={(e) => setIsPublished(e.target.checked)}
// //             />
// //             <label htmlFor="publish" className="text-sm font-semibold text-gray-700 cursor-pointer select-none">
// //               Publish immediately
// //             </label>
// //           </div>
// //         </div>

// //         {/* Submit Button */}
// //         <button
// //           type="submit"
// //           disabled={isAdding}
// //           className={`mt-8 sm:mt-10 w-full sm:w-52 py-3.5 rounded-xl font-bold text-white transition-all shadow-md text-sm sm:text-base cursor-pointer
// //             ${isAdding ? "bg-gray-400 cursor-not-allowed shadow-none" : "bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-indigo-100"}`}
// //         >
// //           {isAdding ? "Saving Post..." : "Create Post"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddBlog;
// import React, { useEffect, useRef, useState } from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";
// import toast from "react-hot-toast";

// import upload_area from "../../assets/upload_area.svg";
// import { blogCategories } from "../../assets/assets";
// import { useAppContext } from "../../context/AppContext";
// import { marked } from "marked"; 

// const AddBlog = () => {
//   const { axios } = useAppContext();

//   const [isAdding, setIsAdding] = useState(false);
//   const [loading, setLoading] = useState(false); 
//   const [image, setImage] = useState(null);
//   const [title, setTitle] = useState("");
//   const [subtitle, setSubtitle] = useState(""); // 👈 FIXED: Lowercase 'subtitle' state
//   const [category, setCategory] = useState("Startup");
//   const [isPublished, setIsPublished] = useState(false);

//   const editorRef = useRef(null);
//   const quillRef = useRef(null);

//   const generateContent = async () => {
//     if (!title) return toast.error("Please enter a title first to generate content");

//     try {
//       setLoading(true);
//       const { data } = await axios.post("/api/blog/generate", { prompt: title });
      
//       if (data.success) {
//         const parsedHTML = marked(data.content);
//         if (quillRef.current) {
//           quillRef.current.clipboard.dangerouslyPasteHTML(parsedHTML);
//           toast.success("Content generated successfully!");
//         }
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (editorRef.current && !quillRef.current) {
//       quillRef.current = new Quill(editorRef.current, {
//         theme: "snow",
//         placeholder: "Start writing your story...",
//         modules: {
//           toolbar: [
//             [{ header: [1, 2, false] }],
//             ["bold", "italic", "underline", "blockquote"],
//             [{ list: "ordered" }, { list: "bullet" }],
//             ["link", "clean"],
//           ],
//         },
//       });
//     }
//   }, []);

//   const resetForm = () => {
//     setTitle("");
//     setSubtitle("");
//     setImage(null);
//     setIsPublished(false);
//     setCategory("Startup");
//     if (quillRef.current) quillRef.current.root.innerHTML = "";
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     const description = quillRef.current?.root.innerHTML;

//     if (!image) return toast.error("Thumbnail is required");
//     if (!description || description === "<p><br></p>") {
//       return toast.error("Content cannot be empty");
//     }

//     try {
//       setIsAdding(true);
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("subtitle", subtitle); // 👈 FIXED: Ab exact 'subtitle' schema key mein save hoga
//       formData.append("description", description);
//       formData.append("category", category);
//       formData.append("isPublished", String(isPublished));
//       formData.append("image", image);

//       const { data } = await axios.post("/api/blog/add", formData);

//       if (data.success) {
//         toast.success(data.message);
//         resetForm();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   return (
//     <div className="flex-1 bg-gray-50/50 p-4 sm:p-6 md:p-10 min-h-screen overflow-y-auto">
//       <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto bg-white p-5 sm:p-8 md:p-10 shadow-md shadow-gray-100/40 rounded-2xl border border-gray-100">
//         <h2 className="text-xl sm:text-2xl font-black text-gray-800 mb-6 sm:mb-8">Create New Post</h2>

//         {/* Thumbnail */}
//         <div className="mb-6">
//           <p className="text-sm font-semibold text-gray-700 mb-2.5">Thumbnail Image</p>
//           <label htmlFor="image" className="inline-block cursor-pointer">
//             <img src={image ? URL.createObjectURL(image) : upload_area} alt="Preview" className="w-full max-w-[240px] h-32 sm:h-36 object-cover rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50" />
//             <input type="file" id="image" hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
//           </label>
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:gap-6">
//           {/* Title */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-sm font-semibold text-gray-700">Blog Title</label>
//             <input type="text" placeholder="e.g. 10 Days in Manali" required className="w-full p-3 border border-gray-200 rounded-xl outline-none text-sm sm:text-base text-gray-800" value={title} onChange={(e) => setTitle(e.target.value)} />
//           </div>

//           {/* Subtitle */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-sm font-semibold text-gray-700">Sub Title</label>
//             <input type="text" placeholder="A brief introduction..." required className="w-full p-3 border border-gray-200 rounded-xl outline-none text-sm sm:text-base text-gray-800" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
//           </div>
//         </div>

//         {/* Editor */}
//         <div className="mt-6 sm:mt-8">
//           <div className="flex items-center justify-between gap-4 mb-3">
//             <label className="text-sm font-semibold text-gray-700">Content</label>
//             <button type="button" onClick={generateContent} disabled={loading} className="text-xs font-bold bg-indigo-50 text-indigo-600 px-3.5 py-2 rounded-lg hover:bg-indigo-100/80 transition-all disabled:opacity-50">
//               {loading ? "Generating..." : "Generate with AI"}
//             </button>
//           </div>
//           <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
//             <div ref={editorRef} className="h-64 sm:h-80 text-gray-800 bg-white text-sm sm:text-base" />
//           </div>
//         </div>

//         {/* Meta & Submit */}
//         <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 border-t border-gray-100 pt-6 sm:pt-8">
//           <div className="flex flex-col gap-1.5 w-full sm:w-auto">
//             <label className="text-sm font-semibold text-gray-700">Category</label>
//             <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-3 bg-white border border-gray-200 rounded-xl outline-none min-w-[160px] text-sm sm:text-base text-gray-700">
//               {blogCategories.map((item) => <option key={item} value={item}>{item}</option>)}
//             </select>
//           </div>

//           <div className="flex items-center gap-3 bg-gray-50/80 p-3 rounded-xl border border-gray-200/50 cursor-pointer w-full sm:w-auto justify-start sm:mt-6">
//             <input type="checkbox" id="publish" className="w-5 h-5 accent-indigo-600" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
//             <label htmlFor="publish" className="text-sm font-semibold text-gray-700 cursor-pointer select-none">Publish immediately</label>
//           </div>
//         </div>

//         <button type="submit" disabled={isAdding} className={`mt-8 sm:mt-10 w-full sm:w-52 py-3.5 rounded-xl font-bold text-white transition-all text-sm sm:text-base ${isAdding ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}>
//           {isAdding ? "Saving Post..." : "Create Post"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBlog;
import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { marked } from "marked"; 

import upload_area from "../../assets/upload_area.svg";
import { blogCategories } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const AddBlog = () => {
  const { axios } = useAppContext();

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState(""); 
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // --- AI Content Generation (Uses relative path seamlessly) ---
  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title first to generate content");

    try {
      setLoading(true);
      const { data } = await axios.post("/api/blog/generate", { prompt: title });
      
      if (data.success) {
        const parsedHTML = marked(data.content);
        if (quillRef.current) {
          quillRef.current.clipboard.dangerouslyPasteHTML(parsedHTML);
          toast.success("Content generated successfully!");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

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

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setImage(null);
    setIsPublished(false);
    setCategory("Startup");
    if (quillRef.current) quillRef.current.root.innerHTML = "";
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const description = quillRef.current?.root.innerHTML;

    if (!image) return toast.error("Thumbnail is required");
    if (!description || description.trim() === "<p><br></p>" || description.trim() === "") {
      return toast.error("Content cannot be empty");
    }

    try {
      setIsAdding(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle); 
      formData.append("description", description);
      formData.append("category", category);
      formData.append("isPublished", String(isPublished));
      formData.append("image", image);

      // URL automatically targets your render backend now
      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message || "Blog created successfully!");
        resetForm();
      } else {
        toast.error(data.message || "Failed to add blog");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50/50 p-4 sm:p-6 md:p-10 min-h-screen overflow-y-auto">
      <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto bg-white p-5 sm:p-8 md:p-10 shadow-md shadow-gray-100/40 rounded-2xl border border-gray-100">
        <h2 className="text-xl sm:text-2xl font-black text-gray-800 mb-6 sm:mb-8">Create New Post</h2>

        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-2.5">Thumbnail Image</p>
          <label htmlFor="image" className="inline-block cursor-pointer">
            <img src={image ? URL.createObjectURL(image) : upload_area} alt="Preview" className="w-full max-w-[240px] h-32 sm:h-36 object-cover rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50" />
            <input type="file" id="image" hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Blog Title</label>
            <input type="text" placeholder="e.g. 10 Days in Manali" required className="w-full p-3 border border-gray-200 rounded-xl outline-none text-sm sm:text-base text-gray-800" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Sub Title</label>
            <input type="text" placeholder="A brief introduction..." required className="w-full p-3 border border-gray-200 rounded-xl outline-none text-sm sm:text-base text-gray-800" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <div className="flex items-center justify-between gap-4 mb-3">
            <label className="text-sm font-semibold text-gray-700">Content</label>
            <button type="button" onClick={generateContent} disabled={loading} className="text-xs font-bold bg-indigo-50 text-indigo-600 px-3.5 py-2 rounded-lg hover:bg-indigo-100/80 transition-all disabled:opacity-50">
              {loading ? "Generating..." : "Generate with AI"}
            </button>
          </div>
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <div ref={editorRef} className="h-64 sm:h-80 text-gray-800 bg-white text-sm sm:text-base" />
          </div>
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 border-t border-gray-100 pt-6 sm:pt-8">
          <div className="flex flex-col gap-1.5 w-full sm:w-auto">
            <label className="text-sm font-semibold text-gray-700">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-3 bg-white border border-gray-200 rounded-xl outline-none min-w-[160px] text-sm sm:text-base text-gray-700">
              {blogCategories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-3 bg-gray-50/80 p-3 rounded-xl border border-gray-200/50 cursor-pointer w-full sm:w-auto justify-start sm:mt-6">
            <input type="checkbox" id="publish" className="w-5 h-5 accent-indigo-600" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
            <label htmlFor="publish" className="text-sm font-semibold text-gray-700 cursor-pointer select-none">Publish immediately</label>
          </div>
        </div>

        <button type="submit" disabled={isAdding} className={`mt-8 sm:mt-10 w-full sm:w-52 py-3.5 rounded-xl font-bold text-white transition-all text-sm sm:text-base ${isAdding ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}>
          {isAdding ? "Saving Post..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;