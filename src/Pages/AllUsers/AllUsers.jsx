import { Link } from "react-router-dom";
import AllUsersCard from "../../Components/AllUsersCard";
import useUser from "../../Hooks/useUsers";
import { useEffect, useState } from "react";
import loadingGif from "../../assets/Loading.gif";

const AllUsers = () => {
    const [users, loading, refetch] = useUser();
    const [localUsers, setLocalUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc"); // Default: Ascending order

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

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        // Filtering users based on search query
        const filteredUsers = users.filter(
            (user) =>
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.number.includes(query)
        );
        setLocalUsers(filteredUsers);
    };

    // Load saved filter selection from localStorage on component mount
    useEffect(() => {
        const savedSortOrder = localStorage.getItem("sortOrder");
        if (savedSortOrder) {
            setSortOrder(savedSortOrder);
        }
    }, []);

    // Save filter selection to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("sortOrder", sortOrder);
    }, [sortOrder]);

    // Function to handle sorting order change
    const handleSortOrderChange = () => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);
    };

    // Function to sort users based on the current filter selection
    const sortUsers = () => {
        const sortedUsers = [...localUsers].sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (sortOrder === "asc") {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });
        setLocalUsers(sortedUsers);
    };

    // Update sorting when localUsers or sortOrder changes
    useEffect(() => {
        sortUsers();
    }, [localUsers, sortOrder]);

    return (
        <div>
            <div>
                {/* Search input for filtering users */}
                <input
                    type="text"
                    placeholder="Search by name, email, or phone number"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="border border-gray-300 px-2 py-1 rounded-md"
                />
            </div>
            <div>
                {/* Button to toggle sorting order */}
                <button onClick={handleSortOrderChange}>
                    {sortOrder === "asc" ? "A-Z" : "Z-A"}
                </button>
            </div>
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
        </div>
    );
};

export default AllUsers;
