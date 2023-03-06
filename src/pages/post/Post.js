import React, { useState,useContext } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext'
import CollectionsIcon from '@mui/icons-material/Collections';
import { UserListContext } from '../../context/UserListContext';


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
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState('')
  const navigate = useNavigate()
  let userid = useContext(AuthContext)
  const {post1,setPost1} = useContext(UserListContext)


  const create = (e) => {
    e.preventDefault()
    let user = userid.user.user_id
    console.log('function provoked');
    let create = { caption, image }
    
     let formField = new FormData()
    formField.append('image',image)
    formField.append('caption',caption)
    formField.append('user',user)
     axios({
      method: 'post',
      url:'https://devdict.online/post/post1',
      data: formField
    }).then((response)=>{
      console.log(response.data);
      handleClose()
      setPost1(false)
    })
   
  }


  return (
    <div>
      <Button sx={{color:'black',marginRight:180,fontSize:16}} onClick={handleOpen}>{props.name}</Button>
      <Button sx={{color:'black',marginRight:180,fontSize:16}} onClick={handleOpen}>{props.name1}</Button>
      {/* <button onClick={handleOpen}>{props.name}</button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={create}>
          <Box sx={style}>
            <h2>Create Your Post</h2>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>

              <TextField fullWidth label='Caption' placeholder="Caption" sx={{ mt: 3 }}
                onChange={e => setCaption(e.target.value)}
              
              />
             
              <TextField type="file" name='image' className='form-control' sx={{ mt: 3 }}
                 onChange={(e)=>setImage(e.target.files[0])}
              />
            </Typography>

            <Button className='btn btn-block' type='submit' variant='contained' color='primary' sx={{ mt: 3, width: 200 }}>Share</Button>
          </Box>
        </form>
      </Modal>
    </div>
  )
}


