import React, { createContext, useContext, useEffect, useState } from "react"; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://blog-app-backend-6mjx.onrender.com";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token') || null); // शुरुआत में ही localStorage से टोकन उठा लें
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    // 1. सर्वर से सारे ब्लॉग्स लोड करने का फ़ंक्शन
    const fetchBlogs = async () => {
        try {
            const response = await axios.get('/api/blog/all');
            const data = response.data;
            setBlogs(data);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // 2. 🔥 डिलीट करने का बिल्कुल परफेक्ट फ़ंक्शन (POST मेथड और स्टेट फ़िल्टर के साथ)
    const deleteBlog = async (id) => {
        try {
            const activeToken = token || localStorage.getItem('token');
            
            if (!activeToken) {
                toast.error("कृपया पहले लॉगिन करें!");
                return;
            }

            const response = await axios.post(`/api/blog/delete/${id}`, {}, {
                headers: {
                    token: activeToken, 
                    Authorization: `Bearer ${activeToken}`
                }
            });

            if (response.data.success) {
                toast.success("Blog deleted successfully!");

                // बिना रिफ्रेश किए UI से ब्लॉग को हटाना
                setBlogs((prevBlogs) => {
                    if (prevBlogs && Array.isArray(prevBlogs.message)) {
                        return {
                            ...prevBlogs,
                            message: prevBlogs.message.filter(blog => blog._id !== id)
                        };
                    }
                    if (prevBlogs && Array.isArray(prevBlogs.blogs)) {
                        return {
                            ...prevBlogs,
                            blogs: prevBlogs.blogs.filter(blog => blog._id !== id)
                        };
                    }
                    if (Array.isArray(prevBlogs)) {
                        return prevBlogs.filter(blog => blog._id !== id);
                    }
                    return prevBlogs;
                });
            } else {
                toast.error(response.data.message || "Failed to delete blog");
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || "Error deleting blog";
            toast.error(errorMsg);
        }
    };

    // 3. 🔄 [बदलाव] टोकन सिंक करने के लिए डायनामिक useEffect
    // जब भी 'token' स्टेट बदलेगी, यह Axios के हेडर्स को तुरंत अपडेट कर देगा
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.defaults.headers.common['token'] = token;
        } else {
            // लॉगआउट होने पर हेडर्स साफ करें
            delete axios.defaults.headers.common['Authorization'];
            delete axios.defaults.headers.common['token'];
        }
    }, [token]);

    // 4. पहली बार लोड होने पर केवल ब्लॉग्स को लोड करें
    useEffect(() => {
        fetchBlogs();
    }, []);

    const value = {
        fetchBlogs,
        deleteBlog,
        axios,
        navigate,
        token,
        setToken,
        blogs,
        setBlogs,
        input,
        setInput
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};