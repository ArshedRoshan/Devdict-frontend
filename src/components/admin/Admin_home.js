import React, { useContext, useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../../context/AuthContext';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions, CardHeader } from '@mui/material';
import { Grid } from '@mui/material'
import axios from 'axios'
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { UserListContext } from '../../context/UserListContext';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ReactPaginate from 'react-paginate'
import { PostlistContext } from '../../context/PostlistContext';
import { Bar, Pie } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
// import { DataGrid } from '@mui/x-data-grid';

function Admin_home() {
  const { user } = useContext(AuthContext)
  const [admin_user, setAdmin] = useState([])
  const [com, setCom] = useState([])
  const [block, setBlock] = useState('block')
  const [posblock, setPosb] = useState('block')
  const [bool, setBool] = useState(false)
  const [bool1, setBool1] = useState(false)
  const [Account_type, setAccount] = useState('Dashboard')
  const [pos, setPos] = useState([])
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [post11, setPost1] = useState([])
  const [chartData, setChartData] = useState({});
  const [chartData1, setChartData1] = useState({})
  const [count1, setCount] = useState([])
  const [chart, setChart] = useState(false)
  const [pcount, setPcount] = useState([])
  const [qcount, setQcount] = useState([])
  const [likecount, setLike] = useState([])
  const usersPerpage = 3
  const pagevisited = pageNumber * usersPerpage
  const page_count = Math.ceil(admin_user.length / usersPerpage)

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const style = {

    marginTop: '30px'

  }
  const get_user = () => {
    axios.get('http://localhost:8000/api/admin_user').then((response) => {
      setAdmin(response.data)
      // console.log('blo',response.data)
    })
  }
  const get_com = () => {
    axios.get('http://localhost:8000/api/admin_comp').then((response) => {
      setCom(response.data)
    })
  }

  const block_user = (id) => {
    axios.post(`http://localhost:8000/api/block_user/${id}`).then((response) => {
      // console.log('blocked_user',response.data)
      setBlock('unblock')
      // setBlock('Unblock')

    })
  }

  const block_post = (id) => {
    axios.post(`http://localhost:8000/post/blockpost/${id}`).then((response) => {
      // console.log('blocked_user',response.data)
      setPosb('unblock')
      // setBlock('Unblock')

    })
  }
  async function fetchData() {
    const response = await axios.get('http://localhost:8000/post/admin_post');
    setPos(response.data.results);
    setNextPage(response.data.next);
    setPrevPage(response.data.previous);
  }
  const view = () => {
    console.log('function running')
    axios.get('http://localhost:8000/post/postview').then((response) => {
      setPost1(response.data)
      let a = 4 + 3;
      console.log('111srrr', response.data)


    })
  }
  const postCount = () => {
    axios.get('http://localhost:8000/post/postcount').then((response) => {
      setPcount(response.data)
    })
    axios.get('http://localhost:8000/post/questioncount').then((response) => {
      setQcount(response.data)
    })
  }


  const getData = async () => {
    axios.get('http://localhost:8000/api/count').then((response) => {
      setCount(response.data)
      console.log('countt', response.data)
      setChart(true)
    })
  }
  const getData1 = async () => {
    axios.get('http://localhost:8000/post/popularposts').then((response) => {
      setLike(response.data)
      console.log('likeeeee', response.data)
    })
  }
  useEffect(() => {
    const data = {
      labels: ['Personal', 'Company'],
      datasets: [
        {
          label: 'Total count',
          data: count1,
          backgroundColor: ['#17a2b8',
            '#ffc107'
          ],
          // borderColor: 'rgba(255, 99, 132, 1)',
          width: 10,

          borderWidth: 1,
        },
      ],
    };

    setChartData(data);


    const data1 = {
      labels: likecount.b,
      datasets: [
        {
          label: 'Total Like',
          data: likecount.a,
          backgroundColor: ['#17a2b8'],
          // borderColor: 'rgba(255, 99, 132, 1)',
          width: 10,

          borderWidth: 1,
        },
      ],
    };

    setChartData1(data1);


  }, [count1, likecount]);

  useEffect(() => {
    getData()
    getData1()
  }, [])


  useEffect(() => {
    console.log('kikikik')
    get_user()
    get_com()
    fetchData()
    view()
    postCount()
  }, [bool, bool1])



  function handlePrevPage() {
    async function fetchData() {
      const response = await axios.get(prevPage);
      setPos(response.data.results);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    }
    fetchData();
  }

  function handleNextPage() {
    async function fetchData() {
      const response = await axios.get(nextPage);
      setPos(response.data.results);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    }
    fetchData();
  }

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  return (
    <div>
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
              <Avatar sx={{ bgcolor: red[500] }} />
            </IconButton>

            <Typography>{user.username}</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container>
        <Grid item xs={2}>

        </Grid>
        <Grid item xs={7.5} >

          {Account_type === 'personal' &&
            <Card sx={{ width: 1000, marginTop: 7 }}>
              <CardActionArea>

                <CardContent>
                  <table className="table table-hover,table-responsive-sm" style={{ marginTop: 40 }}>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Block</th>


                      </tr>
                    </thead>
                    <tbody style={{ mb: 5 }}>
                      {admin_user.slice(pagevisited, pagevisited + usersPerpage).map((ad) => {
                        //  console.log('add',ad)
                        return (
                          <>
                            {user.username != ad.username &&
                              <>

                                <tr style={{ marginTop: 50 }}>
                                  <th scope="row" style={{ marginTop: 10 }}>{ad.id}</th>
                                  <td style={{ marginTop: 10 }}>{ad.first_name}</td>
                                  <td style={{ marginTop: 10 }}>{ad.last_name}</td>
                                  <td style={{ marginTop: 10 }}>{ad.username}</td>
                                  <td style={{ marginTop: 10 }}>{ad.email}</td>
                                  <td style={{ marginTop: 10 }}>{ad.phone_number}</td>
                                  {/* { console.log('typeeeoff',ad.is_active)} */}
                                  {ad.is_active == true ?
                                    <Button className="btn btn-danger" role="group" style={{ marginTop: 10 }} onClick={() => { block_user(ad.id); setBool(!bool) }}>Block</Button> :
                                    <Button className="btn btn-primary" role="group" style={{ marginTop: 10 }} onClick={() => { block_user(ad.id); setBool(!bool) }}>Un block</Button>
                                  }
                                </tr>


                              </>
                            }


                          </>

                        )
                      })}


                    </tbody>
                    <div style={{ paddingTop: '10px', marginTop: '2em' }}>


                      <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={page_count}
                        onPageChange={changePage}
                        containerClassName={'pagination justify-content-center '}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        activeClassName={'active'}
                        previousClassName={'page-item'}
                        nextClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextLinkClassName={'page-link'}
                      // sx = {{style}}

                      />
                    </div>
                  </table>
                </CardContent>
              </CardActionArea>
            </Card>
          }
          {Account_type === 'company' &&
            <Card sx={{ width: 1000, marginTop: 7 }}>
              <CardActionArea>
                <CardContent>


                  <table className="table table-hover,table-responsive-sm" style={{ marginTop: 40 }}>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Company name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Block</th>


                      </tr>
                    </thead>
                    <tbody>
                      {com.map((com) => {
                        //  console.log('add',ad)
                        return (
                          <>
                            {user.username != com.username &&
                              <>

                                <tr style={{ marginTop: 50 }}>
                                  <th scope="row" style={{ marginTop: 10 }}>{com.id}</th>
                                  <td style={{ marginTop: 10 }}>{com.first_name}</td>
                                  <td style={{ marginTop: 10 }}>{com.last_name}</td>
                                  <td style={{ marginTop: 10 }}>{com.company_name}</td>
                                  <td style={{ marginTop: 10 }}>{com.email}</td>
                                  <td style={{ marginTop: 10 }}>{com.phone_number}</td>
                                  {console.log('typeeeoff', com.is_active)}
                                  {com.is_active == true ?
                                    <Button className="btn btn-danger" role="group" style={{ marginTop: 10 }} onClick={() => { block_user(com.id); setBool(!bool) }}>Block</Button> :
                                    <Button className="btn btn-primary" role="group" style={{ marginTop: 10 }} onClick={() => { block_user(com.id); setBool(!bool) }}>Un block</Button>
                                  }
                                </tr>


                              </>
                            }


                          </>

                        )
                      })}


                    </tbody>
                  </table>
                </CardContent>
              </CardActionArea>
            </Card>
          }


          {Account_type === 'post' &&
            <>
              <Grid container spacing={5} mt={3} >
                {pos.map((post) => {
                  console.log('isssss', post)
                  let img_name = post.image.replace(
                    "/frontend/src/static/",
                    ""
                  );
                  return (

                    <>
                      <Card sx={{ width: '450px', marginLeft: 4, border: '1px solid', marginBottom: 2 }} >
                        <CardMedia
                          component="img"
                          height="280"
                          image={require("../../static/" + img_name)}
                        />
                        <CardActions>
                          {post.is_active == 1 ?
                            <Button className="btn btn-danger" role="group" style={{ marginTop: 10 }} onClick={() => { block_post(post.id); setBool1(!bool1) }}>Block</Button> :
                            <Button className="btn btn-primary" role="group" style={{ marginTop: 10 }} onClick={() => { block_post(post.id); setBool1(!bool1) }}>Un block</Button>
                          }
                        </CardActions>
                      </Card>


                    </>


                  )

                })}
              </Grid>
              <Grid sx={{ mb: 5 }}>
                {prevPage && (
                  <ArrowBackRoundedIcon onClick={handlePrevPage} sx={{ fontSize: 40 }} />
                  // <Button >Previous Page</Button>
                )}
                {nextPage && (
                  <ArrowForwardRoundedIcon onClick={handleNextPage} sx={{ fontSize: 40 }} />
                  // <Button >Next Page</Button>
                )}
              </Grid>
            </>
          }
          {Account_type == 'Dashboard' &&
            <>
              <Grid container spacing={2}>
                <Grid item>
                  <Card sx={{ width: 300, mt: 3, marginLeft: 4, height: 200 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Total Posts
                      </Typography><br /><br />
                      <Typography variant="h3" component="div">
                        {pcount}
                        {console.log('cccccc', pcount)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item>
                  <Card sx={{ width: 300, mt: 3, marginLeft: 4, height: 200 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Total Questions
                      </Typography><br /><br />
                      <Typography variant="h3" component="div">
                        {qcount}
                        {console.log('cccccc', pcount)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid container spacing={6}>
                <Grid item>
                <div style={{ width: 500, height: 500, marginTop: 60 }}>
                  {chartData.labels && chartData.datasets && (
                    <Pie data={chartData} />
                  )}

                </div>
                </Grid>
                <Grid item>
                <div style={{ width: 500, height: 500, marginTop: 80 }}>
                  {chartData1.labels && chartData1.datasets && (
                    <Bar data={chartData1} />
                  )}
                  {console.log('ggg', likecount)}
                  {console.log('ppp', likecount.a)}
                  {console.log('klklk', likecount.b)}
                </div>
                </Grid>
              </Grid>
            </>
          }
        </Grid>
        <Grid>
          <FormControl sx={{ mt: 5, width: 200 }}>
            <InputLabel id="demo-simple-select-helper-label"  >Account type</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={Account_type}
              onChange={e => setAccount(e.target.value)}
            >


              <MenuItem value={'personal'}>Users</MenuItem>
              <MenuItem value={'company'}>Company</MenuItem>
              <MenuItem value={'post'}>Post</MenuItem>
              <MenuItem value={'Dashboard'}>Dashboard</MenuItem>
              <MenuItem >Logout</MenuItem>


            </Select>
          </FormControl>

        </Grid>

      </Grid>
    </div>
  )

}

export default Admin_home


