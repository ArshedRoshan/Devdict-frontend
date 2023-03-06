import React, { useContext,useEffect } from 'react'
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from 'react-router-dom'
import Post from '../../pages/post/Post'
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { UserListContext } from '../../context/UserListContext';
import { Grid } from '@mui/material'
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';

const drawerWidth = 240;


function Sidebar(props){
  let{user} = useContext(AuthContext)
  let{setUser,setAuthTokens}=useContext(AuthContext)
  let {users,setUsers}=useContext(UserListContext)
  const navigate = useNavigate()

  let logoutUser = ()=>{
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens');
    navigate('/')
  }
  // useEffect(()=>{
  //  console.log('todp',users)
  // },[])
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {/* {['box', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
        {user.Account_type == 'personal' ? 
          <ListItem key='helo' disablePadding>
          <ListItemButton> 
            <ListItemText primary={user.username} onClick={()=>navigate('/home')} />
          </ListItemButton>
        </ListItem>:
         <ListItem key='helo' disablePadding>
         <ListItemButton> 
           <ListItemText primary={user.company_name} onClick={()=>navigate('/home')} />
         </ListItemButton>
       </ListItem>
      }
       
          <ListItem key='Question' disablePadding>
            <ListItemButton> 
             <ListItemText primary='Question' onClick={()=>navigate('/questionview')} /> 
            </ListItemButton>
          </ListItem>
         
      </List>
      <Divider />
      <List>
        {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
        
        {/* {console.log('side con',users.Account_type)} */}
       {user.Account_type == 'personal' ?
        <ListItem key='job' disablePadding>
        <ListItemButton> 
         <ListItemText primary='Jobs' onClick={()=>navigate('/company')} /> 
        </ListItemButton>
      </ListItem>:
              <ListItem key='Applicants' disablePadding>
              <ListItemButton> 
              <ListItemText primary='Applicants' onClick={()=>navigate('/applicants')} /> 
              </ListItemButton>
              </ListItem>
      }
         

          <ListItem key='chat' disablePadding>
            <ListItemButton> 
             <ListItemText primary='Chat' onClick={()=>navigate('/chat')} /> 
            </ListItemButton>
          </ListItem>

          <ListItem key='Log out' disablePadding>
            <ListItemButton> 
             <ListItemText primary='Log out' onClick={logoutUser} /> 
            </ListItemButton>
          </ListItem>
          
      </List>
    </div>
  );

  // const container = window !== undefined ? () => window().document.body : undefined

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

 
  

 
  


  return(
    <div>
      <>
      <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height:50
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
         <Typography sx={{ fontSize: 14,marginLeft:110 }} color="text.secondary" gutterBottom>
       <Grid justifyContent={'space-between'} sx={{ marginRight: 9,display:'flex' }}>
          {users.map((dp)=>{
           let img_name
          if (user.username == dp.username){
            if (dp.pro.length !== 0){
            //   console.log('iiiiiiiiiiiiii',dp.pro[0]. profile_picture);
                img_name = dp.pro[0].profile_picture
            // console.log('navdp',img_name);
            }
            // else{
            //   img_name=null
            //   console.log('no nav dp',img_name);
            // }
          }
          if(user.username == dp.username){
            return(
                <>
                   {img_name == null ?
                    <Grid>    
                    <Button onClick={()=>navigate('/my_profile')} > <Avatar  sx={{bgcolor: red[500]}} /> </Button>
                    </Grid> :
                   <Grid>    
                    <Button onClick={()=>navigate('/my_profile')} > <Avatar   sx={{bgcolor: red[500]}} src={img_name} /></Button> 
                    </Grid>  
             }
              </>     
            )
            }
        })}
      
  {/* <Button onClick={()=>navigate('/my_profile')} > <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar></Button> */}
  <h5 style={{marginTop:'2px'}}>{user && <p>{user.username}</p>} </h5>
  </Grid>
  </Typography>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box >
      </Box>

      </>
    </div>
  );
}

export default Sidebar;

