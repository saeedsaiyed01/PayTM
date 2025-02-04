import { AppBar } from "../components/Appbar"
import { Users } from "../components/Users"
import { Balance } from "../components/balance"

export const DashboardMain = () =>{
    return <div className="bg-slate-500 h-screen">
        <AppBar/>
        <div className=" m-8">
          
            <Balance />
            <Users/>
        </div>
    </div>
}