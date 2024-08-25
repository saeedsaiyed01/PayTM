import { BrowserRouter, Navigate, Route, Routes, } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import AddBalancePage from "./pages/AddBalancePage";

function App() {
  return (
    
    <> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/addBalance" element={<AddBalancePage />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}
export default App