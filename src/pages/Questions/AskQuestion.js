import React, { useState, useContext } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserListContext } from '../../context/UserListContext';


function AskQuestion() {
  const paperStyle = { padding: '30px 20px', width: '100%', margin: "20px auto", height: '100%' }
  const [body1, setBody] = useState('')
  const [title, setTitle] = useState('')
  const [body2, setBody2] = useState('')
  let userid = useContext(AuthContext)
  const { que, setQue } = useContext(UserListContext)
  const navigate = useNavigate()

  const question = (e) => {
    e.preventDefault()
    let user = userid.user.user_id
    const items = { title, body1, body2, user }
    console.log('items', items);
    axios.post('https://devdict.online/post/questions', items).then((response) => {
      console.log('response', response.data);
      setQue(false)
      navigate('/questionview')
    })
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={2} sx={{ marginTop: 5 }}>
          <Sidebar />
        </Grid>
        <Grid item xs={8} sx={{ marginTop: 8, marginLeft: 10 }}>
          <Grid>
            <Paper elevation={20} style={paperStyle}>
              <Grid align='center'>
                <Typography variant='caption' gutterBottom>Please Ask a Question</Typography>
              </Grid>

              <form onSubmit={question}>

                <TextField fullWidth label='Tile' placeholder="eg:Is there an R function for finding the index of an elemnt in vector" sx={{ mt: 3 }}
                  onChange={e => setTitle(e.target.value)}
                />

                <div className="editor" style={{ marginTop: 50 }}>
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(e, editor) => {
                      const data = editor.getData()
                      setBody(data)
                    }}
                  />
                </div>

                <div className="editor" style={{ marginTop: 50 }}>
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(e, editor) => {
                      const data1 = editor.getData()
                      setBody2(data1)
                    }}
                  />
                </div>

                <Button className='btn btn-block' type='submit' variant='contained' color='primary' sx={{ mt: 4, width: 200, marginRight: 120 }}>Post Question</Button>
              </form>
            </Paper>
          </Grid>

        </Grid>

      </Grid>
    </div>
  )
}

export default AskQuestion

{/* <div className='container'>
        <div className='row'>
          <div >
            <Sidebar />
          </div>
       <div style={{marginLeft:300, marginTop: -597 }}>
          <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Typography variant='caption' gutterBottom>Please Ask a Question</Typography>
                </Grid>
                
                <form onSubmit={question}>
                  
                    <TextField fullWidth label='Tile' placeholder="eg:Is there an R function for finding the index of an elemnt in vector" sx={{mt:3}} 
                     onChange={e=>setTitle(e.target.value)}
                    />
                   
                    <div className="editor" style={{marginTop:50}}>
                        <CKEditor 
                        editor = {ClassicEditor}
                        onChange={(e,editor)=>{
                          const data = editor.getData()
                          setBody(data)
                        }}
                        />
                    </div>

                    <div className="editor" style={{marginTop:50}}>
                        <CKEditor 
                        editor = {ClassicEditor}
                        onChange={(e,editor)=>{
                          const data1 = editor.getData()
                          setBody2(data1)
                        }}
                        />
                    </div>

                    <Button className='btn btn-block' type='submit' variant='contained' color='primary' sx={{mt:4,width:200,marginRight:120}}>Post Question</Button>
                    </form>
                    </Paper>
                  </Grid>
                </div>
          </div>
          </div> */}