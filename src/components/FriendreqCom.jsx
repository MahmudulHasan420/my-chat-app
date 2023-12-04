import React from 'react'
import { TbDotsVertical } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import profile from "../assets/profile.png"

const FriendreqCom = () => {
  return (
    <div className='chatcom'>
    <div className='chatcomhaeder'>
        <h2>Friend Requests</h2>
        <button className='chatcombtn'><TbDotsVertical/></button>
    </div>
    <div className='chatcomSearchBox'>
    <input type="text" className='chatcomSearch' />
   
    <div className='searchIcon'> 
        <CiSearch /> 
        <p>Search</p>
    </div>
    </div>
    <div className='chatcomMsg'>
      <img src={profile} alt="" />
      
      <div className='chatcomName'>
      <h5 className='pName'>Jenny Wilson</h5>
        <p className='chatcomTime'>10:30 PM</p>
      </div>
    </div>
    <div className='chatcomMsg'>
      <img src={profile} alt="" />
      
      <div className='chatcomName'>
      <h5 className='pName'>Jenny Wilson</h5>
        <p className='chatcomTime'>10:30 PM</p>
      </div>
    </div>
    <div className='chatcomMsg'>
      <img src={profile} alt="" />
      
      <div className='chatcomName'>
      <h5 className='pName'>Jenny Wilson</h5>
        <p className='chatcomTime'>10:30 PM</p>
      </div>
    </div>
    <div className='chatcomMsg'>
      <img src={profile} alt="" />
      
      <div className='chatcomName'>
      <h5 className='pName'>Jenny Wilson</h5>
        <p className='chatcomTime'>10:30 PM</p>
      </div>
    </div>
    <div className='chatcomMsg'>
      <img src={profile} alt="" />
      
      <div className='chatcomName'>
      <h5 className='pName'>Jenny Wilson</h5>
        <p className='chatcomTime'>10:30 PM</p>
      </div>
    </div>
    <div className='chatcomMsg'>
      <img src={profile} alt="" />
      
      <div className='chatcomName'>
      <h5 className='pName'>Jenny Wilson</h5>
        <p className='chatcomTime'>10:30 PM</p>
      </div>
    </div>
    <div className='chatcomMsg'>
      <img src={profile} alt="" />
      
      <div className='chatcomName'>
      <h5 className='pName'>Jenny Wilson</h5>
        <p className='chatcomTime'>10:30 PM</p>
      </div>
    </div>
    <div className='chatcomMsg'>
      <img src={profile} alt="" />
      
      <div className='chatcomName'>
      <h5 className='pName'>Jenny Wilson</h5>
        <p className='chatcomTime'>10:30 PM</p>
      </div>
    </div>
    <div className='chatcomMsg'>
      <img src={profile} alt="" />
      
      <div className='chatcomName'>
      <h5 className='pName'>Jenny Wilson</h5>
        <p className='chatcomTime'>10:30 PM</p>
      </div>
    </div>
    <div className='chatcomMsg'>
      <img src={profile} alt="" />
      
      <div className='chatcomName'>
      <h5 className='pName'>Jenny Wilson</h5>
        <p className='chatcomTime'>10:30 PM</p>
      </div>
    </div>

    
</div>
  )
}

export default FriendreqCom