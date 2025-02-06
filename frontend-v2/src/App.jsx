import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HeroDashboard } from './Dashboard/dashboard';
import { SettingsPage } from './Dashboard/setting';
import { DashboardMain } from './pages/DashboardMain';
import { SendMoney } from './pages/SendMoney';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import Transactions from './pages/transactions';
function App() {

  return (

      <BrowserRouter>
        <Routes>
        <Route path="/setting" element={<SettingsPage />} />
          {/* //TODO: remove it after test */}
        <Route path="/transactions" element={<Transactions />} />
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