import axios from "axios";
import { useEffect, useState } from "react";
import AllUsersCard from "../../Components/AllUsersCard";

const AllUsers = () => {
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/users');
          setUsersData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-4/5 mx-auto py-10">
            {
                usersData.map(user => (
                    <AllUsersCard key={user._id} user={user} />
                ))
            }
        </div>
    );
};

export default AllUsers;
