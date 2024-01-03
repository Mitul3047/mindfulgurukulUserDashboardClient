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
                element:<AllUsers></AllUsers>
            },
            {
                path: '/allusers/:id',
                element:<UserDetails></UserDetails>
            },
            {
                path: '/adduser',
                element:<AddUser></AddUser>
            }
        ]
    }
]);


