import {  useState } from "react";
import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

import axios from "axios";

const AddUser = () => {
    const [error, setError] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
    const navigate = useNavigate();

    const onSubmit = data => {
     
      console.log(data);


        axios.post('http://localhost:3000/users', data) // Use formData instead of data for the Axios request
            .then(response => {
                // Handle successful response
                console.log('User created:', response.data);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                // Additional actions or handling after successful POST request
               reset();
                navigate('/allusers');
            })
            .catch(err => {
                // Handle errors
                setError(err.response?.data?.message || 'An error occurred');
                console.error('Error creating user:', err);
            });
    };

    

    return (
        <>
            <div className="max-w-3xl mx-auto my-4 lg:my-10 rounded-md bg-base-200">
                <div className=" w-full flex-col lg:flex-row-reverse">

                    <div className="card rounded-md w-full  shadow-2xl bg-base-100">
                        <p className="text-red-600">{error}</p>
                        <h1 className='text-3xl text-center pt-5'>Add User</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Number</span>
                                </label>
                                <input type="number" {...register("number", { required: true })} placeholder="Number" className="input input-bordered" />
                                {errors.number && <span className="text-red-600">Number is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="Email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Gender</span>
                                </label>
                                <div>
                                    <label>
                                        <input type="radio" {...register("gender", { required: true })} value="male" className="radio" />
                                        <span className="ml-2">Male</span>
                                    </label>
                                    <label className="ml-4">
                                        <input type="radio" {...register("gender", { required: true })} value="female" className="radio" />
                                        <span className="ml-2">Female</span>
                                    </label>
                                    <label className="ml-4">
                                        <input type="radio" {...register("gender", { required: true })} value="others" className="radio" />
                                        <span className="ml-2">Others</span>
                                    </label>
                                </div>
                                {errors.gender && <span className="text-red-600">Please select your gender</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">How did you hear about this?</span>
                                </label>
                                <div className="space-y-1">
                                    <label className="items-center">
                                        <input type="checkbox" {...register("hearAbout", { required: true })} value="LinkedIn" className="checkbox" />
                                        <span className="ml-2">LinkedIn</span>
                                    </label>
                                    <label className="flex  items-center">
                                        <input type="checkbox" {...register("hearAbout", { required: true })} value="Friends" className="checkbox" />
                                        <span className="ml-2">Friends</span>
                                    </label>
                                    <label className="flex  items-center">
                                        <input type="checkbox" {...register("hearAbout", { required: true })} value="Job Portal" className="checkbox" />
                                        <span className="ml-2">Job Portal</span>
                                    </label>
                                    <label className="flex  items-center">
                                        <input type="checkbox" {...register("hearAbout", { required: true })} value="Others" className="checkbox" />
                                        <span className="ml-2">Others</span>
                                    </label>
                                </div>
                                {errors.hearAbout && <span className="text-red-600">Please select how you heard about this</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">City</span>
                                </label>
                                <select {...register("city", { required: true })} className="select select-bordered">
                                    <option value="">Select City</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Ahmedabad">Ahmedabad</option>
                                </select>
                                {errors.city && <span className="text-red-600">City is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">State</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("state", { required: true })}
                                    placeholder="State"
                                    className="input input-bordered"
                                    list="stateList"
                                />
                                <datalist id="stateList">
                                    <option value="Gujarat" />
                                    <option value="Maharashtra" />
                                    <option value="Karnataka" />
                                </datalist>
                                {errors.state && <span className="text-red-600">State is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Add User" />
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddUser;
