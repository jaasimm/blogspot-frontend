
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Blogs from './Pages/Blogs'

function App() {
  

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/blogs" element={<Blogs/>}/>
      
    </Routes>


    </>
  )
}

export default App
