import React,{ useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import {Bar, Pie} from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import BusinessIcon from '@material-ui/icons/Business';
// import PostIcon from '@mui/icons-material/Post';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Card from '@material-ui/core/Card';


Chart.register({
    id: 'category',
    afterSetDimensions: function(scale) {
      if (this.chart.options.categoryPercentage) {
        scale.width = scale.maxWidth;
      }
    },
    defaults: {
      ticks: {
        callback: function(value, index, values) {
          var maxLabelLength = 10;
          if (value.length > maxLabelLength) {
            return value.substr(0, maxLabelLength - 2) + '...';
          } else {
            return value;
          }
        }
      }
    },
    initialize: function() {}
  });
 
  


function Admin_home1() {
    const{user} = useContext(AuthContext)
    const [chartData, setChartData] = useState({});
    const [count1,setCount] = useState([])
    useEffect(() => {
        const getData = async () => {
          axios.get('http://localhost:8000/api/count').then((response)=>{
            setCount(response.data)
            console.log('countt',response.data)
            
          })
          const data = {
            labels: ['Personal','Company'],
            datasets: [
              {
                label: 'Total count',
                data: count1,
                backgroundColor: ['#17a2b8',
                                    '#ffc107'
              ],
                // borderColor: 'rgba(255, 99, 132, 1)',
                width:10,
                
                borderWidth: 1,
              },
            ],
          };
    
          setChartData(data);
        };
    
        getData();
      }, []);
    
  return (
    <div style={{height:'100%'}}>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
         <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
        <Avatar  sx={{bgcolor: red[500]}} /> 
        </IconButton>
         
        <Typography>{user.username}</Typography>
        </Toolbar>
         </AppBar>
         </Box> 
         
       
    </div>
  )
}

export default Admin_home1



{/* <div style={{width: 500, height: 500}}>
{chartData.labels && chartData.datasets && (
  <Pie data={chartData} />
)}
{console.log('kk',count1)}
</div> */}