import React, {useEffect, useState} from 'react';
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import Loader from "../../partials/miniComponent/Loader";
import {Link} from "react-router-dom";
import NoDataFound from "../../partials/miniComponent/NoDataFound";
import CategoryPhotoModal from "../../partials/modals/CategoryPhotoModal";
import CategoryDetailsModal from "../../partials/modals/CategoryDetailsModal";
import Pagination from "react-js-pagination";
import axiosClient from "../../../axios";
import Swal from "sweetalert2";
import GlobalFunction from "../../../GlobalFunction";

const ProductList = () => {
    const [input, setInput] = useState({
        order_by : 'id',
        per_page : 5,
        direction : 'desc',
        search : '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
    const [totalItemsCount, setTotalItemsCount] = useState(1)
    const [startFrom, setStartFrom] = useState(1)
    const [activePage, setActivePage] = useState(1)
    const [productColumns, setProductColumns] = useState([])

    const  getProductColumns = () => {
        axiosClient.get(`/get-product-columns`).then(res=>{
            setProductColumns(res.data)
        })
    }

    const handleInput = (e) => {
        setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }
    const getProducts = (pageNumber=1) => {
        setIsLoading(true)
        axiosClient.get(`/product?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`).then( res => {

            setProducts(res.data.data)
            setItemsCountPerPage(res.data.meta.per_page)
            setStartFrom(res.data.meta.from)
            setTotalItemsCount(res.data.meta.total)
            setActivePage(res.data.meta.current_page)
            setIsLoading(false)
        }).catch(errors => {
            console.log(errors)
        })
    }



    const handleProductDelete = (id) => {
        Swal.fire({
            title: "Êtes-vous sure?",
            text: "Vous allez supprimer cet produit",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, je supprime!",
            cancelButtonText: "Annuler",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.delete(`/product/${id}`).then(res=>{
                    getProducts()
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
        getProducts()
        getProductColumns()
    }, [])

    return (
        <>
            <BreadCrumb title={'Liste des produits'} />
            <div className="row ">
                {/* <pre> {JSON.stringify(categories, undefined, 2)} </pre> */}
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <CardHeader
                                title={'Liste des produits'}
                                link={'/product/create'}
                                icon={'fa-add'}
                                button_text={'Ajouter'}
                                hide={true}
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
                                                type={'search'}
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
                                                {productColumns.map((column, index) => (
                                                    <option key={index} value={column.val}>{column.alias}</option>
                                                ))}
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
                                            <button className={'btn btn-sm theme-button'} onClick={()=> getProducts(1)} >
                                                <i className="fa-solid fa-magnifying-glass"/> Rechercher
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isLoading ? <Loader/> :
                                <div className="table-responsive soft-landing">
                                    <table className={'my-table table-sm product-table table table-hover table-striped table-bordered'}>
                                        <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Libellé </th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            <th>Category</th>
                                            <th>Photo</th>
                                            <th>Created By</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {Object.keys(products).length > 0 ? products?.map((product, index) => (
                                            <tr key={index} >
                                                <td>{startFrom + index}</td>
                                                <td>
                                                    <p className={'text-theme'}> Libellé: {product.name} </p>
                                                    <p className={'text-success'}> Slug: {product.slug} </p>
                                                    <p className={'text-theme'}>
                                                        {product.attributes != undefined && Object.keys(product.attributes).length > 0 ?
                                                            product.attributes.map((attribute, index) => (
                                                                <p><small> {attribute.name} : {attribute.value} </small></p>
                                                            )) : null
                                                        }
                                                    </p>
                                                </td>
                                                <td>
                                                    <p className={'text-theme'}> <strong> Prix de vente: {product.sell_price.price} {product.sell_price.symbol} | Réduction : {product.sell_price.discount} {product.sell_price.symbol} </strong> </p>
                                                    <p className={'text-theme'}> Prix: {product.price} </p>
                                                    <p className={'text-success'}> Réduction: {product.discount_percent} + {product.discount_fixed} </p>
                                                    <p className={'text-theme'}> Coût: {product.cost} </p>
                                                    <p className={'text-success'}> Début réduction: {product.discount_start} </p>
                                                    <p className={'text-theme'}> Fin réduction: {product.discount_end} </p>
                                                </td>
                                                <td>
                                                    <p className={'text-theme'}> Status: {product.status} </p>
                                                    <p className={'text-success'}> SKU: {product.sku} </p>
                                                    <p className={'text-theme'}> Stock: {product.stock} </p>
                                                </td>
                                                <td>
                                                    <p className={'text-theme'}> Category: {product.category} </p>
                                                    <p className={'text-success'}> Sous-category: {product.sub_category} </p>
                                                    <p className={'text-theme'}> Marque: {product.brand} </p>
                                                    <p className={'text-success'}> Origine: {product.country} </p>
                                                    <p className={'text-theme'}> Fournisseur: {product.supplier} </p>
                                                </td>
                                                <td>
                                                    <img
                                                        src={product.primary_photo} alt={product.name}
                                                        className={'img-thumbnail table-image'}
                                                    />
                                                </td>
                                                <td>
                                                    <p className={'text-theme'}> <small>  Création: {product.created_at} </small></p>
                                                    <p className={'text-success'}> <small> Modification: {product.updated_at} </small> </p>
                                                    <p className={'text-theme'}> <small> Crée par: {product.created_by} </small> </p>
                                                    <p className={'text-success'}> <small> Modifié par: {product.updated_by} </small> </p>
                                                </td>
                                                <td>
                                                    <div className={'w-40'}>
                                                         <Link to={`/product/${product.id}`}> <button className={'btn btn-sm btn-info'}><i className="fa-solid fa-eye"/></button> </Link>
                                                        {GlobalFunction.isAdmin() ?
                                                            <>
                                                                <Link to={`/product/edit/${product.id}`} > <button className={'btn btn-sm btn-warning my-1'}> <i className="fa-solid fa-edit"/> </button></Link>
                                                                <button onClick={() => handleProductDelete(product.id) } className={'btn btn-sm btn-danger'}> <i className="fa-solid fa-trash"/> </button>
                                                            </> :null
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : <NoDataFound/>}
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
                                    onChange={getProducts}
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

export default ProductList;