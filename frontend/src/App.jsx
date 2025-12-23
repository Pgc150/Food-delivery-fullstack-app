import { useMemo, useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home/Home'
import { Cart } from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import LoginSignup from './Components/LoginSignup/LoginSignup'
import { Toaster } from "react-hot-toast";
import Verify from './Pages/Verify/Verify'
import MyOrders from './Pages/MyOrders/MyOrders'
import Chatbot from './Components/Chatbot/Chatbot'

function App() {
  const [showLogin,setShowLogin] = useState(false)

  const pages = useMemo(()=>
      [
    {path:'/',
      element:<Home/>
    },
    {
      path:'/cart',
      element:<Cart/>
    },
    ,{
      path:'/order',
      element:<PlaceOrder/>
    },
    {
      path:'/verify',
      element:<Verify/>

    },
    {
      path:'/myorders',
      element:<MyOrders/>
    }
    ,{
      path:'/chat',
      element:<Chatbot/>
    }
    

  ]

  ,[])
  
  return (
    <>
      <Toaster
        position="bottom-right" 
        reverseOrder={true}
      />
      {showLogin&&<LoginSignup setShowLogin={setShowLogin}/>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          {pages.map((value)=>{
               return(
                <Route path={value.path} element={value.element}/>
               )
          })}
          
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
