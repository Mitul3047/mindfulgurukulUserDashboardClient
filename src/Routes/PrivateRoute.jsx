import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import loadingGif from "../assets/Loading.gif";
import { AuthContext } from "../Providers/Authprovider";


const PrivateRoute = ({children}) => {
    const {user,loading } = useContext(AuthContext);
    const location =  useLocation();
    console.log(location.pathname);

    if(loading){
       return  <div className="h-[60vh] col-span-3 flex justify-center items-center border-emerald-600">
       <img className="w-20 mx-auto" src={loadingGif} alt="" />
   </div>
    }


    if (user){
        return children;
    }
    return  <Navigate state={location.pathname} to="/login"></Navigate>
   
    
};


PrivateRoute.propTypes ={
    children: PropTypes.node
}

export default PrivateRoute;