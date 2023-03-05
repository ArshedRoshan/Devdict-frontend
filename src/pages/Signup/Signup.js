import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button, Stack } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';







function Signup() {
    const paperStyle = { padding: '30px 20px', width: 600, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }

    const [Account_type,setAccount] = useState('')
    const[first_name,setFirst_name]=useState('')
    const[last_name,setLast_name]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[username,setUsername]=useState('')
    const[phone_number,setPhonenumber]=useState('')
    const[error,setError]=useState('')
    const navigate = useNavigate()
    const [ishown,setIshown] = useState('')
    const [company_name,setCompany] = useState('')
    const [Describe_company,setDescribe_company] = useState('')
    const [hiring_for,setHiring_for] = useState('')
    const [token,setToken] = useState('')

    // const handleChange = (event) => {
    //     setAccount(event.target.value);
    //   };

   const submit = (e)=>{
    e.preventDefault()
    if(first_name.length===0||last_name.length===0||email.length===0||password.length === 0||username.length===0||Account_type===0){
      setError(true)
    }
    let items = {first_name,last_name,email,password,username,phone_number,Account_type,company_name,Describe_company,hiring_for}
    console.log('items',items);
    axios.post('http://localhost:8000/api/signup',items).then((response)=>{
      console.log('response',response.data);
      if(response.data === 200){
        setToken(true)
        // verify();
        
      }
      
    })
    setIshown(current =>! current)
   }

  //  const verify = (e)=>{
  //   axios.get('http://localhost:8000/api/email-verify').then((response)=>{
  //     console.log('verify',response.data)
  //     setToken(response.data)
  //   })
  //  }


  return (
  <div>
    <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                
                <form onSubmit={submit}>
                <Stack direction="row">
                    <TextField fullWidth label='First Name' placeholder="First name" sx={{mt:3,marginRight:3}} 
                     onChange={e=>setFirst_name(e.target.value)}
                    />
          
                    <TextField fullWidth label='Last Name' placeholder="Last name" sx={{mt:3}}
                    onChange={e=>setLast_name(e.target.value)}
                    />
                    </Stack>
                    {error && first_name.length <= 0 ?
          <label htmlFor="floatingInput" style={{ color: "red" }}>FirstName required</label> : ""
        }
                      {error && last_name.length <= 0 ?
          <label htmlFor="floatingInput" style={{ color: "red",marginLeft:'250px'}}>Last Name required</label> : ""
        }
                    <TextField fullWidth label='Email' placeholder="Enter your email" type={'email'} sx={{mt:3}} 
                    onChange={e=>setEmail(e.target.value)}
                    />
                      {error && email.length <= 0 ?
          <label htmlFor="floatingInput" style={{ color: "red" }}>Email required</label> : ""
        }
                    <TextField fullWidth label='User Name' placeholder="Enter your User Name" sx={{mt:3}}  
                    onChange={e=>setUsername(e.target.value)}
                    />
                      {error && username.length <= 0 ?
          <label htmlFor="floatingInput" style={{ color: "red" }}>UserName required</label> : ""
        }
                    
                    <FormControl component="fieldset" style={marginTop}>
                      
                        
                    </FormControl>
                    <FormControl sx={{ mt:3,width:556 }}>
        <InputLabel id="demo-simple-select-helper-label" >Account type</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={Account_type}
          label="Account type"
          onChange={e=>setAccount(e.target.value)}
         
        >
          
         
          <MenuItem value={'personal'}>Personal</MenuItem>
          <MenuItem value={'company'}>Company</MenuItem>
         
        </Select>
      {Account_type === 'company' &&
      <>
        <TextField fullWidth label='Company Name' placeholder="Company Name" sx={{mt:3}} 
        onChange={e=>setCompany(e.target.value)}
        />
        <TextField fullWidth label='Company Description' placeholder="Company Description" sx={{mt:3}} 
        onChange={e=>setDescribe_company(e.target.value)}
        />
         <TextField fullWidth label='seeking for' placeholder="seeking for" sx={{mt:3}} 
        onChange={e=>setHiring_for(e.target.value)}
        />
     </>
      }



        {error && username.length <= 0 ?
          <label htmlFor="floatingInput" style={{ color: "red" }}> Select a Account type</label> : ""
        }
      </FormControl>
    
                    <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" sx={{mt:3}} 
                    onChange={e=>setPhonenumber(e.target.value)}
                    />
                      {error && phone_number.length <= 0 ?
          <label htmlFor="floatingInput" style={{ color: "red" }}>Phone number required</label> : ""
        }            <Stack>
                    <TextField fullWidth label='Password' type={'password'} placeholder="Enter your password" sx={{mt:3}}
                    onChange={e=>setPassword(e.target.value)}
                    />
                   
                   {error && password.length <= 0 ?
          <label htmlFor="floatingInput" style={{ color: "red" }}>Password required</label> : ""
        }
        </Stack>
          
                      
                    
                    <Button className='btn btn-block' type='submit' variant='contained' color='primary' sx={{mt:3,width:200}}>Sign up</Button>
                  {token && 
                   <p>A link send to your Email please verify</p>
                  } 

                <div className="checkbox mb-3">
                <label className="nav-item">
                  <Link to="/" className="nav-link active" sx={{textDecoration:'none'}} ><Typography sx={{mt:5}}><span>Already have an account ?</span>Login </Typography></Link>
                </label>
              </div>
                </form>
            </Paper>
        </Grid>
  </div>
  )
}

export default Signup
