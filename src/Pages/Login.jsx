import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import registraton from '../assets/registraton.png'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import {toast } from 'react-toastify';
import {AiFillEye , AiFillEyeInvisible} from 'react-icons/ai'
import { getAuth, signInWithEmailAndPassword , sendPasswordResetEmail  } from "firebase/auth";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loggeduser  } from '../slices/userSlice';  
import { Hourglass } from 'react-loader-spinner'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Mybutton = styled(Button)({
  fontSize: '20px',
  padding: '6px 12px',
  width : '90%',
  fontWeight :'600',

  fontFamily: [
    'Inter',
   
  ].join(','),

});


const Login = () => {

  let navigate= useNavigate()
  let dispatch = useDispatch()
  const auth = getAuth();
  let [openeye , setOpeneye] = useState(true)
  let userinfo = useSelector(state =>state.activeuser.value)
  let [loader , setLoader] = useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let [input, setInput] =useState({
    email:"",
    remail:"",
    fullname : "",
    password : "",
  
  })
  //  useEffect(()=>{
  //   if(userinfo != null){
  //     navigate("/home")
  //   }
  //  },[])
  let handlechange =(e)=>{
    console.log({[e.target.name] : e.target.value});
    setInput({...input, [e.target.name] : e.target.value})
  }
  let handleclick =()=>{
    setLoader(true)
    signInWithEmailAndPassword(auth, input.email , input.password)
  .then((userCredential) => {
    setLoader(false)
    dispatch(loggeduser(userCredential.user))
    localStorage.setItem("user" , JSON.stringify(userCredential.user))

   if(userCredential.user.emailVerified==false){
    console.log(userCredential.user.emailVerified)
    toast("please verify your email")

   }
   if(userCredential.user.emailVerified==true){
    navigate("/page/home")
   }
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   
  });

    if(input.email==""){
      toast.error("please enter your email");
    }
    
    if(input.password==""){
      toast.error("please enter password");
    }
  }

  let handleforgetpass = ()=>{
    sendPasswordResetEmail(auth, input.remail)
  .then(() => {
    console.log("done")
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
  });

  }

  let handleCloseEye =()=>{
    setOpeneye(false)

  }
  let handleOpenEye =()=>{
    setOpeneye(true)

  }
  
  
  return (
    <>
    {loader ?
      <Hourglass
      visible={true}
      height="80"
      width="80"
      ariaLabel="hourglass-loading"
      wrapperStyle={{}}
      wrapperClass=""
      colors={['#306cce', '#72a1ed']}
    />
    :
    <Grid container spacing={2}>
    <Grid item xs={5}>
     <div className='regbox'>  
      <h1 className='regheading'>Welcome To Chatt.</h1>
      <h2 className='regh2'>Log In</h2>
      <div  className='regInputBox'>
        <label className='regLabel'>Email</label>
      <input onChange={handlechange}  name="email" className='regInput' placeholder='Enter your mail' type="text" />
      </div>
     {openeye ?
      <div className='regInputBox'>
      <label className='regLabel'>Password</label>
      <input onChange={handlechange}  name="password" className='regInput' placeholder='Password' type="password" />
      <div onClick={handleCloseEye} className='regEye'>
      <AiFillEye/>
      </div>
      </div>
     :

          <div className='regInputBox'>
            <label className='regLabel'>Password</label>
            <input onChange={handlechange}  name="password" className='regInput' placeholder='Password' type="text" />
            <div onClick={handleOpenEye} className='regEye'>
               <AiFillEyeInvisible/>
            </div>
        </div>

     }
      <div className='regcheck'> 
      <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
      </div>
      <Button onClick={handleOpen}>Forget password</Button>
      <div className='regButton'>
        <Mybutton onClick={handleclick} variant="contained">Sign in</Mybutton>
      </div>
      <div className='regsingin'>Have you any acount?
      <Link to="/">
      <span >Sign up</span>
      </Link>
       </div>
     </div>
    </Grid>
    <Grid item xs={7}>
      <img className='regimg' src={registraton} alt="cover photo" />
    </Grid>
    
  </Grid>

    }
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Give your email
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <input  name="remail" className='regInput' placeholder='Enter your mail' type="email"  />
          <Mybutton onClick={handleforgetpass} variant="contained">Recovary</Mybutton>
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default Login