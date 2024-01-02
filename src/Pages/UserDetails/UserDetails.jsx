import { useParams } from "react-router-dom";
import useUser from "../../Hooks/useUsers";


const UserDetails = () => {
    const { id } = useParams()
    console.log(id);
    const [users, loading, refetch] = useUser()
    console.log(users);
    const userDetails = users.filter(user => user._id === id)
    console.log(userDetails);
    return (
        <div>
            {
                userDetails.map(user => (
                    <div key={user._id}>
                        <div className=" text-center shadow-md p-3 rounded-md">
                            <img className="rounded-full w-36 h-36 mx-auto mb-4" src={user.photoURL} alt={user.name} />
                            <div>
                                <h2 className="text-lg font-semibold">{user.name}</h2>
                                <p><span className="font-semibold">Email:</span> {user.email}</p>
                                <p>Number: {user.number}</p>
                                <p>Gender: {user.gender}</p>
                                <p>Hear About: {user.hearAbout.join(', ')}</p>
                                <p>Location: {user.city}, {user.state}</p>

                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default UserDetails;