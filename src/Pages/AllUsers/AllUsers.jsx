import { Link } from "react-router-dom";
import AllUsersCard from "../../Components/AllUsersCard";
import useUser from "../../Hooks/useUsers";
import { useEffect, useState } from "react";
import loadingGif from "../../assets/Loading.gif"
const AllUsers = () => {
    const [users, loading, refetch] = useUser();
    const [localUsers, setLocalUsers] = useState([]);

    // Load data from localStorage on component mount
    useEffect(() => {
        const localUserData = localStorage.getItem("users");
        if (localUserData) {
            setLocalUsers(JSON.parse(localUserData));
        }
    }, []);

    // Save user data to localStorage when users change
    useEffect(() => {
        if (users && users.length > 0) {
            localStorage.setItem("users", JSON.stringify(users));
            setLocalUsers(users);
        }
    }, [users]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-4/5 mx-auto py-10">
            {loading ? (
                <div className="h-[60vh] col-span-3 flex justify-center items-center border-emerald-600">
                <img className="w-20 mx-auto" src={loadingGif} alt="" />
                </div>
            ) : localUsers && localUsers.length > 0 ? (
                localUsers.map((user) => (
                    <AllUsersCard key={user._id} refetch={refetch} user={user} />
                ))
            ) : (
                <p>No users found.</p>
            )}
            <Link to={'/adduser'}>
                <button className="btn btn-accent fixed z-10 bottom-8 right-8">Add User</button>
            </Link>
        </div>
    );
};

export default AllUsers;

