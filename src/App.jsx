// App.jsx
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Blog from "./pages/Blog"
import Layout from "./pages/admin/Layout"
import Dashboard from "./pages/admin/Dashboard"
import AddBlog from "./pages/admin/AddBlog"
import EditBlog from "./pages/admin/EditBlog" 
import ListBlog from "./pages/admin/ListBlog"
import Comment from "./pages/admin/Comment"
import Login from "./pages/admin/Login"
import 'quill/dist/quill.snow.css'
import { useAppContext } from "./context/AppContext"
import About from "./pages/About"

const App = () => {
  const { token } = useAppContext()
  
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home/>}/>
        <Route path="/blog/:id" element={<Blog/>}/>
        
        
        {/* Admin Dashboard Nested Routes */}
        <Route path="/admin" element={ token ? <Layout/> : <Login/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="addblog" element={<AddBlog/>}/>
          
          {/* FIXED: Relative path config. Parent '/admin' hai, toh yeh '/admin/edit-blog/:id' banega */}
          <Route path="edit-blog/:id" element={<EditBlog/>}/> 
          
          <Route path="listblog" element={<ListBlog/>}/>
          <Route path="comment" element={<Comment/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;