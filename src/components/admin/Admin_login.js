import React, { useState,useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../../context/AuthContext'
import jwt_decode from "jwt-decode"
import axios from 'axios'
import { useNavigate} from 'react-router-dom'

function Admin_login() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    let { setUser, setAuthTokens } = useContext(AuthContext)
    let {user} = useContext(AuthContext)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };

      const theme = createTheme();

      let loginUser = async (e) => {
        e.preventDefault()
        console.log('form submitted');
        if(password.length==0||username.length==0){
          setError(true)
        }
        let data ={username,password}
        axios.post('http://localhost:8000/api/token/',data).then((response)=>{
            console.log('from submittedddd',response.data)
            console.log('from submittedddd111',response.data.is_admin)
            let value = response.data
            
                setAuthTokens(value)
                setUser(jwt_decode(value.access))
                localStorage.setItem('authTokens', JSON.stringify(value));
                console.log('oioioi',user)
               
                  // console.log('vaaaaaaaaa',user.is_admin)
                  navigate('/admin_home')
                
                
            
           
            
        })
        
        // console.log('form submitted');
        // let response = await fetch('http://localhost:8000/api/token/', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
    
        //   },
        //   body: JSON.stringify({
        //     'username': e.target.username.value,
        //     'password': e.target.password.value,
    
        //   }),
        // })
        // let data = await response.json()
        // console.log('data', data);
        // console.log('response', data.is_admin);
        // console.log('data111', user);
        //     if (data.is_admin === true) {
        //         setAuthTokens(data)
        //         setUser(jwt_decode(data.access))
        //         localStorage.setItem('authTokens', JSON.stringify(data));
        //         navigate('/admin_home')
        //       } else {
        //         alert('Something Went wrong')
        //       }
        
        
      }


  return (
    <div>
        
       <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={loginUser} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    
    </div>
  )
}

export default Admin_login
