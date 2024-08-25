import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("No token found in local storage");
            return;
        }

        // Fetch logged-in user's info
        const fetchLoggedInUser = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLoggedInUserId(response.data._id);
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        };

        // Fetch users and filter out the logged-in user
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.users) {
                    const currentUserId = response.data.currentUserId || loggedInUserId;
                    setUsers(response.data.users.filter(user => user._id !== currentUserId));
                } else {
                    console.error("No users found in the response");
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchLoggedInUser();
        fetchUsers();
    }, [filter, loggedInUserId]);

    return (
        <>
            <div className="font-bold mt-6 text-lg ">Users</div>
            <div className="my-2">
                <input 
                    onChange={(e) => setFilter(e.target.value)} 
                    type="text" 
                    placeholder="Search users..." 
                    className="w-full px-2 py-1 border rounded border-slate-200" 
                />
            </div>
            <div>
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </>
    );
};

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-full">
                <Button 
                    onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)} 
                    label={"Send Money"} 
                />
            </div>
        </div>
    );
}
