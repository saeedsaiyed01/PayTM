import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HeroDashboard } from './Dashboard/dashboard';
import { DashboardMain } from './pages/DashboardMain';
import { SendMoney } from './pages/SendMoney';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
function App() {

  return (

      <BrowserRouter>
        <Routes>
        <Route path="/hero" element={<HeroDashboard />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/dashboard" element={<DashboardMain />} />
          <Route path="/addBalance" element={<SendMoney />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App