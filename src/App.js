
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Post from './pages/post/Post';
import PrivateRouter from './utils/PrivateRouter';
import AskQuestion from './pages/Questions/AskQuestion';
import QuestionView from './pages/Questions/QuestionView';
import QuestionDetail from './pages/Questions/QuestionDetail';
import Company from './pages/company/Company';
import My_profile from './pages/my_profile/My_profile';
import Others_profile from './pages/my_profile/Others_profile';
import Applicants from './pages/company/Applicants';
import Verification from './pages/Signup/Verification'
import Chat from './pages/chat/Chat'
import Admin_login from './components/admin/Admin_login';
import Admin_home from './components/admin/Admin_home'
import Admin_home1 from './components/admin/Admin_home1';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route  path='/'  element={<Login/>}/>
      <Route  path='/signup'  element={<Signup/>}/>
      <Route path='/home' element={<PrivateRouter><Home/></PrivateRouter>}/>
      <Route path='/post' element={<PrivateRouter><Post/></PrivateRouter>}/>
      <Route path='/question' element={<PrivateRouter><AskQuestion/></PrivateRouter>}/>
      <Route path='/questionview' element={<PrivateRouter><QuestionView/></PrivateRouter>}/>
      <Route path='/questiondetail' element={<PrivateRouter><QuestionDetail/></PrivateRouter>} />
      <Route path='/company' element={<PrivateRouter><Company/></PrivateRouter>} />
      <Route path='/my_profile' element={<PrivateRouter><My_profile/></PrivateRouter>} />
      <Route path='/others_profile' element={<PrivateRouter><Others_profile/></PrivateRouter>} />
      <Route path='/applicants' element={<PrivateRouter><Applicants/></PrivateRouter>} />
      <Route path='/verify/:id/:username' element={<Verification/>}/>
      <Route path='/chat' element={<Chat/>} />
      <Route path='/admin_login' element={<Admin_login/>}/>
      <Route path='/admin_home' element={<PrivateRouter><Admin_home/></PrivateRouter>}/>
      <Route path='/admin_home1' element = {<PrivateRouter><Admin_home1/></PrivateRouter>}/>


      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
