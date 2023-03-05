import React, { useEffect, useState, useContext } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios'
import { AuthContext } from "../../context/AuthContext";
import { PostlistContext } from '../../context/PostlistContext';
import { UserListContext } from '../../context/UserListContext';
import Button from '@mui/material/Button';
import CommentIcon from '@mui/icons-material/Comment';
import Comment from '../post/Comment';
import ComRe from '../post/com_reply';
import Post from '../post/Post';
import { Grid } from '@mui/material'
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Navigate, useNavigate } from 'react-router-dom';
import { ProfileContext } from '../../context/ProfileContext';
import Box from '@mui/material/Box';
import './home.css';
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Search from '../Home/Search'





function Home(navigation) {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState('')
  const { users, setUsers } = useContext(UserListContext)
  const { post, setPost } = useContext(PostlistContext)
  const [comment, setComment] = useState([])
  const [follow, setFollow] = useState('follow')
  const [like, setLike] = useState(false)
  const { profile, setProfile } = useContext(ProfileContext)
  const [status, setStatus] = useState([])
  const { search, setSearch } = useContext(PostlistContext)
  const navigate = useNavigate()
  let { user } = useContext(AuthContext)
  const [reply, setReply] = useState(false)
  const [loader, setLoader] = useState(true)
  const { content11 } = useContext(UserListContext)
  const { contre, post1 } = useContext(UserListContext)



  let use = user.username

  // {status[0].jobs
  // }

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderRadius: 5,
    width: 250,
    [`&.${linearProgressClasses.colorPrimary}`]: {

      backgroundColor: theme.palette.grey[theme.palette.warning.main === 'light' ? 10 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#ed6c02' : '#2e7d32',
    },
  }));


  console.log('status', status)



  const view = () => {
    console.log('function running')
    axios.get('http://localhost:8000/post/postview').then((response) => {
      setPost(response.data)
      console.log('1srrr', response.data)

    })
  }

  // user side suggestion
  const user_list = (e) => {
    axios.get('http://localhost:8000/api/user_list').then((response) => {

      setUsers(response.data)

    })
  }


  // comment view
  const comment_view = (id) => {
    handleExpandClick()
    console.log('ytytytytyt', id)

  }


  //  function for like user
  const likeuser = (id) => {

    const result = axios.create({
      baseURL: `http://localhost:8000/post/like/`
    })
    result.post(`/${id}`, { withCredentials: 'include', use }).then((response) => {
    })
    likeview()
    setLike(true)
  }

  // const searchfun = (e) =>{
  //    console.log('function provoked')
  //    e.preventDefault()
  //    let obj = post.find(o=>o.username === search)
  //    console.log('obj',obj)
  //    if(obj == null){
  //     console.log('Not Found')
  //    }
  // }

  const followuser = (username) => {
    let following_username = username
    let use = user.username
    console.log('usersss', users.id)
    // console.log('following_username', following_username)
    let data = { follower_username: use, following_username: following_username }
    axios.post('http://localhost:8000/api/follow', data).then((response) => {
      console.log('follow res', response.data)
    })

  }

  // const unfollowuser = (username) => {
  //   let following_username = username
  //   let use = user.username
  //   let data = { follower_username: use, following_username: following_username }
  //   axios.post('http://localhost:8000/api/unfollow', data).then((response) => {
  //   })

  // }
  { console.log('cheee', users) }
  { console.log('cheee', users.first_name) }




  const likeview = (id) => {
    const result = axios.create({
      baseURL: `http://localhost:8000/post/like_view/`
    })
    result.get(`/${id}`, { withCredentials: 'include' }).then((response) => {

      setLike(response.data)
    })
    // console.log('function incoked12');
  }

  const others_profile = (id) => {
    console.log('other', id)
    const result = axios.create({
      baseURL: `http://localhost:8000/api/my_profile/`
    })
    result.get(`/${id}`, { withCredentials: 'include' }).then((response) => {
      console.log('other_profile', response.data)
      setProfile(response.data)
      navigate('/others_profile')
    })
  }
  console.log('others_profile', profile)



  //  const comment_reply2 = ()=>{
  //   user = user.user_id
  //   console.log('commentsss',post.users.posts)
  //   let data ={commented_by:user,}
  //   axios.post('http://localhost:8000/api/follow', data)
  //  }




  const application_status = () => {
    console.log('function provoked')
    const result = axios.create({
      baseURL: `http://localhost:8000/api/application_status/`
    })
    result.get(`/${user.user_id}`, { withCredentials: 'include' }).then((response) => {
      console.log('status', response.data)
      setStatus(response.data)
    })
  }

  useEffect(() => {
    view()
    user_list()
    application_status()
    setLike(false)
    comment_view()
    console.log('foooo', profile)
    setLoader(false)
  }, [like, content11, contre, post1], [follow], [search])


  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  return (
    <div>

      <Grid container sx={{ backgroundColor: '#f3f2ef' }}>
        <Grid item xs={3.5} sx={{ marginTop: 5 }} >
          <Sidebar />
        </Grid>

        <Grid item xs={4.5} sx={{ marginTop: 10 }}>
          <Grid>
            <Card sx={{ display: 'flex', height: 120, borderRadius: 4, maxWidth: 535 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>

                  <Grid sx={{ display: '-webkit-flex' }}>
                    {console.log('dp use', users)}
                    {users.map((dp) => {
                      if (user.username == dp.username) {
                        if (dp.pro.length !== 0) {
                          console.log('iiiiiiiiiiiiii', dp.pro[0].profile_picture);
                        }
                      }
                      let img_name
                      if (user.username == dp.username) {
                        if (dp.pro.length !== 0) {
                          console.log('iiiiiiiiiiiiii', dp.pro[0].profile_picture);
                          img_name = dp.pro[0].profile_picture
                          console.log('title dp', img_name);
                        } else {
                          img_name = null
                          console.log('title no dp', img_name);
                        }
                      }
                      if (user.username == dp.username) {
                        return (
                          <>

                            {img_name !== null ? <Grid>
                              <Avatar sx={{ bgcolor: red[500] }} src={img_name} />
                            </Grid> : <Grid>
                              <Avatar sx={{ bgcolor: red[500] }} />
                            </Grid>
                            }



                          </>
                        )
                      }

                    })}


                    <span style={{ marginLeft: 5 }}>{user.username}</span>


                    <span>
                      <form className='form-conrol' style={{ marginLeft: 30 }}>
                        <div style={{ display: 'flex' }}>
                          <TextField
                            id="search-bar"
                            placeholder="Search..."
                            onChange={e => setSearch(e.target.value)}
                          />
                          <Search name='search'></Search>
                        </div>

                      </form>
                    </span>

                  </Grid>
                  <Grid sx={{ display: 'flex', mt: 2 }}>
                    <Post name='Post'></Post>
                  </Grid>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                </Box>
              </Box>
            </Card>
          </Grid>


          <Grid>
            {post.map((pos) => {
              if (pos.users.length !== 0) {
                // console.log('users',pos.users)
                let postt = pos.users[pos.users.length - 1]
                console.log('feeeds', postt.image)
                // let img_name = postt.image.replace(
                //   "/frontend/src/static/",
                //   ""
                // );
                let img_name1
                console.log('99999999999999999', pos.pro.length);
                if (pos.pro.length !== 0) {
                  console.log('postess', pos.pro[0].profile_picture);
                  img_name1 = pos.pro[0].profile_picture
                  // console.log('no log work', img_name1);
                }
                // else {
                //   img_name1 = null
                //   console.log('porfileeee', img_name1);
                // }

                return (
                  <>

                    <Card sx={{ maxWidth: 550, marginTop: 3 }}>
                      {img_name1 != null ?

                      <CardHeader
                          avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={img_name1}>
                            </Avatar>

                          }

                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                          title={pos.username}
                        /> : <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          </Avatar>

                        }

                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={pos.username}
                      />
                     } 


                      <CardMedia
                        component="img"
                        height="280"
                        image={postt.image}
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 18 }}>
                        </Typography>
                        <CardActions disableSpacing>
                          <IconButton onClick={() => likeuser(postt.id)} aria-label="add to favorites">
                            <span>{postt.likes_count}</span>
                            {postt.likes_count >= 1 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                          </IconButton>
                          {/* <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton> */}
                          <Comment name='comment' id={postt.id} > <IconButton aria-label="comment">
                            <CommentIcon />
                          </IconButton>
                          </Comment>
                        </CardActions>


                        <CardActions>

                          {/* {comment.map((com)=>{
              return(  */}
                          <ExpandMore sx={{ marginLeft: '150px' }}
                            expand={expanded}

                            aria-expanded={expanded}
                            aria-label="show more"
                            onClick={() => comment_view(postt.id)}
                          >
                            <ExpandMoreIcon />
                          </ExpandMore>

                          <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Grid direction='row'>

                              {postt.posts.map((com) => {
                                console.log('com', com.comms.content)

                                return (
                                  <CardContent>

                                    <Typography variant="overline" align="center" >
                                      {com.content}
                                    </Typography>
                                    <ComRe name1='Reply' id={com.id} >
                                    </ComRe>
                                    {com.comms.map((rep) => {
                                      console.log('reply', rep.content)
                                      return (
                                        <>
                                          <Typography ariant="overline" align="center">
                                            {rep.content}
                                          </Typography>
                                        </>
                                      )
                                    })}


                                  </CardContent>

                                )

                              })
                              }
                            </Grid>

                          </Collapse>
                        </CardActions>
                      </CardContent>
                      <CardContent>
                        <Typography variant="body2" color="text.secondary" sx={{ marginRight: 286, fontSize: 18 }}>
                          {postt.caption}
                        </Typography>
                      </CardContent>
                    </Card>

                  </>
                )

                // end of return
              }
            })}

          </Grid>
        </Grid>
        <Grid>
          <Card sx={{ minWidth: 300, marginTop: 10 }}>
            <CardContent>

              <Typography component="div">
                {users.map((use) => {
                  { console.log('uuuuuuuuuu', users) }
                  let img_name
                  if (use.pro.length !== 0) {
                    console.log('sidee', use.pro[0].profile_picture);
                    img_name = use.pro[0].profile_picture
                    // console.log('no log work', img_name);
                  }
                  else {
                    img_name = null
                    console.log('porfileeee', img_name);
                  }
                  return (
                    <>
                      <Grid justifyContent={'space-between'} sx={{ marginRight: 25, marginBottom: 2 }} display={'flex'}>
                        {user.username !== use.username &&
                          <>
                            {console.log('uuuull', use.id)}
                            {img_name !== null ?
                             <Grid>
                                <Avatar onClick={() => others_profile(use.id)} sx={{ bgcolor: red[500] }} src={img_name} />
                              </Grid> 

                            : <Grid>
                              <Avatar onClick={() => others_profile(use.id)} sx={{ bgcolor: red[500] }} />
                            </Grid>
                           }




                            <Grid sx={{ marginTop: 2 }}>
                              <p>{use.username}</p>
                            </Grid>
                            <Grid>
                              <Button onClick={() => followuser(use.username)} sx={{ marginLeft: 3 }}>{follow}</Button>
                            </Grid>
                            {console.log('postsss', post)}


                          </>
                        }
                      </Grid>
                    </>
                  )
                })}


              </Typography>


            </CardContent>

          </Card>

          {/* user suggestion */}
          {user.Account_type == 'personal' &&
            <Card sx={{ maxWidth: 500, marginTop: 7, height: '500px', overflowY: 'scroll' }}>
              <CardContent>
                <Typography sx={{ fontSize: 10, marginRight: 35 }} color="text.secondary" gutterBottom>
                  <Grid justifyContent={'space-between'} sx={{ marginRight: 9, display: 'flex' }}>
                    <h5 style={{ marginBottom: 25 }}>{user && <p>Application Status</p>} </h5>
                  </Grid>
                </Typography>
                {console.log('poyii', status)}
                {status.map((stat) => {
                  return stat.jobs.map((joo) => {
                    console.log('yyyyy', joo)
                    {
                      joo.processing == 'False' &&
                        console.log('ppopopppppopopopop')
                    }

                    return <div>
                      <Avatar sx={{ bgcolor: red[500] }} />
                      <Typography sx={{ display: 'flex', marginTop: '-33px', marginLeft: '47px' }}>{joo.companyName}</Typography>
                      <div className='progress' style={{ marginTop: '20px', width: 350, display: 'flex', marginTop: '-20px', marginLeft: '90px' }}>
                        {joo.processing == 'True' && <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemax="100" style={{ width: '40%' }}></div>}
                        {joo.processing == 'False' && <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemax="100" style={{ width: '20%' }} ></div>}
                        {joo.processing == 'True' & joo.Accept == 'True' && <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemax="100" style={{ width: '100%' }}></div>}

                      </div>
                    </div>

                  })

                })}
              </CardContent>
            </Card>
          }


        </Grid>
      </Grid>
    </div>

  )

}

export default Home























