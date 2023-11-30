import React, { useState } from 'react'
import { AiOutlineHome } from "react-icons/ai";
import { CiChat2 } from "react-icons/ci";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { TbUserSearch } from "react-icons/tb";
import { Link } from 'react-router-dom'; 


const Sidebar = () => {
    let  [pathnam , setPathnam] = useState()
    let handleLink =()=>{
        setPathnam(window.location.pathname)
       }
 
  return (
    <div className='sidebar'>
        <h1>Chatt.</h1>
        <Link to="/page/home" onClick={handleLink} className={`sidebarHome ${window.location.pathname == "/page/home" ? "sidebaractive" : ""}`} >
            <AiOutlineHome  className='sidebarIcon'/>
            <h4>Home</h4> 
        </Link>
        <Link  to="/page/chat" onClick={handleLink} className={`sidebarHome ${window.location.pathname == "/page/chat" ? "sidebaractive" : ""}`}>
            <CiChat2  className='sidebarIcon'/>
            <h4>Chat</h4>
            
        </Link>
        <Link  to="/page/group" onClick={handleLink} className={`sidebarHome ${window.location.pathname == "/page/group" ? "sidebaractive" : ""}`}>
            <AiOutlineUsergroupAdd  className='sidebarIcon'/>
            <h4>Group</h4>
            
        </Link>
        <Link  to="/page/friends" onClick={handleLink} className={`sidebarHome ${window.location.pathname == "/page/friends" ? "sidebaractive" : ""}`}>
            <CiUser  className='sidebarIcon'/>
            <h4>Friends</h4>
            
        </Link>
        <Link  to="/page/people" onClick={handleLink} className={`sidebarHome ${window.location.pathname == "/page/people" ? "sidebaractive" : ""}`}>
            <TbUserSearch  className='sidebarIcon'/>
            <h4>People</h4>
            
        </Link>
    </div>
  )
}

export default Sidebar