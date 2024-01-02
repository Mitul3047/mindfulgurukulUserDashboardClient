import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const AllUsersCard = ({ user }) => {
    return (
        <div className=" text-center shadow-md p-3 rounded-md">
        <img className="rounded-full w-36 h-36 mx-auto mb-4" src={user.photoURL} alt={user.name} />
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
           <p><span className="font-semibold">Email:</span> {user.email}</p>
          {/*<p>Number: {user.number}</p>
          <p>Gender: {user.gender}</p>
          <p>Hear About: {user.hearAbout.join(', ')}</p>
          <p>Location: {user.city}, {user.state}</p> */}
          <Link to={`${user._id}`}><button className="w-full btn mt-4 bg-[#034078] text-white hover:text-black">Show Details</button></Link>
        </div>
      </div>
    );
};AllUsersCard.propTypes = {
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
  };

export default AllUsersCard;