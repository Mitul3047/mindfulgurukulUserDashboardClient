import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: users = [], isLoading: loading, } = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
        try {
          const res = await axios.get(`http://localhost:3000/users/${id}`);
          return res.data;
        } catch (error) {
          console.error("Error fetching users:", error);
          throw error;
        }
      }
    });
  
    const handleUpdateUser = async (event) => {
        event.preventDefault();
    
        const form = event.target;
    
        const name = form.name.value || users?.name || '';
        const email = form.email.value || users?.email || '';
        const photoURL = form.photoURL.value || users?.photoURL || '';
        const number = form.number.value || users?.number || '';
        const city = form.city.value || users?.city || '';
        const state = form.state.value || users?.state || '';
    
        const updatedUser = {
          name,
          email,
          photoURL,
          number,
          city,
          state,
        };
    
        try {
          const response = await axios.patch(`http://localhost:3000/users/${users?._id}`, updatedUser, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
    console.log(response.data.message === 'User updated successfully');
          if (response.data.message === 'User updated successfully') {
            Swal.fire({
              title: 'Success',
              text: 'User Updated successfully',
              icon: 'success',
              
            });
          }
          navigate('/allusers')
        } catch (error) {
          console.error("Error updating user:", error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to update user',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      };
  
    if (loading) {
      return <p>Loading...</p>;
    }
  

  return (
    <form onSubmit={handleUpdateUser} className="flex flex-col space-y-4 max-w-4xl mx-auto my-[120px]">
      <h1 className='text-3xl text-center pt-5'>Update Info</h1>
      <label>
        Name
      <input className="input input-bordered w-full" type="text" name="name" defaultValue={users?.name || ''} />
      </label>
     <label>
        Email
        <input className="input input-bordered w-full" type="email" name="email" readOnly defaultValue={users?.email || ''} />
     </label>
      <label>
        Photo
      <input className="input input-bordered w-full" type="text" name="photoURL" defaultValue={users?.photoURL || ''} />
      </label>
      <label>
        Mobile Number
        <input className="input input-bordered w-full" type="text" name="number" defaultValue={users?.number || ''} />
      </label>
      <label>
        Gender:
        <input className="input input-bordered w-full" type="text" name="gender" readOnly defaultValue={users?.gender || ''} />
      </label>
      <label>
        How did you hear about this?
        <input className="input input-bordered w-full" type="text" name="hearAbout" readOnly defaultValue={users?.hearAbout?.join(', ') || ''} />
      </label>
      <label>
        City:
        <select className="input input-bordered w-full" name="city" defaultValue={users?.city || ''}>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Ahmedabad">Ahmedabad</option>
        </select>
      </label>
      <label>
        State:
        <input className="input input-bordered w-full" type="text" name="state" defaultValue={users?.state || ''} />
      </label>
      <button className="btn btn-primary" type="submit">Update User</button>
    </form>
  );
};

export default UpdateUser;
