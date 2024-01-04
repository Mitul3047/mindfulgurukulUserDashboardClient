import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import loadingGif from "../../assets/Loading.gif"
const UserDetails = () => {
    const { id } = useParams();

    const { data: user = [], isLoading, isError, } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await axios.get(`http://localhost:3000/users/${id}`);
                return res.data;
            } catch (error) {
                console.error("Error fetching user:", error);
                throw error;
            }
        }
    });

    if (isLoading) {
        return <div className="h-[60vh] col-span-3 flex justify-center items-center border-emerald-600">
            <img className="w-20 mx-auto" src={loadingGif} alt="" />
        </div>;
    }

    if (isError) {
        return <div>Error fetching user data</div>;
    }

    return (
        <div className="max-w-5xl mx-auto min-h-[80vh] flex justify-center items-center">
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure>
                    <img className="h-[300px] mx-auto mb-4" src={user.photoURL} alt={user.name} />
                </figure>
                <div className="card-body">
                    <h2 className="text-lg font-semibold">{user.name}</h2>
                    <p><span className="font-semibold">Email:</span> {user.email}</p>
                    <p><span className="font-semibold">Number:</span> {user.number}</p>
                    <p><span className="font-semibold">Gender:</span> {user.gender}</p>
                    <p>
                        <span className="font-semibold">Hear About:</span>{" "}
                        {Array.isArray(user.hearAbout)
                            ? user.hearAbout.map((item, index) => (
                                <span key={index}>
                                    {index > 0 && ", "} {item}
                                </span>
                            ))
                            : user.hearAbout}
                    </p>
                    <p><span className="font-semibold">Location:</span> {user.city}, {user.state}</p>
                                <div className="flex justify-end ">
                                    <Link to={`/updateuser/${user._id}`}><button className="btn  text-white hover:text-black bg-[#034078] rounded-md">Update info</button></Link>
                                </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
