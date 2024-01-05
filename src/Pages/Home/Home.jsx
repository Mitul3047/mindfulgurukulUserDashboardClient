import { useContext } from "react";
import Banner from "../../Components/Banner";
import { AuthContext } from "../../Providers/Authprovider";

const Home = () => {
    const { user, logOut } = useContext(AuthContext);
console.log(user);
    const handleLogOut = () => {
        logOut()
            .then(() => {
                // You might want to perform any necessary actions after logout (e.g., redirecting to another page).
            })
            .catch(error => {
                // Handle logout error
                console.error('Logout error:', error);
            });
    };

    return (
        <div className="mb-10">
            <Banner />
            <div className="text-center items-center">
                <h1 className="py-10 text-4xl font-bold">Logged In User</h1>
                {
                    user ? (
                        <div className="card w-96 mx-auto bg-base-100 shadow-xl">
                            <figure><img className="w-24 h-24 rounded-full" src={user.photoURL} alt="User" /></figure>
                            <div className="card-body text-left">
                                <h2 className=""><span className="font-bold">Name:</span>{user.displayName}</h2>
                                <p><span className="font-bold">Name:</span>{user.email}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" onClick={handleLogOut}>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : <h1>No User Logged In Yet</h1>
                }
            </div>
        </div>
    );
};

export default Home;
