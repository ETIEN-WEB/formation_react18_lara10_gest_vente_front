import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Constants from '../../../Constants';
import { useStateContext } from '../../../contexts/ContextProvider';
import axiosClient from '../../../axios';


const Login = () => {
    const {setAuth, setCurrentUser, setUserToken } = useStateContext ();

    const [input, setInput] = useState({});
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleInput = (e) => setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    
    const handleLogin = () => {
        setIsLoading(true)
        axiosClient.post('/login', input).then(({data}) => {
            console.log(data.branch);
            setCurrentUser(data.user)
            setUserToken(data.token)
            setAuth(data.user.name, data.user.role)
            localStorage.branch = JSON.stringify(data.branch)
            // debugger
            setIsLoading(false)
        }).catch(errors => {
            console.log(errors)
            setIsLoading(false)
            // if (errors.response.status == 422) {
            //     setErrors(errors.response.data.errors)
            // }
        })
    }
  


    return (

    <div className="container-fluid bg-theme" id={'login'}>

        <div className="row">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h4>Connection</h4>
                    </div>
                    <div className="card-body">
                        <label className={'w-100'}>
                            <p>Email / Phone</p>
                            <input
                                className={ errors.email != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2' }
                                type={'email'}
                                name={'email'}
                                value={input.email}
                                onChange={handleInput}
                            />
                            <p className={'login-error-msg'}> <small> {errors.email != undefined ? errors.email[0] : null } </small> </p>
                        </label>
                        <label className={'w-100 mt-4'}>
                            <p>Rôle</p>
                            <select
                                className={ errors.user_type != undefined ? 'form-select mt-2 is-invalid' : 'form-select mt-2' }
                                name={'user_type'}
                                value={input.user_type}
                                onChange={handleInput}
                            >
                                <option value="">Choisir le rôle de l'utilisateur</option>
                                <option value={1}>Adminstrareur</option>
                                <option value={2}>Caissier(ère)</option>
                            </select>
                            <p className={'login-error-msg'}> <small> {errors.user_type != undefined ? errors.user_type[0] : null } </small> </p>
                        </label>
                        <label className={'w-100 mt-4'}>
                            <p>Mot de passe </p>
                            <input
                                className={errors.password != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2' }
                                type={'password'}
                                name={'password'}
                                value={input.password}
                                onChange={handleInput}
                            />
                            <p className={'login-error-msg'}> <small> {errors.password != undefined ? errors.password[0] : null } </small> </p>
                        </label>
                        <div className="d-grid mt-4"> 
                            <button onClick={handleLogin} className="btn btn-outline-info" dangerouslySetInnerHTML={{__html: isLoading ? ' <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Connection... ' : ' Se connecter ' }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Login;