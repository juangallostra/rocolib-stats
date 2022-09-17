import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import './components/Login.css'
import { Dashboard, Preferences } from './pages';

export default function App() {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  function Logout() {
    setToken('');
  }

  const getUsername = () => username;

  if (!token) {
    return (
      <div className='login-wrapper'>
        <Login setUsername={setUsername} setToken={setToken}/>
      </div>
    )
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route index element={ <Dashboard username={getUsername()} token={token} logout={Logout} /> } />
          <Route path='/preferences' element={ <Preferences username={getUsername()} logout={Logout} /> } />
        </Routes>
      </BrowserRouter>
  );
}
