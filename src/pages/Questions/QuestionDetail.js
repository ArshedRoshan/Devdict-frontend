import React, { useContext,useEffect,useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Grid } from '@mui/material'
import { QuestionContext } from '../../context/QuestionContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Stack } from '@mui/system'
import { UserListContext } from '../../context/UserListContext';
import { useNavigate } from 'react-router-dom';


function QuestionDetail() {
  const {details,setDetails} = useContext(QuestionContext)
  const [answer,setAnswer] = useState('')
  let userid = useContext(AuthContext)
  const [like, setLike] = useState(false)
  const {user} = useContext(AuthContext)
  const { users, setUsers } = useContext(UserListContext)
  const {question,setQuestion} = useContext(QuestionContext)
  const {ans,setAns} = useContext(UserListContext)
 
  



const answer_question = ()=>{
let user = userid.user.user_id
let Question = details[0].id
console.log('setiall',Question)

 let items = {answer,user,Question}
  axios.post('http://localhost:8000/post/answers',items).then((response)=>{
    setAns(!ans)
  })
}


const answerlike = (id) => {
  {console.log('answerlike',id)}
  let use = user.username
  const result = axios.create({
    baseURL: `http://localhost:8000/post/answer_likes/`
  })
  result.post(`/${id}`, { withCredentials: 'include',use}).then((response) => {
  })
  console.log('answerlike', id);
  setLike(true)
}
const detail = (id)=>{
  const result = axios.create({
    baseURL: `http://localhost:8000/post/questiondetail/`
  })
  result.post(`/${id}`,{withCredentials:'include'}).then((response) => {
    setDetails(response.data)
  })

 }


const answerdislike = (id) => {
  console.log('answerdislike',id)
  let use = user.username
  const result = axios.create({
    baseURL: `http://localhost:8000/post/answer_dislike/`
  })
  result.post(`/${id}`, { withCredentials: 'include',use}).then((response) => {
  })
  console.log('answerdislike', id);
  setLike(true)
}



 
useEffect(()=>{
  details.length > 0 && detail(details[0].id)
  setLike(false)
  console.log('dettatta',details)
  console.log('rerereree',question)
},[like,ans])
  
  return (
    <div>
      
      <Grid container>
      <Grid item xs={3} sx={{ marginTop: 5 }}>
        <Sidebar/>
        </Grid>
      <Grid item xs={8} sx={{ marginTop: 8,marginLeft:10 }}>
      {details.map((det)=>{
        return(
          <>
          <Typography component="div" variant='h5'>
            {det.title.replace(/<[^>]+>/g, '')}
           
            </Typography>
            <Typography component="div" variant='h5' sx={{marginTop:4,width: 700,}} >
            {det.body1.replace(/<[^>]+>/g, '')}
           
            </Typography>
            <Grid>
            <Box
      sx={{
        width: 900,
        height: 200,
        marginTop:5,
        backgroundColor: '#efebe9',
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >  
    
    <Typography sx={{marginLeft:8}}>
    {det.body2.replace(/<[^>]+>/g, '')}
    </Typography>
    <Typography sx={{marginRight:105}}>
   {det.like}  <span>vote</span>
   </Typography>
      </Box>
      </Grid>
      {det.questionss[0] &&
      <Grid>
                  
                  <h3 style={{marginLeft:75}}>Answers</h3>
                  {det.questionss.map((ans,index)=>{
                    console.log('iam');
                    console.log('answer12',ans.answer.replace(/<[^>]+>/g, ''))
                    return(
                      <Grid>
                        <Grid>
                        
                          </Grid>
                      <Box
                      sx={{
                        width: 900,
                        height: 200,
                        marginTop:5,
                        backgroundColor: '#efebe9',
                        '&:hover': {
                          opacity: [0.9, 0.8, 0.7],
                        },
                      }}
                    >
                      
                      <Typography sx={{margin:6,marginTop:5}}>
                        {ans.answer.replace(/<[^>]+>/g, '')}
                    </Typography>
                    <Stack sx={{marginTop:-5}}>
                    
                    <Button sx={{marginRight:110}}  onClick={() => answerlike(ans.id)} ><i class="fa-solid fa-sort-up" style={{fontSize:45}}></i></Button>  
                    <span style={{marginRight:825}}>{ans.like}</span>
                    <Button  sx={{marginRight:110}}  onClick={()=>answerdislike(ans.id)}><i class="fa-solid fa-sort-down" style={{fontSize:45}}></i></Button> 
                    </Stack>
                    </Box>
                    </Grid>
                    )
                    
                  })}
                   
                    
                    </Grid> 
      }
{/* */}


      <Grid>
        <form>
      <div className="editor" style={{marginTop:50}}>
        <CKEditor 
        editor = {ClassicEditor}
        onChange={(e,editor)=>{
          const data = editor.getData()
          setAnswer(data)
        }}
        />
    </div>
    <Grid items xs={2}>
    <Button sx={{marginTop:4,width:600}} variant='contained' onClick={answer_question}>Post your Answers</Button>
    </Grid>
    </form>
      </Grid>



            </>
        )
      })}
      </Grid>
    

      </Grid>
    </div>
  )
}

export default QuestionDetail
