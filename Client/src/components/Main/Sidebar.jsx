import React from 'react'
import {BsGrid1X2Fill, BsPersonFillAdd,BsFillGrid3X3GapFill} from 'react-icons/bs'
import "./Home.css"
import  {Link} from "react-router-dom"
import { AiFillDelete } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa"


function Sidebar({openSidebarToggle, OpenSidebar}) {

    
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        
        <div className='sidebar-title'>
            
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/add">
                    <BsPersonFillAdd className='icon'/> Add Patient
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/view">
                    <BsFillGrid3X3GapFill className='icon'/> View All Patients
                </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to="/edit">
                    <FaUserEdit className='icon'/> Edit Patient
            </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to="/del">
            <AiFillDelete className='icon'/> Delete Patient
            </Link>
            </li>
            
        </ul>
    </aside>
  )
}

export default Sidebar
