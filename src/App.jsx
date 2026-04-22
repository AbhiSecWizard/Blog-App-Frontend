import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Blog from "./pages/Blog"
import Layout from "./pages/admin/Layout"
import Dashboard from "./pages/admin/Dashboard"
import AddBlog from "./pages/admin/AddBlog"
import ListBlog from "./pages/admin/ListBlog"
import Comment from "./pages/admin/Comment"
import Login from "./pages/admin/Login"
import 'quill/dist/quill.snow.css'
import { useAppContext } from "./context/AppContext"

const App = () => {
  
  const {token} = useAppContext()
  
  
  return (
    <div>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/blog/:id" element={<Blog/>}/>
        <Route path="/admin" element={ token ? <Layout/> : <Login/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="addblog" element={<AddBlog/>}/>
            <Route path="listblog" element={<ListBlog/>}/>
            <Route path="comment" element={<Comment/>}/>
        </Route>
    </Routes>
    </div>
  )
}

export default App