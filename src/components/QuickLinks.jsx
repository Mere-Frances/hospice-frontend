import React from 'react'
import { NavLink } from "react-router-dom";
import axios from 'axios';

import { IoMegaphoneOutline } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoFolderOutline } from "react-icons/io5";
import { IoAttachOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoMedkitOutline } from "react-icons/io5";

import { TiLocationArrowOutline } from "react-icons/ti";

const QuickLinks = () => {
  return (
    <>
        <section className='quick-links-container'>
            {/* Campaigns */}
            <NavLink className='quick-link' to='/campaigns'>
                <div className='link-title'>
                <IoMegaphoneOutline />
                    <h4>Campaigns</h4>
                </div>
                <p>Explore our latest campaigns aimed at raising awareness, support, and funding for hospice care across New Zealand. Learn how you can get involved and make a difference.</p>
                <div className='link-direction'>
                    <TiLocationArrowOutline />
                </div>
            </NavLink>

            {/* news */}
            <NavLink className='quick-link' to='/updates'>
                <div className='link-title'>
                    <IoNewspaperOutline />
                    <h4>News & Updates</h4>
                </div>
                <p>Stay informed with the latest news, updates, and events in the hospice community, including upcoming workshops, conferences, and other hospice-related gatherings.</p>
                <div className='link-direction'>
                    <TiLocationArrowOutline />
                </div>
            </NavLink>

            {/* publications */}
            <NavLink className='quick-link' to='/publications'>
                <div className='link-title'>
                <IoFolderOutline />
                    <h4>Publications</h4>
                </div>
                <p>Access our collection of reports, research papers, and annual publications that highlight hospice care developments, best practices, and insights from experts.</p>
                <div className='link-direction'>
                    <TiLocationArrowOutline />
                </div>
            </NavLink>

            {/* stories */}
            <NavLink className='quick-link' to='/stories'>
                <div className='link-title'>
                <IoBookOutline />
                    <h4>Stories</h4>
                </div>
                <p>Read inspiring stories and personal journeys from patients, families, and caregivers.</p>
                <div className='link-direction'>
                    <TiLocationArrowOutline />
                </div>
            </NavLink>

            {/* resources */}
            <NavLink className='quick-link' to='/resources'>
                <div className='link-title'>
                <IoAttachOutline />
                    <h4>Resources & Tools</h4>
                </div>
                <p>Find useful resources and tools designed to support patients, families, and healthcare professionals in providing compassionate end-of-life care.</p>
                <div className='link-direction'>
                    <TiLocationArrowOutline />
                </div>
            </NavLink>

            {/* donate */}
            <NavLink className='quick-link' to='/donate'>
                <div className='link-title'>
                <IoPeopleOutline />
                    <h4>Support us</h4>
                </div>
                <p>Make a difference by supporting Hospice NZ through donations.</p>
                <div className='link-direction'>
                    <TiLocationArrowOutline />
                </div>
            </NavLink>

            {/* portal */}
            <div className='quick-link'>
                <div className='link-title'>
                <IoMedkitOutline />
                    <h4>Healthcare Professional Portal</h4>
                </div>
                <p></p>
                <div className='link-direction'>
                    <TiLocationArrowOutline />
                </div>
            </div>
        </section>
    </>
  )
}

export default QuickLinks
