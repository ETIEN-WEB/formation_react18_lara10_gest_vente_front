import axios from 'axios';
import routes from './components/router/routes';
import Constants from './Constants';
import {Navigate, useNavigate} from "react-router-dom";
import React from "react";



const axiosClient = axios.create({
    baseURL: `${Constants.BASE_URL}/api`,  
})



axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`
    return config
});

axiosClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        // if (localStorage.getItem('TOKEN') != undefined || localStorage.getItem('TOKEN') != null){
        //     return error
        // }else {


        // localStorage.removeItem('TOKEN')
        // localStorage.removeItem('NAME')
        // localStorage.removeItem('ROLE')


        //window.location.reload();
        return error;
        // }

        //routes.navigate('/dashboard')
        //return <Navigate to='/login' />


    }else if (error.response && error.response.status === 500){
        // localStorage.removeItem('TOKEN')
        // localStorage.removeItem('NAME')
        // localStorage.removeItem('ROLE')
        //
        // window.location.reload();
    }
    throw error;
});

export default axiosClient;