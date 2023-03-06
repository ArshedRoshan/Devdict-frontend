import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material'
import {AuthContext} from '../../context/AuthContext'
import {PostlistContext} from '../../context/PostlistContext'
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
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

export default function ComRe(props) {
  const [open, setOpen] = React.useState(false);
  const [content,setContent] = React.useState('')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let userid = React.useContext(AuthContext)
  let postid = React.useContext(PostlistContext)
  const {contre,setContere} = React.useContext(UserListContext)

 const submit = (e) =>{
    e.preventDefault()
    console.log('function provoked');
    let commented_by = userid.user.user_id
    let Comment = props.id
    let items = {commented_by,Comment,content}
    console.log('comreee',items)
    axios.post('https://devdict.online/post/add_reply',items).then((response)=>{
       console.log('comment_reply',response.data)
       setContere(false)
    })
   handleClose()
 }
 

  return (
    <div>
      <Button onClick={handleOpen}>{props.name1}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            <form onSubmit={submit}>
          <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    
                <TextField fullWidth label='Caption' placeholder="Add a comment" sx={{ mt: 3 }}
                onChange={e => setContent(e.target.value)}/>

<Button className='btn btn-block' type='submit' variant='contained' color='primary' sx={{ mt: 3, width: 200 }}>Share</Button>
                </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
             
            </Typography>
          </Box>

          </form>
        </Fade>
      </Modal>
    </div>
  );
}