import { AppBar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export  const  Dashboard = () =>{
    return <div className="bg-slate-500 h-screen">
        <AppBar/>
        <div className=" m-8">
          
            <Balance />
            <Users/>
        </div>
    </div>
}