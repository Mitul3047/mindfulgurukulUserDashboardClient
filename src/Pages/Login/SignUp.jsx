import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { AuthContext } from "../../Providers/Authprovider";
import axios from "axios";

const SignUp = () => {
    const [error, setError] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        // eslint-disable-next-line no-unused-vars
        const { password, ...formData } = data; // Destructure the password and create a new object without it
        console.log(formData);

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(formData.name, formData.photoURL, formData.number, formData.gender, formData.hearAbout, formData.city, formData.state)
                    .then(() => {
                        console.log('user profile info updated')
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'User created successfully.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        logOut();
                        navigate('/login');
                    })
                    .catch(error => console.log(error))
            })
        axios.post('https://mindgulusertaskapi.vercel.app/users', formData) // Use formData instead of data for the Axios request
            .then(response => {
                // Handle successful response
                console.log('User created:', response.data);
                // Additional actions or handling after successful POST request
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
                        <h1 className='text-3xl text-center pt-5'>SignUp</h1>
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
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })}
                                    placeholder="Password"
                                    className="input input-bordered"
                                />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have at least one uppercase, one lowercase, one number, and one special character</p>}
                            
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                            <p><small>Already have an account? <Link to="/login">Login</Link></small></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
