import React from 'react'
import { NavLink } from "react-router-dom";

// icons
import { IoLogoInstagram } from "react-icons/io5";
import { FaSquareFacebook } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { IoLogoYoutube } from "react-icons/io5";

const Footer = () => {
  return (
    <footer>
      <div className='footer-details'>
        <div className='footer-links'>
          <h4>Home</h4>
          <NavLink to='/'>Find a hospice</NavLink>
          <NavLink to='/'>Find a hospice shop</NavLink>
          <NavLink to='/'>Guide to hospice</NavLink>
          <NavLink to='/'>Healthcare professional portal</NavLink>
        </div>
        <div className='footer-links'>
          <h4>Campaigns</h4>
          <NavLink to='/campaigns'>Fundraising</NavLink>
          <NavLink to='/campaigns'>Awareness</NavLink>
          <NavLink to='/campaigns'>Petitions</NavLink>
        </div>
        <div className='footer-links'>
          <h4>News</h4>
          <NavLink to='/updates'>Local news</NavLink>
          <NavLink to='/updates'>Announcements</NavLink>
          <NavLink to='/updates'>Lifestyle journalism</NavLink>
        </div>
        <div className='footer-links'>
          <h4>Publications</h4>
          <NavLink to='/publications'>Reviews</NavLink>
          <NavLink to='/publications'>Planning</NavLink>
          <NavLink to='/publications'>Information research</NavLink>
        </div>
        <div className='footer-links'>
          <h4>Resources</h4>
          <NavLink to='/resources'>Tools</NavLink>
          <NavLink to='/resources'>Guides</NavLink>
          <NavLink to='/resources'>Learning courses</NavLink>
          <NavLink to='/resources'>Information resources</NavLink>
        </div>
        <div className='footer-links'>
          <h4>Stories</h4>
          <NavLink to='/stories'>Relatives</NavLink>
          <NavLink to='/stories'>Personal</NavLink>
          <NavLink to='/stories'>Staff</NavLink>
        </div>
        <div className='footer-links footer-socials'>
          <h4>Social Media</h4>
          <div className='icons'>
            <FaSquareFacebook />
            <IoLogoInstagram />
            <IoLogoYoutube />
            <IoLogoLinkedin />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
