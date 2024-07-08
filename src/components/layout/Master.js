import React from 'react';
import Nav from '../partials/Nav';
import SideBar from '../partials/SideBar';
import Footer from '../partials/Footer';
import { useNavigate, Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios';


const Master = () => {
  const {auth, userToken, setCurrentUser } = useStateContext();
  //const {  userToken, setUserToken } = useStateContext();
  const navigate = useNavigate();


    if(!userToken) {
        //navigate('/login')
      return <Navigate to='login' />
      //navigate('/login', { replace: true });
    }

    // useEffect(() => {
    //   axiosClient.get('/me')
    //   .then(({ data }) => {
    //   setCurrentUser(data)
    //   })
    // }, [])
    
    return (
        <>
            <Nav/>
            {/*<pre> {JSON.stringify(auth, undefined, 2)} </pre>*/}
            <div id="layoutSidenav">
            <SideBar/>
            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        <Outlet/>
                    </div>
                </main>    
                <Footer/>         
            </div>
            </div>
        </>
    );
};

export default Master;