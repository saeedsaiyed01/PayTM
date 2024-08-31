import axios from "axios";
import { useState, useEffect } from "react";

export const AppBar = () => {
    const [username, setUsername] = useState("");
    const [lastName, setlastName] = useState("");

    useEffect(() => {
        const fetchName = async () => {
            try {
                const response = await axios.get('https://paytmkaro-01.onrender.com/api/v1/user/me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsername(response.data.firstName);
                setlastName(response.data.lastName);
            } catch (error) {
                console.error('Error fetching name:', error);
            }
        };

        fetchName();
    }, []); // Dependency array ensures this runs only once on mount

    return (
        <div className="shadow-lg h-14 flex justify-between items-center bg-[rgb(68,128,235)]">
            <div className="flex flex-col justify-center h-full ml-4">
                PayyTm App
            </div>
            <div className="flex items-center">
                <div className="flex flex-col justify-center h-full mr-4 text-sm font-medium">
                    Hello, {username} {lastName}
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2">
                    <div className="text-xl font-semibold">
                        {username ? username.charAt(0).toUpperCase() : 'U'}
                        {lastName ? lastName.charAt(0).toUpperCase() : ""}
                    </div>
                </div>
            </div>
        </div>
    );
};
