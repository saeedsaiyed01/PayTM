import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Home from "../icons/home";
import Slide from "../icons/slide";
import { SidebarItem } from "./SidebarIteams";

export function Sidebar({sidebarOpen, setSidebarOpen}) {
  const navigate = useNavigate();

  // Add responsive behavior
  useEffect(() => {
    function handleResize() {
    
      setSidebarOpen(window.innerWidth >= 768);
    }
    
 
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  return (
    <div
      className={`
        fixed left-0 top-0 h-screen border-r border-gray-300 bg-white 
        ${sidebarOpen ? "w-72 p-4" : "w-16 p-2"}
        transition-all duration-300
      `}
    >
      <div className="flex justify-end">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="p-2 hover:bg-gray-200 rounded-lg"
        >
          <Slide />
        </button>
      </div>
      
      <div className={sidebarOpen ? 'block' : 'hidden'}>
        PayTM
      </div>

      <div className="pt-6 space-y-2">
        <SidebarItem
          onClick={() => navigate("/dashboard")}
          text="Dashboard"
          icon={<Home />}
          sidebarOpen={sidebarOpen}
        />
        <SidebarItem   onClick={() => navigate("/Transactions")} text="Transactions" icon={<Home />} sidebarOpen={sidebarOpen} />
        <SidebarItem text="Wallet" icon={<Home />} sidebarOpen={sidebarOpen} />
        <SidebarItem onClick={() => navigate("/setting")} text="Settings" icon={<Home />} sidebarOpen={sidebarOpen} />
      </div>
    </div>
  );
}