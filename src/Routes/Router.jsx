import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Login/Signup";
import AllUsers from "../Pages/AllUsers/AllUsers";
import UserDetails from "../Pages/UserDetails/UserDetails";
import AddUser from "../Pages/AddUsers/AddUser";
import UpdateUser from "../Pages/UpdateUser/UpdateUser";
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayouts></MainLayouts>,
        errorElement: 'error',   
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element:<SignUp></SignUp>
            },
            {
                path: '/allusers',
                element:<PrivateRoute><AllUsers></AllUsers></PrivateRoute>
            },
            {
                path: '/allusers/:id',
                element:<PrivateRoute><UserDetails></UserDetails></PrivateRoute>
            },
            {
                path: '/adduser',
                element:<PrivateRoute><AddUser></AddUser></PrivateRoute>
            },
            {
                path: '/updateuser/:id',
                element:<PrivateRoute><UpdateUser></UpdateUser></PrivateRoute>,
                
            }
        ]
    }
]);


