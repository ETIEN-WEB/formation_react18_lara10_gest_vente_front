import React, {useEffect, useState} from 'react';
import $ from 'jquery';
import logo from './../../assets/img/logo.png'
import Swal from 'sweetalert2';
import axiosClient from '../../axios';
import { useStateContext } from '../../contexts/ContextProvider';
import {Link} from "react-router-dom";


const Nav = () => {
    const {auth, setAuth, currentUser, setCurrentUser, setUserToken } = useStateContext();
    const [branch, setBranch] = useState({})

    const handleLogout = () => {
        Swal.fire({
            title: "Êtes-vous sure?",
            text: "Vous serez déconnecter",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, je me déconnecte!",
            cancelButtonText: "Annuler",
          }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.post('/logout').then(res=>{
                    setCurrentUser({})
                    setUserToken(null)
                    setAuth(null, null)
                })
            }
          });
    }

    const handleSidebar = () => {
        $('body').toggleClass('sb-sidenav-toggled')
    }

    useEffect(() => {
        if (localStorage.branch != undefined){
            setBranch(JSON.parse(localStorage.branch))
        }
    }, [])

    return (
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-theme">
            {/* <!-- Navbar Brand--> */}
            <Link class="navbar-brand ps-3" to="/">
                <img src={logo} alt={'logo'} className={'img-thumbnail'} />
            </Link>
            {/* <!-- Sidebar Toggle--> */}
            <button onClick={handleSidebar} class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
            {/* <!-- Navbar Search--> */}
            
            {/* <!-- Navbar--> */}
            <ul class="navbar-nav ms-auto me-3 me-lg-4">
                <p className="text-white"> <strong> {branch != undefined ? branch.name + ' | ' : '' } </strong> { auth[0] || null } </p>
                {/*<pre> {JSON.stringify(auth, undefined, 2)} </pre>*/}
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#!">Parametres</a></li>
                        <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><button onClick={handleLogout} class="dropdown-item"> Se déconnecter </button></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;