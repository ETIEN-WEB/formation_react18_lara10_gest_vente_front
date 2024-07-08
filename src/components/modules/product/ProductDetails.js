import React, {useEffect, useState} from 'react';
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import axiosClient from "../../../axios";
import {Link, useParams} from "react-router-dom";
import GlobalFunction from "../../../GlobalFunction";

const ProductDetails = () => {
    const params = useParams ()
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState([])

    const getProduct = () => {
        setIsLoading(true)
        axiosClient.get(`/product/${params.id}`).then( res => {

            setProduct(res.data.data)
            setIsLoading(false)
        }).catch(errors => {
            console.log(errors)
        })
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <>
            <BreadCrumb title={'Détails du produit'} />
            <div className="row ">
                {/* <pre> {JSON.stringify(categories, undefined, 2)} </pre> */}
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <CardHeader
                                title={'Détails du produit'}
                                link={'/product'}
                                icon={'fa-list'}
                                button_text={'Liste'}
                            />
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card h-100">
                                        <div className="card-header">
                                            <h5> Information de base </h5>
                                        </div>
                                        <div className="card-body">
                                            <table className={'my-table table-sm product-table table table-hover table-striped table-bordered'}>
                                                <tbody>
                                                    <tr>
                                                        <th>Libéllé</th>
                                                        <tr>{product.name}</tr>
                                                    </tr>
                                                    <tr>
                                                        <th>Slug</th>
                                                        <tr>{product.slug}</tr>
                                                    </tr>
                                                    <tr>
                                                        <th> SKU </th>
                                                        <tr>{product.sku}</tr>
                                                    </tr>
                                                    <tr>
                                                        <th>Status</th>
                                                        <tr>{product.status}</tr>
                                                    </tr>
                                                    <tr>
                                                        <th>Catégorie</th>
                                                        <tr> {GlobalFunction.isAdmin() ?
                                                                <Link to={`/category`}> {product?.category} </Link> : product?.category
                                                        }</tr>
                                                    </tr>
                                                    <tr>
                                                        <th>Sous-atégorie</th>
                                                        <tr> {GlobalFunction.isAdmin() ?
                                                            <Link to={`/sub-category`}> {product?.sub_category} </Link> : product?.sub_category
                                                        }</tr>
                                                    </tr>
                                                    <tr>
                                                        <th>Marque</th>
                                                        <tr> {GlobalFunction.isAdmin() ?<Link to={`/brand`}> {product?.brand} </Link> : product?.brand}</tr>
                                                    </tr>
                                                    <tr>
                                                        <th>Origine</th>
                                                        <tr> {product?.country} </tr>
                                                    </tr>
                                                    <tr>
                                                        <th>Fournisseur</th>
                                                        <tr> {GlobalFunction.isAdmin() ?<Link to={`/supplier`}> {product?.supplier} </Link> : product?.supplier}</tr>
                                                    </tr>
                                                    <tr>
                                                        <th>Crée par</th>
                                                        <tr> {product?.created_by} </tr>
                                                    </tr>
                                                    <tr>
                                                        <th>Modifié par</th>
                                                        <tr> {product?.updated_by} </tr>
                                                    </tr>
                                                    <tr>
                                                        <th>Crée le</th>
                                                        <tr> {product?.created_at} </tr>
                                                    </tr>
                                                    <tr>
                                                        <th>Modifié le</th>
                                                        <tr> {product?.updated_at} </tr>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card h-100">
                                        <div className="card-header">
                                            <h5> Prix et stock </h5>
                                        </div>
                                        <div className="card-body">
                                            <table className={'my-table table-sm product-table table table-hover table-striped table-bordered'}>
                                                <tbody>
                                                <tr>
                                                    <th>Prix d'achat</th>
                                                    <tr>{product.cost}</tr>
                                                </tr>
                                                <tr>
                                                    <th>Prix de vente original</th>
                                                    <tr>{product.price}</tr>
                                                </tr>
                                                <tr>
                                                    <th>Prix de vente</th>
                                                    <tr>{GlobalFunction.formatPrice(product?.sell_price?.price, product?.sell_price?.symbol)}</tr>
                                                </tr>
                                                <tr>
                                                    <th>Réduction</th>
                                                    <tr>{GlobalFunction.formatPrice(product?.sell_price?.discount, product?.sell_price?.symbol)}</tr>
                                                </tr>
                                                <tr>
                                                    <th>% de réduction</th>
                                                    <tr>{product.discount_percent}</tr>
                                                </tr>
                                                <tr>
                                                    <th>Réduction fixed </th>
                                                    <tr>{product.discount_fixed}</tr>
                                                </tr>
                                                <tr>
                                                    <th> Date de début de Réduction </th>
                                                    <tr>{product.discount_start}</tr>
                                                </tr>
                                                <tr>
                                                    <th> Date de fin de Réduction </th>
                                                    <tr>{product.discount_end}</tr>
                                                </tr>
                                                <tr>
                                                    <th> temps de réduction </th>
                                                    <tr>{product.discount_remaining_days} jours</tr>
                                                </tr>
                                                <tr>
                                                    <th> Stock </th>
                                                    <tr>{product.stock}</tr>
                                                </tr>
                                                <tr>
                                                    <th> Marge </th>
                                                    <tr>{GlobalFunction.formatPrice(product.profit)}</tr>
                                                </tr>
                                                <tr>
                                                    <th> Pourcentage du profit </th>
                                                    <tr>{product.profit_percentage} %</tr>
                                                </tr>

                                                </tbody>
                                            </table>
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

export default ProductDetails;