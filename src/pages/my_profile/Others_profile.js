import React from 'react'
import { UserListContext } from '../../context/UserListContext';
import { useContext,useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { PostlistContext } from '../../context/PostlistContext';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar'
import { useNavigate,useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { Avatar } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ProfileContext } from '../../context/ProfileContext';
import { red } from '@mui/material/colors';

function Others_profile() {
    const [show,setShow] = React.useState('photos');
    const [photoBt,setPbt] = React.useState('contained');
    const [modBt,setMbt] = React.useState('outlined');
    const [qnBt,setQnbt] = React.useState('outlined');
    const {user} = useContext(AuthContext)
    const {profile,setProfile} = useContext(ProfileContext)
    const { users, setUsers } = useContext(UserListContext)
    const[bool,setBool] = useState(false)
    const [follow,setFollow] = useState('follow')
    const [follow1,setFollow1] = useState('')
    const navigate = useNavigate()
   
    const handlePhotobt=()=>{setShow('photos');setPbt('contained');setMbt('outlined');setQnbt('outlined')}

    const handleModbt=()=>{setShow('mods');setMbt('contained');setQnbt('outlined');setPbt('outlined')}

    const handleQnbt=()=>{setShow('qns');setQnbt('contained');setMbt('outlined');setPbt('outlined')}

    let arr;    
  
    React.useEffect(() =>{
      check_follower()
      console.log('profile111',profile[0].id)
       
    },[bool])
    
    const followuser = (username) => {
      let following_username = username
      let use = user.username
      console.log('usersss',profile)
      setFollow('following')
      // console.log('following_username', following_username)
      let data = { follower_username: use, following_username: following_username }
      axios.post('https://devdict.online/api/follow', data).then((response) => {
        console.log('follow res',response.data)
        setProfile(response.data)
      })
  
    }

    // const others_profile=(id)=>{
    //   console.log('other111',id)
    //   const result = axios.create({
    //     baseURL: `http://localhost:8000/api/my_profile/`
    //   })
    //   result.get(`/${id}`, { withCredentials: 'include'}).then((response) => {
    //     console.log('other_profile', response.data)
    //     setProfile(response.data)
    //     navigate('/others_profile')
    //   })
    // }

    const check_follower = ()=>{
      console.log('qqqqqqqqqqqqqqqqqqqqqqq1',);
      console.log('iam a check')
      let follower = user.user_id
      let following = profile[0].id
      {console.log('current',user.username)}
      {console.log('other',profile[0].username)}
      let detail
      detail = {following,follower}
      axios.post('https://devdict.online/api/follow_check',detail).then((response)=>{
          console.log('check_follow',response.data)
          setFollow(response.data)
          }) 
     }
    
    //  React.useEffect(() => {
    //   const storedDetails = JSON.parse(localStorage.getItem("profile"));
    //   if (storedDetails) {
    //     setProfile(storedDetails);
    //   }
    // }, []);
    const handleuse=()=>{
        console.log(user.name);
    }


    return(
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

                     
               <Stack direction="row" spacing={2} sx={{marginLeft:8}} >
                {img_name != null ?
                <Avatar  sx={{height:"22vh",width:"22vh"}}  src={img_name} /> :
                <Avatar   sx={{bgcolor: red[500]}} /> 

              }
               
                {/* <Typography>
                {profile[0].username}
                </Typography> */}
               {/* <Typography sx={{color:"grey"}}>
                <h3>{ <p> {dp.username}</p>}</h3>
                
             Iam a Software developer working as intern in brototype<br></br> 
                <Button sx={{mt:3}} variant="contained" onClick={handleuse}>Edit Profile</Button>
                &nbsp;<Button sx={{mt:3}}  color="error" onClick={handleuse}>Logout</Button>
               </Typography> */}
              <Typography>
                  {profile[0].username}
                </Typography>
                {console.log('to know',profile[0].username)}
               </Stack>
                  ) })}  
                <Stack direction="colomn" sx={{marginRight:50}}>
                    <Typography sx={{mt:5,color:"grey"}}>
                        <h5>Followers</h5>
                        &nbsp;&nbsp;&nbsp;&nbsp;{profile[0].follower}
                        </Typography>
                        <Typography sx={{mt:5,ml:2,color:"grey"}}>
                        <h5>Following</h5>
                        &nbsp;&nbsp;&nbsp;&nbsp;{profile[0].follow}
                        </Typography>
                       
                        

                        {/* <Typography sx={{mt:5,ml:2,color:"grey"}}>
                        <h5>Posts</h5>
                        &nbsp;&nbsp;&nbsp;&nbsp;1</Typography> */}
                </Stack>
               </Stack>
               <Button variant="contained" onClick={() => {followuser(profile[0].username);setBool(!bool)}} sx={{height:30,marginRight:50}}>{follow}</Button>
               {/* <Grid direction="row" sx={{border:"1px",borderRadius:2,height:"5vh",m:0.5,backgroundColor:"#303030"}}>
                
                </Grid> */}

               <Grid direction="row" sx={{border:"1px",borderRadius:2,pb:1,m:0.5}}>
                <Stack direction="colomn" spacing="4px" justifyContent="center" sx={{pt:2}}>
                    <Button variant={photoBt} color="error" sx={{mr:1}} onClick={handlePhotobt}>Posts</Button>
                    <Button variant={modBt} color="secondary" onClick={handleModbt}>Questions</Button>
                    &nbsp;&nbsp;<Button variant={qnBt} onClick={handleQnbt}>Saved</Button>
                </Stack>
                <br></br>


                <ImageList sx={{overflowY:"hidden",m:1,pb:4,borderRadius:2}} cols={4} rowHeight={164}>
      {/* {profile && profile[0].users.map((item,index) => {
          let img_name = item.image.replace(
            "/frontend/src/static/",
            ""
          );
            
          return( */}
          {/* ) */}
          {profile[0].users.map((profi)=>{
             let img_name = profi.image
              {console.log('imhname',img_name)}
             
            return(
                <ImageListItem key={profi.img} sx={{pb:1,marginLeft:3}}>
                <img
                  src={img_name}
                  srcSet={`${profi.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={"hjhjhj"}
                  loading="lazy"
                />
              </ImageListItem>
              
            )
          })}
         
        
          
          
         
         
       
        {/* }
           )
      } */}
      
    </ImageList>

               </Grid>

        </Grid>
      </Container>
    </React.Fragment>
  

    
        </Grid>


   </div>
   )
}

export default Others_profile
