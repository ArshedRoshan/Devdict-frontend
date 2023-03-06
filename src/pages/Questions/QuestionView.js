import { blue } from '@mui/material/colors'
import axios from 'axios'
import React, { useEffect, useState,useContext } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate,Link } from 'react-router-dom';
import { Grid } from '@mui/material'
import { AuthContext } from "../../context/AuthContext";
import { QuestionContext } from '../../context/QuestionContext';
import { useTheme } from '@mui/material/styles';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';


function QuestionView() {
    const navigate = useNavigate()
    let { user } = useContext(AuthContext)
    const {question,setQuestion} = useContext(QuestionContext)
    const {details,setDetails} = useContext(QuestionContext)
    const [like, setLike] = useState(false)
    let use = user.username
    let user1 = user.user_id


    const view = (e)=>{
        axios.get('https://devdict.online/post/questionview').then((response)=>{
            setQuestion(response.data)
            
        })
    }

    const likeuser = (id) => {

      const result = axios.create({
        baseURL: `https://devdict.online/post/question_likes/`
      })
      result.post(`/${id}`, { withCredentials: 'include',use}).then((response) => {
      })
      setLike(true)
    }


    const dislikeuser = (id) => {

      const result = axios.create({
        baseURL: `https://devdict.online/post/dislike/`
      })
      result.post(`/${id}`, { withCredentials: 'include',use}).then((response) => {
      })
      setLike(true)
    }



    const detail = (id,e)=>{
    const result = axios.create({
      baseURL: `https://devdict.online/post/questiondetail/`
    })
    result.post(`/${id}`,{withCredentials:'include'}).then((response) => {
      setDetails(response.data)
    })
    navigate('/questiondetail')
   }
    
  const save = (id) =>{
    console.log('save function',user.user_id)
 
    let saved_question = question.id
    console.log('save_question',question.id)
    let save = {user1:user,saved_question:saved_question}
    axios.post('https://devdict.online/post/save_question',{
      user:user.user_id,
      saved_question:id
    }).then((response)=>{
      console.log(response.data)
    })
  }

    useEffect(()=>{
        view()
        setLike(false)
    },[like])
   
const theme = useTheme();



  return (
    <div>
       <Grid container>
       <Grid item xs={3} sx={{ marginTop: 5 }} >
          <Sidebar />
        </Grid>

        <Grid  sx={{ marginTop: 10,width:'100%'}}>
       <Link to={'/question'}> <Button sx={{marginLeft:120}} variant="contained">Ask Questions</Button></Link>
        <Grid>
              <h2>All Questions</h2>
              <hr style={{width: 1223}}/> 
          </Grid>
          {question.map((row)=>{
            return(
              <>
              <Card sx={{ display: 'flex',marginTop: 5,width:1000 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            
                <CardContent sx={{ flex: '1 0 auto',display:'flex'}}>
                <Grid>
                  <Stack spacing={0.5}>
                <Button onClick={() => likeuser(row.id)} ><i class="fa-solid fa-sort-up" style={{fontSize:45}}></i></Button> 
                <span>{row.like}</span>
                <Button onClick={()=>dislikeuser(row.id)} ><i class="fa-solid fa-sort-down" style={{fontSize:45}}></i></Button>
                 
                 <Button onClick={()=>save(row.id)}>
                <BookmarkBorderIcon />
                </Button>
                </Stack>
                </Grid>
                <Grid>
                  <Typography component="div"  variant="h5" sx={{marginRight:75}}>
                  <div onClick={()=>detail(row.id)}>
                  {row.title}
                  </div>
                  </Typography>
                  <Typography variant="subtitle1" sx={{marginLeft:'5em'}} component="div">
                    {row.body1.replace(/<[^>]+>/g, '')}
                    {/* {
                      console.log(row.body1)
                    } */}
                  </Typography>
                  </Grid>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  <IconButton aria-label="previous">
                    {/* {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />} */}
                  </IconButton>
                  <IconButton aria-label="play/pause">
                    {/* <PlayArrowIcon sx={{ height: 38, width: 38 }} /> */}
                  </IconButton>
                  <IconButton aria-label="next">
                    {/* {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />} */}
                  </IconButton>
                  
                </Box>
                {/*  */}
              </Box>
            </Card>
            </>
            
            )
          })}
   
          
        </Grid>

       </Grid>
    </div>
  )
}

export default QuestionView




    
   
    
   