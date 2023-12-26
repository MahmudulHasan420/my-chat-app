import React, { useState ,createRef } from 'react'
import { AiOutlineHome } from "react-icons/ai";
import { CiChat2 } from "react-icons/ci";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { TbUserSearch } from "react-icons/tb";
import { Link } from 'react-router-dom'; 
import profile from '../assets/profile.png'
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString ,getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dref, set } from "firebase/database";
import { getAuth, updateProfile , signOut } from "firebase/auth";
import { loggeduser } from '../slices/userSlice';
import { useNavigate } from 'react-router';



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


const Sidebar = () => {

     const db = getDatabase();
     const [open, setOpen] = React.useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);
     const [image, setImage] = useState("");
     const cropperRef = createRef();
     const storage = getStorage();
     const auth = getAuth();
  
        let  [pathnam , setPathnam] = useState()
        let handleLink =()=>{
        setPathnam(window.location.pathname)
       }
       let userinfor = useSelector(state =>state.activeuser.value)
       let dispatch= useDispatch()
       let navigate = useNavigate()
       

      
       


       let handlelogout =()=>{

        signOut(auth).then(() => {
          navigate("/login")
          dispatch(loggeduser(null))
          localStorage.removeItem("user")
         
    })
      
      }


       const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
      };
    
      const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
          const storageRef = ref(storage, userinfor.uid);

        uploadString(storageRef, cropperRef.current?.cropper.getCroppedCanvas().toDataURL(), 'data_url').then((snapshot) => {

            getDownloadURL(storageRef).then((downloadURL) => {
               
                updateProfile(auth.currentUser, {
                 photoURL: downloadURL
                  }).then(() => {
                    set(dref(db, 'user/' +userinfor.uid), {
                      username: userinfor.displayName,
                      email: userinfor.email,
                      profile_picture : downloadURL
                    }).then(()=>{
                      dispatch(loggeduser({...userinfor , photoURL:downloadURL}))
                      localStorage.setItem('user', JSON.stringify({...userinfor , photoURL:downloadURL}))
                      setImage("")

                    })
                   
    
                  })
              });
           
        
});
        }
      };
    
 
  return (
    <div className='sidebar'>
        <h1 >Chatt.</h1>
            <p className='sidebarName' >{userinfor.displayName}</p>
        <img src={userinfor.photoURL} alt="" className='sidebarProfile' onClick={handleOpen} />
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
        <Button onClick={handlelogout} variant="contained">Logout</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload your Profile Pic
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {image ?
          <div className="previewBox">
          <div className="img-preview"/>
          </div>
          :
          <img src={userinfor.photoURL} alt="" className='previewBox'/>
          }
        <input type="file" onChange={onChange}/>
         {image && 
         <>
          <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={100}
          minCropBoxWidth={100}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} 
          guides={true}
        />
       <Button variant="contained" onClick={getCropData}>Upload</Button>
       <Button variant="contained" onClick={()=>setImage("")}>cencel</Button>
         </>
         }
          </Typography>
        </Box>
      </Modal>

    </div>
  )
}

export default Sidebar