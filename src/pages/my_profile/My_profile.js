import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { Avatar } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useContext,useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { PostlistContext } from '../../context/PostlistContext';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar'
import { useNavigate,useParams } from 'react-router-dom';
import { ProfileContext } from '../../context/ProfileContext';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Add_dp from '../my_profile/Add_dp'
import { UserListContext } from '../../context/UserListContext';
import { red } from '@mui/material/colors';


function My_profile({route}) {
    const theme = useTheme();
    const [show,setShow] = React.useState('photos');
    const [photoBt,setPbt] = React.useState('contained');
    const [modBt,setMbt] = React.useState('outlined');
    const [qnBt,setQnbt] = React.useState('outlined');
    const {user} = useContext(AuthContext)
    const [profile,setProfile] = useState(null)
    const { users, setUsers } = useContext(UserListContext)
    const[bool,setBool] = useState(false)
    const[forpost,setFor] = useState(true)
    const [save,setSave] = useState([])
   
    const handlePhotobt=()=>{setShow('photos');setPbt('contained');setMbt('outlined');setQnbt('outlined');setFor(true)}

    const handleModbt=()=>{setShow('mods');setMbt('contained');setQnbt('outlined');setPbt('outlined')}

    const handleQnbt=()=>{setShow('qns');setQnbt('contained');setMbt('outlined');setPbt('outlined');setFor(false)}

    let arr;    
  

    const handleuse=()=>{
        console.log(user.name);
    }

    const get_save = ()=>{
      axios.get(`http://localhost:8000/post/view_saved/${user.user_id}`).then((response)=>{
        console.log('save res',response.data)
        setSave(response.data)
        
      })
      
    }

    const getPosts=()=>{
      const result = axios.create({
        baseURL: `http://localhost:8000/api/my_profile/`
      })
      result.get(`/${user.user_id}`, { withCredentials: 'include'}).then((response) => {
        console.log('response', response.data)
        setProfile(response.data)
        
      })
    }
    console.log('profile',profile)
    React.useEffect(() =>{
      getPosts()
      get_save()
      setBool(true)
      {console.log('myprofile',users)}
       
    }, [])
    
 
  return (
    <div>
      <Grid container sx={{backgroundColor:'#f3f2ef'}}>
        <Grid item xs={2} sx={{ marginTop: 5 }} >
        <Sidebar />
        </Grid>

       
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" >
        
        <Grid sx={{ mt:10,borderRadius:2,height:"85vh","&::-webkit-scrollbar": {
              width: 4
              },
              "&::-webkit-scrollbar-track": {
            //   backgroundColor: "#454545"
              },
              "&::-webkit-scrollbar-thumb": {
            //   backgroundColor: "#661414",
              borderRadius: 7
              }  
                 }}>
            
               <Stack direction="colomn" justifyContent="space-around" sx={{border:"1px",borderRadius:2,height:"30vh",m:0.5,p:1}}>
               {profile && profile[0].pro.map((dp)=>{
                   let img_name = dp.profile_picture
                     return(

                     
               <Stack direction="row" spacing={2} >
               <Avatar  sx={{height:"22vh",width:"22vh"}} alt="Arshed" src={img_name} />
                
               <Typography sx={{color:"grey"}}>
                <h3><p> {user.username}</p></h3>
             Iam a Software developer working as intern in brototype<br></br> 
                <Button sx={{mt:3}} variant="contained" onClick={handleuse}>Edit Profile</Button>
                &nbsp;<Button sx={{mt:3}}  color="error" onClick={handleuse}>Logout</Button>
               </Typography>
              
               </Stack>
                  ) })} 
                  {console.log('my fol',profile && profile[0].follow)}
                <Stack direction="colomn" justifyContent="flex-end">
                  {profile && 
                  <>
                  <Typography sx={{mt:5,color:"grey"}}>
                  <h5>Followers</h5>
                  &nbsp;&nbsp;&nbsp;&nbsp;{profile[0].follower}</Typography>

                  <Typography sx={{mt:5,ml:2,color:"grey"}}>
                  <h5>Following</h5>
                  &nbsp;&nbsp;&nbsp;&nbsp;{profile[0].follow}</Typography>
                  </>
                  }
                    

                        {/* <Typography sx={{mt:5,ml:2,color:"grey"}}>
                        <h5>Posts</h5>
                        &nbsp;&nbsp;&nbsp;&nbsp;1</Typography> */}
                </Stack>

               </Stack>

               {/* <Grid direction="row" sx={{border:"1px",borderRadius:2,height:"5vh",m:0.5,backgroundColor:"#303030"}}>
                
                </Grid> */}

               <Grid direction="row" sx={{border:"1px",borderRadius:2,pb:1,m:0.5}}>
             <Add_dp name='change profile'>  <Button n sx={{ mx: 'auto'}}>Change Profile</Button> </Add_dp>
                <Stack direction="colomn" spacing="4px" justifyContent="center" sx={{pt:2}}>
                    <Button variant={photoBt} color="error" sx={{mr:1}} onClick={handlePhotobt}>Posts</Button>
                    <Button variant={modBt} color="secondary" onClick={handleModbt}>Questions</Button>
                    &nbsp;&nbsp;<Button variant={qnBt} onClick={handleQnbt} >Saved </Button>
                </Stack>
                <br></br>


                <ImageList sx={{overflowY:"hidden",m:1,pb:4,borderRadius:2}} cols={4} rowHeight={164}>
       {profile && profile[0].users.map((item,index) => {
          let img_name = item.image
            
          return(
            <>
            {forpost ?
              <ImageListItem key={item.img} sx={{pb:1,marginLeft:3}}>
              { img_name !== null ? 
           <img
             src={img_name}
             srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
             alt={"hjhjhj"}
             loading="lazy"
           /> :  <Avatar sx={{bgcolor: red[500]}} aria-label="recipe"></Avatar> 
           
         }
         
         </ImageListItem> : 
         <>
         {console.log('save22',save)}
         {save.map((sav)=>{
          
          {console.log('save333',sav.saved_user[0].saved_question)}
          
              <Card sx={{ display: 'flex',width:1000 }}>
              <Box sx={{ display: 'flex' }}>
             <CardContent sx={{ flex: '1 0 auto',display:'flex' }}>
             </CardContent>
             <Typography>
              {sav.saved_user[0].saved_question}
             </Typography>
             <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
             </Box>
           </Box>
         </Card>
         
         })}
        
    </>
       }
             
             </> 
            
           
          ) 
       
        }
           )
      }
      
    </ImageList>

               </Grid>

        </Grid>
      </Container>
    </React.Fragment>
  

    
        </Grid>
    </div>
  )

 



}


export default My_profile

