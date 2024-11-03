import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import AddPost from './pages/AddPost'
import ViewPost from './pages/ViewPost'
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
        <Route path="posts" element={<Home/>} />
        <Route path="posts/add" element={<AddPost/>} />
        <Route path="posts/:id" element={<ViewPost/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
