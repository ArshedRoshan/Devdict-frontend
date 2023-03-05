import React, { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, Button, Typography } from '@mui/material'
import Sidebar from '../../components/sidebar/Sidebar';
import { CompanyListContext } from '../../context/CompanyListContext';
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea, CardActions } from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.gray,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));







function Applicants() {
  const [applicants, setApplicants] = useState([])
  const [processing, setProcessing] = useState([])
  const [accept, setAccept] = useState([])
  let { user } = useContext(AuthContext)

  const applicant_view = () => {

    const result = axios.create({
      baseURL: `http://localhost:8000/api/applicant_view/`
    })
    result.get(`/${user.user_id}`, { withCredentials: 'include' }).then((response) => {
      console.log('appliacant re', response.data)
      setApplicants(response.data)
    })
  }


  const process_true = (id) => {
    const result = axios.create({
      baseURL: `http://localhost:8000/api/process_list/`
    })
    result.get(`/${id}/${user.user_id}`, { withCredentials: 'include' }).then((response) => {
      console.log('response after', response.data)
      setApplicants(response.data)
      pending_table()
    })
    console.log('function incoked', id);
  }



  const pending_table = () => {
    console.log('function provoked')
    const result = axios.create({
      baseURL: `http://localhost:8000/api/process_list1/`
    })
    result.get(`/${user.user_id}`, { withCredentials: 'include' }).then((response) => {
      console.log('response after', response.data)
      console.log('success');
      setProcessing(response.data)
    })
  }

  const accept_true = (id) => {
    const result = axios.create({
      baseURL: `http://localhost:8000/api/accept/`
    })
    result.get(`/${id}/${user.user_id}`, { withCredentials: 'include' }).then((response) => {
      console.log('response accept true', response.data)
      setApplicants(response.data)
    })
    pending_table()
    accept_table()
  }


  const accept_table = () => {
    const result = axios.create({
      baseURL: `http://localhost:8000/api/accept1/`
    })
    result.get(`/${user.user_id}`, { withCredentials: 'include' }).then((response) => {
      console.log('response accept', response.data)
      console.log('success');
      setAccept(response.data)
    })
  }

  useEffect(() => {
    applicant_view()
    pending_table()
    accept_table()

  }, [])

  console.log('apli state proo', processing)
  return (
    <div>
      <Grid container>
        <Grid item xs={3} sx={{ marginTop: 5 }} >
          <Sidebar />
        </Grid>
        <Grid sx={{ marginTop: 15 }}>
        <Card sx={{ width: 1000,marginTop:7,boxShadow:5}}>
      <CardActionArea>
        <CardContent>
            <Typography variant='h5'>
              New Applicants
            </Typography>
            
            <table className="table table-hover,table-responsive-sm" style={{marginTop:40}}>
          <thead>
            <tr>
              <th scope="col">Full Name</th>
              <th scope="col">Qualification</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Processing</th>
              <th scope="col">Delete</th>
              
              
            </tr>
          </thead>
          <tbody style={{mb:5}}>
                {applicants && applicants.map((row) => {
                  //  {console.log('apli state',applicants)}
                  return (
                    <>
                    <tr style={{marginTop:50}}>
            <td style={{marginTop:10}}>{row.Full_Name}</td>
            <td style={{marginTop:10}}>{row.Qualification}</td>
            <td style={{marginTop:10}}>{row.Phone_number}</td>
            <td><Button onClick={() => process_true(row.id)} align="right"> Processing </Button></td>
            <td><Button onClick={() => process_true(row.id)} align="right"> Delete</Button></td>
            
            </tr>
                    </>
                  )

                })}





              </tbody>
            </table>
          </CardContent>
          </CardActionArea>
          </Card>



        

          <Card sx={{ width: 1000,marginTop:7,boxShadow:5}}>
      <CardActionArea>
      
        <CardContent>
              <Typography variant='h5'>
                Pending Applicants
              </Typography>
              <table className="table table-hover,table-responsive-sm" style={{marginTop:40}}>
          <thead>
            <tr>
              <th scope="col">Full Name</th>
              <th scope="col">Qualification</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Processing</th>
              <th scope="col">Delete</th>
              
            </tr>
          </thead>
          <tbody style={{mb:5}}>
                
    
  
                  
                  {processing && processing.map((row) => {
                    { console.log('apli state proofff', processing) }
                    return (
                      <>
                        <tr style={{marginTop:50}}>
                      <td style={{marginTop:10}}>{row.Full_Name}</td>
                      <td style={{marginTop:10}}>{row.Qualification}</td>
                      <td style={{marginTop:10}}>{row.Phone_number}</td>
                      <td><Button onClick={() => accept_true(row.id)} align="right"> Accept </Button></td>
                      <td><Button onClick={() => process_true(row.id)} align="right"> Delete</Button></td>
                      
                      </tr>
                        {/* <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {row.Full_Name}
                          </StyledTableCell>
                          <StyledTableCell align="right">{row.Qualification}</StyledTableCell>
                          <StyledTableCell align="right">{row.Phone_number}</StyledTableCell>
                          <Button><StyledTableCell onClick={() => accept_true(row.id)} align="right">Accept</StyledTableCell> </Button>
                          <StyledTableCell align="right">Delete</StyledTableCell>
                        </StyledTableRow> */}
                      </>
                    )
  
                  })}
  
                   </tbody>
                   </table>
                   </CardContent>
                   </CardActionArea>
                   </Card>
                   <Card sx={{ width: 1000,marginTop:7,boxShadow:5}}>
      <CardActionArea>
      
        <CardContent>
    <Typography variant='h5'>
      Confirmed Applicants
    </Typography>
    <table className="table table-hover,table-responsive-sm" style={{marginTop:40}}>
          <thead>
            <tr>
              <th scope="col">Full Name</th>
              <th scope="col">Qualification</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Accepted</th>
              
              
            </tr>
          </thead>
          <tbody style={{mb:5}}>
          {/* <StyledTableCell >Full Name</StyledTableCell>
          <StyledTableCell align="right">Qualification</StyledTableCell>
          <StyledTableCell align="right">Phone Number</StyledTableCell>
          <StyledTableCell align="right">Accepted</StyledTableCell> */}        
        {accept && accept.map((row) => {
          { console.log('apli state proofff', accept) }
          return (
            <>
               <tr style={{marginTop:50}}>
                      <td style={{marginTop:10}}>{row.Full_Name}</td>
                      <td style={{marginTop:10}}>{row.Qualification}</td>
                      <td style={{marginTop:10}}>{row.Phone_number}</td>
                      <td><Button onClick={() => accept_true(row.id)} align="right"> Accepted </Button></td>
                      {/* <td><Button onClick={() => process_true(row.id)} align="right"> Delete</Button></td> */}
                      
                      </tr>
              {/* <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.Full_Name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.Qualification}</StyledTableCell>
                <StyledTableCell align="right">{row.Phone_number}</StyledTableCell>
                <StyledTableCell align="right">Delete</StyledTableCell>
              </StyledTableRow> */}
            </>
          )

        })}





     </tbody>
     </table>
     </CardContent>
     </CardActionArea>
     </Card>
 
          




        </Grid>
      </Grid>
    </div>
  )
}

export default Applicants
