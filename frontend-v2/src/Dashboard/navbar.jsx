// Navbar Component
import React, { useState } from "react";
export const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Welcome back, Alex</p>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            🔔
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Notifications</h3>
                <button className="text-sm text-indigo-600">Mark all as read</button>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm">New feature available</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm">Your transfer was successful</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <img
            src="/api/placeholder/40/40"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-200"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium">Alex Thompson</p>
            <p className="text-xs text-gray-500">alex@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};