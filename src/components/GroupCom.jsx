import React, {useState} from 'react'
import { CiSearch } from "react-icons/ci"
import profile from "../assets/profile.png"

const GroupCom = () => {

  let [creatgroup , setCreatGroup] = useState(false)
  let [creatName , setCreatName] = useState(false)

  let handlegrouppage =()=>{
    setCreatGroup(!creatgroup)
  }
  let handlegroupName=(e)=>{
    setCreatName(e.target.value)
  }
  
  return (
    <div className='chatcom'>
    <div className='chatcomhaeder'>
        <h2>Group</h2>
        {creatgroup ? 
         
         <button className='chatcombtn' onClick={handlegrouppage} >Back</button>
        :
        <button className='chatcombtn' onClick={handlegrouppage} >Creat group</button>
        }
       
    </div>
    <div className='chatcomSearchBox'>
    <input type="text" className='chatcomSearch' />
   
    <div className='searchIcon'> 
        <CiSearch /> 
        <p>Search</p>
    </div>
    </div>
    {creatgroup ?
    <div className='flex crategroupinput'>
    <lebel>group name :</lebel>
    <input onChange={handlegroupName} type="text" className='chatcomSearch' />
    <Button   variant="contained" >Confirm</Button>
    </div>
      :
      <div className='chatcomMsg'>
      <img src={profile} alt="" />
      
      <div className='chatcomName'>
      <h5 className='pName'>Jenny Wilson</h5>
        <p className='chatcomTime'>10:30 PM</p>
      </div>
    </div>}



    
</div>
  )
}

export default GroupCom