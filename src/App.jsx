import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import AddBlog from './pages/AddBlog'
import ViewBlog from './pages/ViewBlog'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route index path="/" element={<Login/>} />
        <Route path="signup" element={<Signup/>} />
        <Route path="login" element={<Login/>} />
        <Route path="blogs" element={<Home/>} />
        <Route path="blogs/add" element={<AddBlog/>} />
        <Route path="blogs/:id" element={<ViewBlog/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
