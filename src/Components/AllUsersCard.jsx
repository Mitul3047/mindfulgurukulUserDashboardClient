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

      <div className="text-left">

        <h2><span className="font-semibold">Name:</span> {user.name}</h2>
        <h2><span className="font-semibold">Email:</span> {user.email}</h2>
        <h2><span className="font-semibold">Number:</span> {user.number}</h2>
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
    number: PropTypes.string,
    // Add other properties with their respective PropTypes
    // For example:

    // gender: PropTypes.string,
    // hearAbout: PropTypes.arrayOf(PropTypes.string),
    // city: PropTypes.string,
    // state: PropTypes.string,
  }),
  refetch: PropTypes.func, // Assuming refetch is a function
};

export default AllUsersCard;
