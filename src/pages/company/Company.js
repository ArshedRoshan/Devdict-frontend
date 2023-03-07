import React, { useEffect,useState,useContext } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Grid } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";
import Application from '../company/Application';
import { CompanyListContext } from '../../context/CompanyListContext';

function Company() {
const {company,setCompany} = useContext(CompanyListContext)

const company_list = (e)=>{
  axios.get('https://devdict.online/api/company_list').then((response)=>{
    setCompany(response.data)
    console.log('compnay',response.data);
  })
}

useEffect(()=>{
company_list()
},[])
const profilepicture = company[0]?.pro && company[0].pro[0].profile_picture
console.log('profile',profilepicture)
let img_name = profilepicture && profilepicture
  return (
    <div>
      <Grid container>
        <Grid item xs={2} sx={{ marginTop: 5 }} >
        <Sidebar />
        </Grid>
        <Grid sx={{ marginTop: 10,display:'flex'}}>

        {company.map((comp) => {
           console.log('commm11',comp.pro)
         console.log('commm',comp.pro.profile_picture)
  
      return(
        <Card sx={{height:500,width: 345,marginLeft:10}}>
          {img_name &&
          <>
          {profilepicture && img_name !== null ?
              <CardMedia
              component="img"
              height="140"
              image={img_name}
              alt="green iguana"/>:
              <CardMedia
              component="img"
              height="140"
              image={require("../../static/blog-2.jpg")}
              alt="green iguana"/>
              
              }
              </>
            }
               
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                 Company Name:{comp.company_name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Posted by:{comp.first_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 Description: {comp.Describe_company}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 seeking for: {comp.hiring_for}
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button size="small">Share</Button> */}
                <Application name1='Easy Apply'><Button size="small">Easy Apply</Button></Application>
              </CardActions>
            </Card>
        
        
        
        
                    )


     

          })}
        
        </Grid>
       </Grid>
    </div>
  )
}

export default Company
