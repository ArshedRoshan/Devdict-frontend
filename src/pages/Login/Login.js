import React, { useState, useContext } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
// import LockOutlinedIcon from '@mui/material/LockOutlined';
import { AuthContext } from '../../context/AuthContext'
import jwt_decode from "jwt-decode"
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Home from '../Home/Home';

function Login() {
  const paperStyle = { padding: '30px 20px', width: 600, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0' }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  let { setUser, setAuthTokens } = useContext(AuthContext)


  let loginUser = async (e) => {
    e.preventDefault()
    if(password.length==0||username.length==0){
      setError(true)
    }
    console.log('form submitted');
    let response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        'username': e.target.username.value,
        'password': e.target.password.value,

      }),
    })
    let data = await response.json()
    console.log('data', data);
    console.log('response', response);
    if (response.status === 200) {
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data));
      navigate('/home')
    } else {
      alert('Invalid Credentials')
    }
  }



  return (
    <div>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                   
                    <h2>Login</h2>
                </Grid>
      <form onSubmit={loginUser}>

       

        <div className="form-floating container mt-3">
          <TextField type="text" className="form-control"   name='username' placeholder="Username" sx={{mt:3}}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        {error && username.length <= 0 ?
          <label htmlFor="floatingInput" style={{ color: "red",marginTop:18}}>UserName required</label> : ""
        }
        <div className="form-floating container mt-3">
          <TextField type="password" className="form-control" name='password' placeholder="Password" sx={{mt:3}}
            onChange={e => setPassword(e.target.value)}
          />
         
        </div>
        {error && password.length <= 0 ?
          <label htmlFor="floatingInput" style={{ color: "red",marginTop:18}}>Password required</label> : ""
        }
        <div className="checkbox mb-3">
          <label className="nav-item">
            <Link to="/signup" className="nav-link active" sx={{textDecoration:'none'}} ><Typography sx={{mt:5}}><span>You dont have an account ?</span>Register </Typography></Link>
          </label>
        </div>
        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
        
      </form>
      </Paper>
      </Grid>
    </div>
  )
}

export default Login
