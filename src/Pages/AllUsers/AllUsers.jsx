
import AllUsersCard from "../../Components/AllUsersCard";
import useUser from "../../Hooks/useUsers";

const AllUsers = () => {

    const [users, loading, refetch] = useUser()
    console.log(users);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-4/5 mx-auto py-10">
            {
                users.map(user => (
                    <AllUsersCard key={user._id} user={user} />
                ))
            }
        </div>
    );
};

export default AllUsers;
