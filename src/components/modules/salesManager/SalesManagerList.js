import React, {useEffect, useState} from 'react';
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import Loader from "../../partials/miniComponent/Loader";
import {Link} from "react-router-dom";
import NoDataFound from "../../partials/miniComponent/NoDataFound";
import CategoryPhotoModal from "../../partials/modals/CategoryPhotoModal";
import SupplierDetails from "../suppliers/partials/SupplierDetails";
import Pagination from "react-js-pagination";
import axiosClient from "../../../axios";
import Swal from "sweetalert2";

const SalesManagerList = () => {
    const [input, setInput] = useState({
        order_by : 'created_at',
        per_page : 5,
        direction : 'desc',
        search : '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [sales_manager, setSales_manager] = useState([]);

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
    const [totalItemsCount, setTotalItemsCount] = useState(1)
    const [startFrom, setStartFrom] = useState(1)
    const [activePage, setActivePage] = useState(1)
    const [modalShow, setModalShow] = React.useState(false);
    const [modalPhotoShow, setModalPhotoShow] = React.useState(false);
    const [salesManagers, setSales_managers] = useState([]);
    const [modalPhoto, setModalPhoto] = useState('')

    const handleInput = (e) => {
        setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }
    const getSalesManagers = (pageNumber=1) => {
        setIsLoading(true)
        axiosClient.get(`/sales-manager?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`).then( res => {
            setSales_managers(res.data.data)
            setItemsCountPerPage(res.data.meta.per_page)
            setStartFrom(res.data.meta.from)
            setTotalItemsCount(res.data.meta.total)
            setActivePage(res.data.meta.current_page)
            setIsLoading(false)
        }).catch(errors => {
            console.log(errors)
        })
    }

    const handlePhotoModal = (photo) => {
        setModalPhoto(photo)
        setModalPhotoShow(true)
    }

    const handleDetailsModal = (sales_manager) => {
        setSales_manager(sales_manager)
        setModalShow(true)
    }

    const handleSalesManagerDelete = (id) => {
        Swal.fire({
            title: "Êtes-vous sure?",
            text: "Vous allez supprimer cet caissier",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, je supprime!",
            cancelButtonText: "Annuler",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.delete(`/sales-manager/${id}`).then(res=>{
                    getSalesManagers()
                    Swal.fire({
                        position: "top-end",
                        icon: res.data.cls,
                        title: res.data.msg,
                        showConfirmButton: false,
                        toast:true,
                        timer: 1500
                    })
                })
            }
        });


    }

    useEffect( () => {
        getSalesManagers()
    }, [])


    return (
        <>
            <BreadCrumb title={'Liste des caissier'} />
            <div className="row ">
                {/* <pre> {JSON.stringify(categories, undefined, 2)} </pre> */}
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <CardHeader
                                title={'Liste des caissier'}
                                link={'/sales-manager/create'}
                                icon={'fa-add'}
                                button_text={'Ajouter'}
                            />
                        </div>
                        <div className="card-body">
                            <div className="search-area mb-4">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label className={'w-100'}>
                                            <p>Recherche</p>
                                            <input
                                                className="form-control form-control-sm"
                                                name={'search'}
                                                value={input.search}
                                                onChange={handleInput}
                                                placeholder={'Recherche...'}
                                            />
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <label className={'w-100 search-label'}>
                                            <p>Ordre par </p>
                                            <select
                                                className="form-select form-select-sm"
                                                name={'order_by'}
                                                value={input.order_by}
                                                onChange={handleInput}
                                            >
                                                <option value={'name'}>Libellé</option>
                                                <option value={'created_at'}>Date création </option>                                            <option value={'name'}>Libellé</option>
                                                <option value={'updated_at'}>Date modification </option>
                                                <option value={'status'}>Status </option>
                                                <option value={'phone'}>Contact </option>
                                                <option value={'email'}>Email </option>

                                            </select>
                                        </label>
                                    </div>
                                    <div className="col-md-2">
                                        <label className={'w-100'}>
                                            <p>Ordre direction </p>
                                            <select
                                                className="form-select form-select-sm"
                                                name={'direction'}
                                                value={input.direction}
                                                onChange={handleInput}
                                            >
                                                <option value={'asc'}>ASC </option>
                                                <option value={'desc'}>DESC </option>

                                            </select>
                                        </label>
                                    </div>
                                    <div className="col-md-2">
                                        <label className={'w-100'}>
                                            <p>Par page </p>
                                            <select
                                                className="form-select form-select-sm"
                                                name={'per_page'}
                                                value={input.per_page}
                                                onChange={handleInput}
                                            >
                                                <option value={10}>10 </option>
                                                <option value={25}>25 </option>
                                                <option value={50}>50 </option>
                                                <option value={100}>100 </option>

                                            </select>
                                        </label>
                                    </div>
                                    <div className="col-md-2">
                                        <div className={'d-grid mt-4'}>
                                            <button className={'btn btn-sm theme-button'} onClick={()=> getSalesManagers(1)} >
                                                <i className="fa-solid fa-magnifying-glass"/> Rechercher
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isLoading ? <Loader/> :
                                <div className="table-responsive soft-landing">
                                    <table className={'my-table table table-hover table-striped table-bordered'}>
                                        <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Nom </th>
                                            <th>Email / Contact</th>
                                            <th>Status / Boutique</th>
                                            <th>Photo</th>
                                            <th>Created By</th>
                                            <th>Date Time</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {Object.keys(salesManagers).length > 0 ? salesManagers?.map((salesManager, index) => (
                                            <tr key={index} >
                                                <td>{startFrom + index}</td>
                                                <td>{salesManager.name}</td>
                                                <td>
                                                    <p className={'text-success'}> Name: {salesManager.email}</p>
                                                    <p className={'text-info'}> Contact: {salesManager.phone}</p>
                                                </td>

                                                <td>
                                                    <p className={'text-success'}> {salesManager.status} </p>
                                                    <p className={'text-info'}> {salesManager.shop} </p>
                                                </td>
                                                <td>
                                                    <img
                                                        onClick={()=> handlePhotoModal(salesManager.photo_full)}
                                                        src={salesManager.photo} alt={salesManager.name}
                                                        className={'img-thumbnail table-image'}
                                                    />
                                                </td>
                                                <td>{salesManager.created_by}</td>
                                                <td>
                                                    <p className={'text-theme'}> <small>  Created: {salesManager.created_at} </small></p>
                                                    <p className={'text-success'}> <small> Updated: {salesManager.updated_at} </small> </p>
                                                </td>
                                                <td>
                                                    <button onClick={()=> handleDetailsModal(salesManager)} className={'btn btn-sm btn-info my-1'}><i className="fa-solid fa-eye"/></button>
                                                    <Link to={`/sales-manager/edit/${salesManager.id}`} > <button className={'btn btn-sm btn-warning my-1'}> <i className="fa-solid fa-edit"/> </button></Link>
                                                    <button onClick={() => handleSalesManagerDelete(salesManager.id) } className={'btn btn-sm btn-danger mx-1 my-1'}> <i className="fa-solid fa-trash"/> </button>
                                                </td>
                                            </tr>
                                        )) : <NoDataFound/>}
                                        </tbody>

                                    </table>
                                    <CategoryPhotoModal
                                        show={modalPhotoShow}
                                        onHide={() => setModalPhotoShow(false)}
                                        title={'caissier photo'}
                                        size={''}
                                        photo={modalPhoto}
                                    />
                                    <SupplierDetails
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        title={'Détails du caissier'}
                                        size={''}
                                        supplier={sales_manager}
                                    />

                                </div>
                            }
                        </div>
                        <div className="card-footer">
                            <nav className={'pagination-sm'}>
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountPerPage}
                                    totalItemsCount={totalItemsCount}
                                    pageRangeDisplayed={5}
                                    onChange={getSalesManagers}
                                    nextPageText={'Suivant'}
                                    firstPageText={'Première'}
                                    prevPageText={'Avant'}
                                    lastPageText={'Dernière'}
                                    itemClass={'page-item'}
                                    linkClass={'page-link'}

                                />
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SalesManagerList;