import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import Login from '../modules/auth/Login';

const PublicRouterOLD = createBrowserRouter([
    {
        path: '/',
        element : <AuthLayout />,
        children : [
            {
                path: '/login',
                element : <Login/>
            }        
        ]
    }
])

export default PublicRouterOLD;