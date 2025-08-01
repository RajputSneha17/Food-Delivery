import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, error in? Sunt, doloremque! Sint quae ut quaerat, natus, doloribus dolore maxime accusamus a unde voluptate laudantium odit suscipit ducimus error!
            At minus pariatur ad. Explicabo sapiente officiis sed eaque cupiditate non et placeat veritatis vel deserunt perspiciatis quasi cumque beatae tempora facilis corrupti quod voluptate, expedita cum incidunt. Similique, error.</p>
            <div className="footer-social-icons">
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
        </div>
        <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-55-45-565</li>
                    <li>contact@tomato.com</li>
                </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 &copy; Tomato.com - All Right Reserved. <br /> <span>❤️ From Sneha...</span></p>
    </div>
  )
}

export default Footer
