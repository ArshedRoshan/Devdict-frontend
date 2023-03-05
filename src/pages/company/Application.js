
import React,{useState,useContext} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext'
import {PostlistContext} from '../../context/PostlistContext'
import {CompanyListContext} from '../../context/CompanyListContext'


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

  export default function Application(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [content,setContent] = useState('')
    const navigate = useNavigate()
    const[Full_Name,setFull_name] = useState('')
    const [Qualification,setQualification] = useState('')
    const [Phone_number,setPhone_number] = useState('')
    const [resume,setResume] = useState('')
    const {company,setCompany} = useContext(CompanyListContext)
    let userid = useContext(AuthContext)
   
    

  
  const submit = async(e) => {
    e.preventDefault()
    let user = userid.user.user_id
    {company && 
      console.log('function provoked',company[0].id);
    let company_name = company[0].id 
   
    console.log('coom',company_name)
    let items = {Full_Name,Phone_number,resume,Qualification,user,company_name}
    console.log('items', items)
    let formField = new FormData()
    formField.append('Full_Name',Full_Name)
    formField.append('Phone_number',Phone_number)
    formField.append('resume',resume)
    formField.append('Qualification',Qualification)
    formField.append('user',user)
    formField.append('company_name',company_name)
  
    await axios({
      method: 'post',
      url:'http://localhost:8000/api/application',
      data:formField
      
    }).then(response=>{
      console.log(response.data);
      

    })
  }
  }

    return (
        <div>
          <Button sx={{marginRight:180,fontSize:13 }} onClick={handleOpen}>{props.name1}</Button>
          {/* <button onClick={handleOpen}>{props.name}</button> */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <form onSubmit={submit}>
              <Box sx={style}>
                <h2></h2>
                
                  <TextField fullWidth label='Enter FulName' placeholder="Add a comment" sx={{ mt: 3 }}
                    onChange={e => setFull_name(e.target.value)}
                  />
                  <TextField fullWidth label='Enter a PhoneNumber' placeholder="Add a comment" sx={{ mt: 3 }}
                    onChange={e => setPhone_number(e.target.value)}
                  />
                  <TextField type='file'  placeholder="Add a comment" sx={{ mt: 3 }}
                    onChange={e => setResume(e.target.files[0])}
                  />
                  <TextField fullWidth label='Enter highest Qualification' placeholder="Add a comment" sx={{ mt: 3 }}
                    onChange={e => setQualification(e.target.value)}
                  />
    
                <Button className='btn btn-block' type='submit' variant='contained' color='primary' sx={{ mt: 3, width: 200 }}>Apply</Button>
              </Box>
            </form>
          </Modal>
        </div>
      )
    }
    
