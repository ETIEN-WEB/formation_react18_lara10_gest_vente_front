import React from 'react';
import { useNavigate, Outlet, Navigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';

const AuthLayout = () => {
    const { userToken } = useStateContext ();
    //let navigate = useNavigate();

    if (userToken) {
       return <Navigate to="/" />
       //navigate('/dashboard');
    }


    return (
        <Outlet/>
    );
};

export default AuthLayout;