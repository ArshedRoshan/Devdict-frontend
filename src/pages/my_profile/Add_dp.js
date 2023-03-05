import React, { useState,useContext } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext'


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
export default function Post(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [profile_picture, setProfile] = useState('')
  const navigate = useNavigate()
  let userid = useContext(AuthContext)


  const add_dp = async(e) => {
    e.preventDefault()
    let user = userid.user.user_id
    console.log('function provoked profile');
    let create = {profile_picture}
    console.log('create', create)
     let formField = new FormData()
    formField.append('profile_picture',profile_picture)
    formField.append('user',user)
    await axios({
      method: 'post',
      url:'http://localhost:8000/api/add_dp',
      data: formField
    }).then(response=>{
      console.log(response.data);
      navigate('/my_profile')  
    })
  }


  return (
    <div>
      <Button sx={{marginRight:180,fontSize:12 }} onClick={handleOpen}>{props.name}</Button>
      {/* <button onClick={handleOpen}>{props.name}</button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={add_dp}>
          <Box sx={style}>
            
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField type="file" name='image' className='form-control' sx={{ mt: 3 }}
                 onChange={(e)=>setProfile(e.target.files[0])}
              />
            {/* {props.value.first_name}<br/>
           {props.value.username}<br/>
           {props.value.email}<br/>
            {props.value.phonenumber}  */}
            </Typography>

            <Button className='btn btn-block' type='submit' variant='contained' color='primary' sx={{ mt: 3, width: 200 }}>Share</Button>
          </Box>
        </form>
      </Modal>
    </div>
  )
}
