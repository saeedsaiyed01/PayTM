// Sidebar Component
import { useNavigate } from "react-router-dom";
import Home from "../icons/home";
import { SidebarItem } from "./SidebarIteams";

export function Sidebar() {
  const navigate = useNavigate();


   
  const handleNavigate = () => {
    navigate('/dashboard');
};
  return (
    <div className="left-0 top-0 fixed h-screen border-4 border-gray-400  bg-white w-72 pl-1">
      <div className="p-4">
        <div className="flex text-3xl pt-3 items-center">
          <div className="pr-4 text-purple-600">
            
          </div>
          PayApp
        </div>
        <div className="pt-8 space-y-2">
          <SidebarItem  onClick={handleNavigate} text="Home" icon={<Home />} />
          <SidebarItem text="Transactions" icon={<Home />} />
          <SidebarItem text="Wallet" icon={<Home />} />
          <SidebarItem text="Settings" icon={<Home />} />
        </div>
      </div>
    </div>
  );
}