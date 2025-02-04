import React from 'react';

export function SidebarItem(props) {
  return (
    <div className="flex items-center space-x-4 p-2 hover:bg-gray-200 cursor-pointer" onClick={props.onClick}>
      <div className="icon">{props.icon}</div>
      <div className="text">{props.text}</div>
    </div>
  );
}