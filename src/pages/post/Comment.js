
import React,{useState,useContext} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import { TextField } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext'
import {PostlistContext} from '../../context/PostlistContext'
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

  export default function Comment(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [content,setContent] = useState('')
    const{content11,setContent11} = useContext(UserListContext)
    const [id,setId] = useState(0)
    const navigate = useNavigate()
    let userid = useContext(AuthContext)
    let postid = useContext(PostlistContext)
    

    
  const submit = async(e) => {
    e.preventDefault()
    let commented_by = userid.user.user_id
    let Post = props.id
    console.log('posts',Post);
    console.log('function provoked');
    let items = {Post,content,commented_by }
    console.log('items', items)
    
    await axios({
      method: 'post',
      url:'http://localhost:8000/post/add_comment',
      data:items
       
      
      
    }).then(response=>{
      console.log(response.data);
      setContent11(false)
      navigate('/home')

    })
    handleClose()

  }

    return (
        <div>
          <Button sx={{ color: 'black',marginRight:180,fontWeight:700,fontSize:19 }} onClick={handleOpen}>{props.name}</Button>
          {/* <button onClick={handleOpen}>{props.name}</button> */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <form onSubmit={submit}>
              <Box sx={style}>
                <h2>Share your Comment</h2>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    
                  <TextField fullWidth label='Caption' placeholder="Add a comment" sx={{ mt: 3 }}
                    onChange={e => setContent(e.target.value)}
                  
                  />
                
                </Typography>
    
                <Button className='btn btn-block' type='submit' variant='contained' color='primary' sx={{ mt: 3, width: 200 }}>Share</Button>
              </Box>
            </form>
          </Modal>
          
        </div>
      )
    }
    




