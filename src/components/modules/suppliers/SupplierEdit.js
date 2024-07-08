import React, {useEffect, useState} from 'react';
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import {useNavigate, useParams} from "react-router-dom";
import axiosClient from "../../../axios";
import Swal from "sweetalert2";

const SupplierEdit = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [input, setInput] = useState({status : 1});
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [areas, setAreas] = useState([]);
    //const [supplier, setSupplier] = useState([]);

    const getSupplier = () => {
        axiosClient.get(`/supplier/${params.id}`).then(res=>{
            console.log(res.data.data)
            setInput(res.data.data)
            getDistrict(res.data.data.division_id)
            getAreas(res.data.data.district_id)
        })
    }

    const getDivisions = () => {
        axiosClient.get('/divisions').then(res=>{
            setDivisions(res.data)
        })
    }

    const getDistrict = (division_id) => {
        axiosClient.get(`/district/${division_id}`).then(res=>{
            setDistricts(res.data)
        })
    }

    const getAreas = (district_id) => {
        axiosClient.get(`/area/${district_id}`).then(res=>{
            setAreas(res.data)
        })
    }

    const handleInput = (e) => {
        if (e.target.name == 'division_id'){
            setDistricts([])
            setAreas([])
            let division_id = parseInt(e.target.value)
            if (!isNaN(division_id)) getDistrict(division_id)

        }else if (e.target.name == 'district_id'){
            setAreas([])
            let district_id = e.target.value
            if (!isNaN(district_id)) getAreas(district_id)
        }
        setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }

    const handleAreaInput = (selected_option, name) => {
        setInput(prevState => ({...prevState, [name] : selected_option.value}))
    }

    const handleLogo = (e) =>{
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onloadend = () =>{
            setInput(prevState => ({...prevState, logo : reader.result}))
        }
        reader.readAsDataURL(file)
    }

    const handleSupplierUpdate = () => {
        setIsLoading(true)
        axiosClient.put(`/supplier/${params.id}`, input).then(res=>{
            setIsLoading(false)
            Swal.fire({
                position: "top-end",
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast:true,
                timer: 1500
            })
            if (res.data.flag == undefined){
                navigate('/supplier')
            }

        }).catch(errors => {
            setIsLoading(false)
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
            }
        })
    }

    useEffect( () => {
        getDivisions()
        getSupplier()
    }, [] )
    
    return (
        <>
            <BreadCrumb title={'Modifier un fournisseur'} />
            <div className="row ">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <CardHeader
                                title={'Modifier un fournisseur'}
                                link={'/supplier'}
                                icon={'fa-list'}
                                button_text={'Liste'}
                            />
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Détails du fournisseur</h5>
                                        </div>
                                        <div className="card-body">
                                            <label className={'w-100'}>
                                                <p>Nom de l'entreprise</p>
                                                <input
                                                    className={ errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2' }
                                                    type={'text'}
                                                    name={'name'}
                                                    value={input.name}
                                                    onChange={handleInput}
                                                    placeholder={"Entrer le nom de l'entreprise"}
                                                />
                                                <p className={'login-error-msg'}> <small> {errors.name != undefined ? errors.name[0] : null } </small> </p>
                                            </label>
                                            <label className={'w-100'}>
                                                <p>Contact</p>
                                                <input
                                                    className={ errors.phone != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2' }
                                                    type={'text'}
                                                    name={'phone'}
                                                    value={input.phone}
                                                    onChange={handleInput}
                                                    placeholder={"Entrer le contact de l'entreprise"}
                                                />
                                                <p className={'login-error-msg'}> <small> {errors.phone != undefined ? errors.phone[0] : null } </small> </p>
                                            </label>
                                            <label className={'w-100'}>
                                                <p>Email</p>
                                                <input
                                                    className={ errors.email != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2' }
                                                    type={'email'}
                                                    name={'email'}
                                                    value={input.email}
                                                    onChange={handleInput}
                                                    placeholder={"Entrer l'email de l'entreprise"}
                                                />
                                                <p className={'login-error-msg'}> <small> {errors.email != undefined ? errors.email[0] : null } </small> </p>
                                            </label>
                                            <label className={'w-100 mt-4'}>
                                                <p>Status</p>
                                                <select
                                                    className={ errors.status != undefined ? 'form-select mt-2 is-invalid' : 'form-select mt-2' }
                                                    name={'status'}
                                                    value={input.status}
                                                    onChange={handleInput}
                                                    placeholder={'Choisir un status'}
                                                >
                                                    <option value={1}> Active </option>
                                                    <option value={0}> Inactive </option>
                                                </select>
                                                <p className={'login-error-msg'}> <small> {errors.status != undefined ? errors.status[0] : null } </small> </p>
                                            </label>
                                            <label className={'w-100 mt-4'}>
                                                <p>Détails</p>
                                                <textarea
                                                    className={ errors.details != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2' }
                                                    name={'details'}
                                                    value={input.details}
                                                    onChange={handleInput}
                                                    placeholder={'Détails sur le fournisseur'}
                                                />
                                                <p className={'login-error-msg'}> <small> {errors.details != undefined ? errors.details[0] : null } </small> </p>
                                            </label>
                                            <label className={'w-100 mt-4'}>
                                                <p>Logo</p>
                                                <input
                                                    className={ errors.logo != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2' }
                                                    type={'file'}
                                                    name={'logo'}
                                                    onChange={handleLogo}
                                                    placeholder={'Joindre un logo'}
                                                />
                                                <p className={'login-error-msg'}> <small> {errors.logo != undefined ? errors.logo[0] : null } </small> </p>
                                            </label>
                                            {input.logo !=  undefined || input.display_logo !=  undefined ?
                                                <div className='row'>
                                                    <div className="col-6">
                                                        <div className="photo-preview mt-3">
                                                            <img src={input.logo == undefined ? input.display_logo : input.logo} alt={'Photo preview'} className={'img-thumbnail aspect-one'} />
                                                        </div>
                                                    </div>
                                                </div> : null
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5> Adresse du fournisseur </h5>
                                        </div>
                                        <div className="card-body">
                                            <label className={'w-100'}>
                                                <p>Adresse <small> (Habitation/Rue/Quartier etc) </small> </p>
                                                <input
                                                    className={ errors.address != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2' }
                                                    type={'text'}
                                                    name={'address'}
                                                    value={input.address}
                                                    onChange={handleInput}
                                                    placeholder={"Entrer l'adresse de l'entreprise"}
                                                />
                                                <p className={'login-error-msg'}> <small> {errors.address != undefined ? errors.address[0] : null } </small> </p>
                                            </label>
                                            <label className={'w-100 mt-4'}>
                                                <p>Choisir la division du fournisseur </p>
                                                <select
                                                    className={ errors.division_id != undefined ? 'form-select mt-2 is-invalid' : 'form-select mt-2' }
                                                    name={'division_id'}
                                                    value={input.division_id}
                                                    onChange={handleInput}
                                                    placeholder={'Choisir un division_id'}
                                                >
                                                    <option> Choisir une division </option>
                                                    {divisions.map((division, index) => (
                                                        <option key={index} value={division.id}> {division.name} </option>
                                                    ))}

                                                </select>
                                                <p className={'login-error-msg'}> <small> {errors.division_id != undefined ? errors.division_id[0] : null } </small> </p>
                                            </label>
                                            <label className={'w-100 mt-4'}>
                                                <p>Choisir la ville du fournisseur </p>
                                                <select
                                                    className={ errors.district_id != undefined ? 'form-select mt-2 is-invalid' : 'form-select mt-2' }
                                                    name={'district_id'}
                                                    value={input.district_id}
                                                    onChange={handleInput}
                                                    placeholder={'Choisir un district_id'}
                                                    disabled={Object.keys(districts).length < 1}
                                                >
                                                    <option> Choisir une ville </option>
                                                    {districts.map((district, index) => (
                                                        <option key={index} value={district.id}> {district.name} </option>
                                                    ))}

                                                </select>
                                                <p className={'login-error-msg'}> <small> {errors.district_id != undefined ? errors.district_id[0] : null } </small> </p>
                                            </label>
                                            <label className={'w-100 mt-4'}>
                                                <p>Choisir le quartier du fournisseur </p>
                                                <select
                                                    className={ errors.area_id != undefined ? 'form-select mt-2 is-invalid' : 'form-select mt-2' }
                                                    name={'area_id'}
                                                    value={input.area_id}
                                                    onChange={handleInput}
                                                    placeholder={'Choisir un quartier'}
                                                    disabled={Object.keys(areas).length < 1}
                                                >
                                                    <option> Choisir un quartier </option>
                                                    {areas.map((area, index) => (
                                                        <option key={index} value={area.id}> {area.name} </option>
                                                    ))}
                                                </select>
                                                <p className={'login-error-msg'}> <small> {errors.area_id != undefined ? errors.area_id[0] : null } </small> </p>
                                            </label>
                                            <label className={'w-100 mt-4'}>
                                                <p>Point de repère </p>
                                                <input
                                                    className={ errors.landmark != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2' }
                                                    type={'text'}
                                                    name={'landmark'}
                                                    value={input.landmark}
                                                    onChange={handleInput}
                                                    placeholder={"Entrer le point de repère de l'entreprise"}
                                                />
                                                <p className={'login-error-msg'}> <small> {errors.landmark != undefined ? errors.landmark[0] : null } </small> </p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col-md-12">
                                    <div className="row justify-content-center">
                                        <div className="col-md-4">
                                            <div className={'d-grid mt-4'}>
                                                <button className={'btn theme-button'} onClick={handleSupplierUpdate} dangerouslySetInnerHTML={{__html: isLoading ? ' <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Chargement... ' : ' Modifier un fournisseur ' }}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SupplierEdit;