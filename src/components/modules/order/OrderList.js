import React, {useEffect, useState} from 'react';
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import Loader from "../../partials/miniComponent/Loader";
import {Link} from "react-router-dom";
import NoDataFound from "../../partials/miniComponent/NoDataFound";
import Pagination from "react-js-pagination";
import axiosClient from "../../../axios";

import Swal from "sweetalert2";
import GlobalFunction from "../../../GlobalFunction";

const OrderList = () => {
    const [input, setInput] = useState({
        order_by : 'serial',
        per_page : 5,
        direction : 'asc',
        search : '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [order, setOrder] = useState([]);

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
    const [totalItemsCount, setTotalItemsCount] = useState(1)
    const [startFrom, setStartFrom] = useState(1)
    const [activePage, setActivePage] = useState(1)
    const [modalShow, setModalShow] = React.useState(false);
    const [modalPhotoShow, setModalPhotoShow] = React.useState(false);
    const [orders, setOrders] = useState([]);

    const handleInput = (e) => {
        setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }
    const getOrders = (pageNumber=1) => {
        setIsLoading(true)
        axiosClient.get(`/order?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`).then( res => {

            setOrders(res.data.data)
            setItemsCountPerPage(res.data.meta.per_page)
            setStartFrom(res.data.meta.from)
            setTotalItemsCount(res.data.meta.total)
            setActivePage(res.data.meta.current_page)
            setIsLoading(false)
        }).catch(errors => {
            console.log(errors)
        })
    }

    const handleDetailsModal = (order) => {
        setOrder(order)
        setModalShow(true)
    }

    useEffect( () => {
        getOrders()
    }, [])


    return (
        <>
            <BreadCrumb title={'Liste des commandes'} />
            <div className="row ">
                {/* <pre> {JSON.stringify(categories, undefined, 2)} </pre> */}
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <CardHeader
                                title={'Liste commande'}
                                link={'/order/create'}
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
                                                <option value={'serial'}>Serial </option>
                                                <option value={'status'}>Status </option>

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
                                            <button className={'btn btn-sm theme-button'} onClick={()=> getOrders(1)} >
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
                                            <th> Déatils commande </th>
                                            <th>Client</th>
                                            <th>Montant</th>
                                            <th>Caissier(ère) </th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                            {orders.map((order, index) =>(
                                                <tr key={index}>
                                                    <td className={'align-middle'}>{startFrom + index}</td>
                                                    <td className={'align-middle'}>
                                                        <p>N° Comd: <strong> {order.order_number} </strong> </p>
                                                        <p className={'text-theme'}>Status Comd: {order.order_status_string} </p>
                                                        <p>Status Paiement: {order.payment_status} </p>

                                                    </td>
                                                    <td className={'align-middle'}>
                                                        <p> Nom: {order.customer_name}</p>
                                                        <p className={'text-theme'}>Contact: {order.customer_phone}</p>
                                                    </td>
                                                    <td className={'align-middle'}>
                                                        <p> Quantité(s): {order.quantity} </p>
                                                        <p className={'text-theme'}> Sous-total: {GlobalFunction.formatPrice(order.sub_total) } </p>
                                                        <p> Réduction: {GlobalFunction.formatPrice(order.discount)} FCFA</p>
                                                        <p className={'text-theme'}> Total: {GlobalFunction.formatPrice(order.total)} </p>
                                                        <p> Montant dû: {GlobalFunction.formatPrice(order.due_amount)} </p>
                                                        <p className={'text-theme'}> Montant payé: {GlobalFunction.formatPrice(order.paid_amount)} </p>
                                                    </td>
                                                    <td className={'align-middle'}>
                                                        <p> Boutique: {order.shop} </p>
                                                        <p className={'text-theme'}> Caissier(ère): {order.sales_manager} </p>
                                                    </td>
                                                    <td className={'align-middle'}>
                                                        <p> {order.created_at} </p>
                                                        <p className={'text-theme'}> {order.updated_at} </p>
                                                    </td>
                                                    <td className={'align-middle'}>
                                                        <Link to={`/order/${order.id}`}> <button className={'btn btn-info btn-sm'}> <i className="fa-solid fa-eye"/> </button> </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>

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
                                    onChange={getOrders}
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

export default OrderList;