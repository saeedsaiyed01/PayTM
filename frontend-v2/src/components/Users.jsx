import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

const API_URL = "http://localhost:3000";

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

        const fetchLoggedInUserAndUsers = async () => {
            try {
                const userResponse = await axios.get(`${API_URL}/api/v1/user/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const currentUserId = userResponse.data._id;
                setLoggedInUserId(currentUserId);

                const usersResponse = await axios.get(`${API_URL}/api/v1/user/bulk?filter=${filter}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (usersResponse.data.users) {
                    setUsers(usersResponse.data.users.filter(user => user._id !== currentUserId));
                } else {
                    console.error("No users found in the response");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchLoggedInUserAndUsers();
    }, [filter]);

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
 