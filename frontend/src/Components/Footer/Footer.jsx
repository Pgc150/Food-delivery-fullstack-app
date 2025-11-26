import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
         <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos nulla voluptates expedita, nesciunt quos numquam nobis minima quaerat animi corporis ab fuga hic repellendus quia corrupti. Repellendus, magni sapiente?</p>
                <div className="footer-icons">
                       <img src={assets.facebook_icon} alt="" />
                       <img src={assets.twitter_icon} alt="" />
                       <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                 <h2>COMPANY</h2>
                 <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                 </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 8766885950</li>
                    <li>payalchavhan@gmail.com</li>
                </ul>
            </div>
         </div>
         <hr />
         <p className="footer-copyright">Copyright 2024 @ Tomato.com - all Rights Reserved</p>
         <p>created by @Payal Chavhan</p>
    </div>
  )
}

export default Footer