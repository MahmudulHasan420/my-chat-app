import React, {useState} from 'react'
import { CiSearch } from "react-icons/ci"
import profile from "../assets/profile.png"

const GroupCom = () => {

  let [Creatgroup , setCreatGroup] = useState(false)
  
  return (
    <div className='chatcom'>
    <div className='chatcomhaeder'>
        <h2>Group</h2>
        <button className='chatcombtn'  >Creat group</button>
    </div>
    <div className='chatcomSearchBox'>
    <input type="text" className='chatcomSearch' />
   
    <div className='searchIcon'> 
        <CiSearch /> 
        <p>Search</p>
    </div>
    </div>
    {Creatgroup ?
    <h1>mahmud</h1>
      :
      <div className='chatcomMsg'>
      <img src={profile} alt="" />
      
      <div className='chatcomName'>
      <h5 className='pName'>Jenny Wilson</h5>
        <p className='chatcomTime'>10:30 PM</p>
      </div>
    </div>}
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

export default GroupCom