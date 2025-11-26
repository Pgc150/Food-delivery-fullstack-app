import React, { useContext, useEffect, useState } from 'react'
import './LoginSignup.css'
import { assets } from '../../assets/assets'
import { use } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import toast from "react-hot-toast";

const onLogin = async (e) => {
  e.preventDefault();

  const endpoint =
    currentState === "Login"
      ? "http://localhost:4000/api/user/login"
      : "http://localhost:4000/api/user/register";

  try {
    const response = await axios.post(endpoint, data);

    if (response.data.success) {
      toast.success(
        currentState === "Login"
          ? "Login Successful 🎉"
          : "Signup Successful 🎉"
      );

      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      setShowLogin(false); // close popup
    } else {
      toast.error(response.data.message || "Something went wrong");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Server error");
    console.log(error);
  }
};

const LoginSignup = ({setShowLogin}) => {
   
    const {url,setToken} = useContext(StoreContext)
    const [currentState,setCurrentState] = useState("Sign Up")
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (e) =>{
          const name = e.target.name
          const value = e.target.value
          setData(data=>({...data,[name]:value}))
    }

    // const onLogin = async(e) => {
    //   e.preventDefault()
    //   let newUrl = url;

    //   if(currentState==="Login"){
    //     newUrl += "/api/user/login"
    //   }
    //   else{
    //     newUrl +="/api/user/register"
    //   }

    //   localStorage.clear();

    //   const response = await axios.post(newUrl,data)
    //   if(response.data.success) {
    //        setToken(response.data.token)
    //        localStorage.setItem("token",response.data.token)
    //        setShowLogin(false)
    //   }
    //   else{
    //     alert(response.data.message)
    //   }

    // }

 const onLogin = async (e) => {
  e.preventDefault();

  const endpoint =
    currentState === "Login"
      ? "http://localhost:4000/api/user/login"
      : "http://localhost:4000/api/user/register";

  try {
    const response = await axios.post(endpoint, data);

    if (response.data.success) {
      toast.success(
        currentState === "Login"
          ? "Login Successful 🎉"
          : "Signup Successful 🎉"
      );

      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      setShowLogin(false); // close popup
    } else {
      toast.error(response.data.message || "Something went wrong");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Server error");
    console.log(error);
  }
};

  return (
    <div className='login-signup'>
        <form onSubmit={onLogin} className='login-signup-container' >
            <div className="login-title">
                <h2>{currentState}</h2>
                <img  onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className='login-inputs'>
              {currentState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
              <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required/>
              <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password'  required/>
            </div>
            <button type='submit'>{currentState==="Sign Up"?"Create account":"Login"}</button>
            <div className="login-popup-condition">
              <input type="checkbox" required/>
              <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>
            {currentState==="Login"?
             <p>Create a new account? <span onClick={()=>setCurrentState("Sign up")}>Click here</span></p>
             :<p>Already have an account<span onClick={()=>setCurrentState("Login")}>Login here</span></p>
             }
        </form>
    </div>
  )
}

export default LoginSignup