import React, { useEffect } from 'react'
import './Verify.css'
import { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    const orderId = new URLSearchParams(window.location.search).get("orderId");
    const {url} = useContext(StoreContext)
    const navigate = useNavigate()

    console.log("sessionId = " + sessionId + "orderId = "+ orderId)

    const verifyPayment = async() => {
        const response = await axios.post(url + "/api/order/verify",{sessionId,orderId})

        if(response.data.success){
           navigate("/myorders");
        }
        else{
            navigate("/")
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])
  return (
    <div className='verify'>
        
        <div className='spinner'>

        </div>
    </div>
  )
}

export default Verify