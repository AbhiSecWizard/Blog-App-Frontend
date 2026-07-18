import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Newalatter from '../components/Newslatter'
import BlogList from '../components/BlogList'
import Footer from '../components/Footer'
import About from './About'

const Home = () => {
  return (
    <>
      <Navbar/>
      <Header/>
      <BlogList/>
      <About/>
      <Newalatter/>
      <Footer/>   
    </>
  )
}

export default Home
