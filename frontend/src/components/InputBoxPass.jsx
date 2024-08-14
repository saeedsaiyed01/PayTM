import React, { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Eye icons from react-icons

const InputBoxPass = ({ onChange, placeholder, label, type }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Toggle password visibility
    const handleTogglePassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="text-sm font-medium text-left py-2">
        {label}

            <input
                type={isPasswordVisible ? "text" : type} // Toggle between text and password type
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-3 py-2 border rounded border-gray-300 mt-1"
            />
            <span
                onClick={handleTogglePassword}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
        </div>
    );
};

export default InputBoxPass;
