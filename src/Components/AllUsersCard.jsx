import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from "axios";
import Swal from "sweetalert2";

const AllUsersCard = ({ user, refetch }) => {
  
  const handleDeleteUser = () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
           axios.delete(`http://localhost:3000/users/${user._id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                });
        }
    });
  };

  return (
    <div className="shadow-md p-3 rounded-md">
      <p className="flex justify-end text-red-500 font-bold cursor-pointer" onClick={handleDeleteUser}>X</p>
      <img className="rounded-full w-36 h-36 mx-auto mb-4" src={user.photoURL} alt={user.name} />
      <div className="text-center">
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        {/* Other user details */}
        <Link to={`${user._id}`}><button className="w-full btn mt-4 bg-[#034078] text-white hover:text-black">Show Details</button></Link>
      </div>
    </div>
  );
};

AllUsersCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    photoURL: PropTypes.string,
    // Add other properties with their respective PropTypes
    // For example:
    // number: PropTypes.string,
    // gender: PropTypes.string,
    // hearAbout: PropTypes.arrayOf(PropTypes.string),
    // city: PropTypes.string,
    // state: PropTypes.string,
  }),
  refetch: PropTypes.func, // Assuming refetch is a function
};

export default AllUsersCard;
