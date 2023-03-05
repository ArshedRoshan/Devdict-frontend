import React, { useState, useEffect, useRef, useContext } from "react";
import { Grid } from '@mui/material'
import Sidebar from '../../components/sidebar/Sidebar'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import axios from 'axios'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import {AuthContext} from '../../context/AuthContext'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Message from "./Message";
import { UserListContext } from '../../context/UserListContext';
import { ProfileContext } from "../../context/ProfileContext";

function Chat(props) {
    const [chatlist,setChatlist] = useState([])
    const {user} = useContext(AuthContext)
    const { users, setUsers } = useContext(UserListContext)
    const {name,setName} = useContext(ProfileContext)
    // const [name,setName] = useState('')
    const [id,setId] = useState(null)
    const [room1,setRoom1] = useState('')

    const get_room = () =>{
      axios.get('http://localhost:8000/chat/get_room').then((response)=>{
        console.log('rrooom',response.data)
      })
    }


    const fo_user = ()=>{
     
         axios.get('http://localhost:8000/api/chat_users').then((response)=>{
            console.log('chat_list',response.data)
            setChatlist(response.data)
        })
      
        
    }

  const chat_room = (username) =>{
    console.log('chatrooommm')
    console.log('sender',user.username)
    console.log('receiver',username)
    setName(user.user_id)
    console.log('name',name)
    let sender = user.username
    let reciever = username
    let items = {sender:sender,reciever:reciever,name}
    console.log('items',items)
    if(name != ''){
    axios.post('http://localhost:8000/chat/create_room',items).then((response)=>{
      console.log('rooom res',response.data)
      console.log('rooom res1212',response.data.id)
      setRoom1(response.data.id)
    })
  }
      
    
   
   
  }


    useEffect(()=>{
       fo_user()
    },[name])
  return (
    <div>
     
       <Grid container sx={{backgroundColor:'#f3f2ef'}}>
       <Grid item xs={2.5} sx={{ marginTop: 5 }} >
          <Sidebar />
        </Grid>
        <Grid item xs={3}  sx={{ marginTop: 10 }}>
        <Card sx={{ maxWidth: 800}}>
      <CardHeader sx={{backgroundColor:'#f3f2ef'}}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          </Avatar>
        }
        title = {user.username}
        />
      
     
      <CardContent>
        {/* {chatlist.map((chat)=>{ */}
            {/* // console.log('chatprofile',chat.pro[0].profile_picture)
            // let img_name = chat.pro[0].profile_picture.replace(
            //     "/frontend/src/static/",
            //     ""
            //   );
        //     return(
        //         <>
                
                
        //          <List  component="nav" aria-label="mailbox folders">
        //              <ListItem>
        //              <Button onClick={() =>{setId(chat.username);chat_room(chat.username)}}>
        //                  {console.log('chat id',name)}
        //                  {/* { img_name ? <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={require("../../static/" + img_name)}></Avatar> :
        //                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
        //                  } */}
                         
        {/* //                  </Button>
        //              <ListItemText sx={{marginLeft:2}} primary={chat.follower} />
        //          </ListItem>
        //          <Divider sx={{color:'black'}}/>
        //          </List>
                
                
               
        //         </>
        //      ) */}
            
            
        {/* // })} */} 
        {chatlist.map((chat)=>{
          console.log('chatttt',chat.following.username)
          { console.log('checkkkk',room1)}
          return(
            <>
           {user.username !== chat.following.username &&
            <List  component="nav" aria-label="mailbox folders">
            <ListItem>
            <Button onClick={() =>{setId(chat.following.username);chat_room(chat.following.username)}}>
                {console.log('chat id',name)}
                {console.log('chat id111',id)}
               
                   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
                 
                  </Button>
              <ListItemText sx={{marginLeft:2}} primary={chat.following.username} />
        </ListItem>
     <Divider sx={{color:'black'}}/>
         </List>
          }
          </>
              
            
           
                
          )
        })}
      </CardContent>      
    </Card>

   



    </Grid>
    <Grid item xs={4.5}  sx={{ marginTop: 10,marginLeft:10 }}>
       <Message id={id} name={room1}/>
    </Grid>

    
        </Grid>
    </div>
  )
}

export default Chat
