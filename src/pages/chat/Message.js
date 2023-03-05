import React, { useEffect, useState,useContext } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import {TextField,Grid} from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Button from '@mui/material/Button';
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'
import { ProfileContext } from '../../context/ProfileContext';
 


function Message(props) {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState({});
  const [error, setError] = useState(null);
  const [chatmes,setChatmes] = useState('')
  const {user} = useContext(AuthContext)
  const [mes,setMes] = useState(false)
  const [backmes,setBackmes] = useState([])
  const {name,setName} = useContext(ProfileContext)
  const [formData, setFormData] = useState({
    sender: '',
    message: '',
  });
  const [trigger,setTrigger] = useState(false)


 const get_room=()=>{
  axios.get('http://localhost:8000/chat/get_room').then((response)=>{
    console.log('reeom gett',response.data)
  })
 }

 

 const get_message = (id) =>{
  console.log('chatttt function')
  const result = axios.create({
    baseURL: `http://localhost:8000/chat/view_message/`
  })
  result.get(`/${id}`, { withCredentials: 'include' }).then((response) => {
    console.log('message vannu makalee...', response.data)
    console.log('success');
    setMessages(response.data)
  })
 }

useEffect(()=>{
  get_message(props.name)
 
   console.log('msg get',props.name)
   setTrigger(false)

  
},[trigger])

  useEffect(()=>{
  
   
       
    
      get_message(props.name)
    
        setSocket(new W3CWebSocket(`ws://127.0.0.1:8000/ws/${props.name}channel/`))
        console.log(socket,"hey")
        socket.onopen = () => {
            console.log("WebSocket Client Connected");
          };

  socket.onmessage = (event) => {

    console.log('WebSocket message received122:',event.data);
    const value = JSON.parse(event.data)
    console.log('WebSocket message received:',value);
    // setMessages([...messages,value.message]);
    setTrigger(true)
 
  };

       socket.onclose = () => {
        console.log('WebSocket connection closed');
      };

      socket.onerror = (error) => {
        console.log('WebSocket error: ', error);
      };

      
    },[props.name,mes])


    const sendMessage = (event) => {
      console.log('send message')
      event.preventDefault();
      const messageInput = event.target.elements.message;
      console.log('send message1',messageInput)
      const message = messageInput.value;
      const sender = user.username
      console.log('room no2',name)
      const room = props.name
      console.log('room no',room)
      console.log('sendr',sender)
      console.log('send message2',message)
      socket.send(
        JSON.stringify({'message':message,'sender':sender,'room':room})
      );
      messageInput.value = '';
      setMes(!mes)
    }
  return (
    <div>
       {error && <p>{error}</p>}
       <Card sx={{ maxWidth: 800,height:500,overflowY:'scroll'}}>
        {console.log('roomnae',props.name)}
        {console.log('roomnae11',props.name)}
        {props.id &&
      <CardHeader sx={{backgroundColor:'#f3f2ef'}}
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        </Avatar>
      }
      title = {props.id}
      />
}
<div>

{/* {backmes.map((mes1)=>{

  return(
    <>
    
      <CardContent sx={{color:'blue',display:'flex',justifyContent: 'left',backgroundColor:'antiquewhite',maxWidth:'80px',marginTop:2}}>
      {mes1.message}
          </CardContent>  */}

{/* <CardContent sx={{color:'black',justifyContent:'left',display:'flex'}}>
{mes1.message}
    </CardContent> */}
  
    {/* </>
  )
})} */}


{messages.map((messag_e)=>{
  {console.log('real',messag_e.sender)}
  return(
    <>
      {user.username === messag_e.sender ?
       <CardContent sx={{color:'blue',display:'flex',justifyContent: 'right',backgroundColor:'antiquewhite',maxWidth:'80px',marginLeft:60,marginTop:2}}>
       {messag_e.message}
           </CardContent>:
            <CardContent sx={{color:'blue',display:'flex',justifyContent: 'left',color:'black',maxWidth:'80px',marginTop:2}}>
            {messag_e.message}
                </CardContent>
    }
       

{/* <CardContent sx={{color:'black',justifyContent:'left',display:'flex'}}>
{message.message}
    </CardContent> */}
  
  </>
  ) 
  
 
}
)}
</div>

   
  <form onSubmit={sendMessage} > 
  <Grid sx={{marginTop:50}}>
<TextField sx={{width:400,postion:'fixed'}} name="message">
    
</TextField>
<Button type="submit" sx={{marginLeft:3,postion:'fixed'}}>Send</Button>
{/* <SendIcon sx={{marginTop:52,marginLeft:3}}/> */}
</Grid>
</form>
         
    </Card>
    </div>
  )
}

export default Message
