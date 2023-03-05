import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import  AuthProvider from './context/AuthContext'
import ListProvider from './context/PostlistContext';
import UserListProvider from './context/UserListContext';
import QuestionProvider from './context/QuestionContext';
import ProfileProvider from './context/ProfileContext';
import CompanyProvider from './context/CompanyListContext';
import  Provider  from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
      <ListProvider>
        <UserListProvider>
          <QuestionProvider>
            <ProfileProvider>
              <CompanyProvider>
            
    <App />
 
    </CompanyProvider>
    </ProfileProvider>
    </QuestionProvider>
    </UserListProvider>
    </ListProvider>
    </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

