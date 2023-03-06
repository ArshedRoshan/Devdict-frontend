import React, { useState,useContext } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import { PostlistContext } from '../../context/PostlistContext';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Grid } from '@mui/material'
import { ProfileContext } from '../../context/ProfileContext';



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
export default function Search(props) {
  const [open, setOpen] = React.useState(false);
  const {search,setSearch,post, setPost} = useContext(PostlistContext)
  const {profile,setProfile}=useContext(ProfileContext)
  const [result,setResult] = useState([])
  const navigate = useNavigate()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  const searchfun = (e) =>{
   console.log('pooo',post)
    handleOpen()
    console.log('function provoked')
    let obj = post.find(o=>o.username === search)
    console.log('obj',obj.username)
    setResult(obj)
    if(obj == null){
     console.log('Not Found')
    }
 }
 const others_profile=(id)=>{
  console.log('other',id)
  const result = axios.create({
    baseURL: `https://devdict.online/api/my_profile/`
  })
  result.get(`/${id}`, { withCredentials: 'include'}).then((response) => {
    console.log('other_profile', response.data)
    setProfile(response.data)
    navigate('/others_profile')
  })
}
console.log('others_profile',profile)
 const profilepicture =  result.pro && result.pro[0] && result.pro[0].profile_picture;
 let img_name = profilepicture && profilepicture


  return (
    <div>
      <Button sx={{color:'black'}} onClick={() => searchfun()}>{props.name}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          {/* if (dp.pro.length !== 0){
              console.log('iiiiiiiiiiiiii',dp.pro[0]. profile_picture);
                img_name = dp.pro[0].profile_picture.replace(
              "/frontend/src/static/",
              ""
            )
            console.log('title dp',img_name);
            } */}

          
          <Box sx={style}>
           
           {console.log('got it',profilepicture)}
          {console.log('resss',result.username)}
          {console.log('go',img_name)}
          {console.log('resss1',result)}
          
              
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div style={{display:'flex'}}>
              {profilepicture && img_name !== null ?  <Grid> 
                <Avatar onClick={()=>others_profile(result.id)}    sx={{bgcolor: red[500],fontSize:'50px'}} src={img_name} />
                  </Grid> : <Grid>    
                  <Avatar  sx={{bgcolor: red[500]}} />  
                  </Grid>
            }
            <Grid sx={{marginLeft:3}}>
            {result.username}
            </Grid>
            </div>
                
            </Typography>
             
          </Box>
        
      </Modal>
    </div>
  )
}


