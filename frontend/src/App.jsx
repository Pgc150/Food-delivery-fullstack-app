import { useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home/Home'
import { Cart } from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import LoginSignup from './Components/LoginSignup/LoginSignup'
import { Toaster } from "react-hot-toast";
function App() {
  const [showLogin,setShowLogin] = useState(false)
  
  return (
    <>
      <Toaster
        position="top-center"     // 👉 This sets the toast position
        reverseOrder={false}
      />
      {showLogin?<LoginSignup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/order' element={<PlaceOrder/>}/>
            
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
