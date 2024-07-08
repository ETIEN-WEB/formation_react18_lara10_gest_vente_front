import React, {useEffect, useState} from 'react';
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import {useParams} from "react-router-dom";
import axiosClient from "../../../axios";
import GlobalFunction from "../../../GlobalFunction";

const OrderDetails = () => {
    const params = useParams()
    const [order, setOrder] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const getOrderDetails = () => {
        setIsLoading(true)
        axiosClient.get(`/order/${params.id}`).then( res => {
            setOrder(res.data.data)
            setIsLoading(false)
        }).catch(errors => {
            console.log(errors)
        })

    }

    useEffect(() => {
        getOrderDetails()
    }, [])

    return (
        <>
            <BreadCrumb title={'Détails de la commande'} />
            <div className="row ">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <CardHeader
                                title={'Détails de la commande'}
                                link={'/order'}
                                icon={'fa-list'}
                                button_text={'Liste'}
                            />
                        </div>
                        <div className="card-body">
                            <div className="row ">
                                {/*<pre> {JSON.stringify(order, undefined, 2)} </pre>*/}
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5> Détails clients </h5>
                                        </div>
                                        <div className="card-body">
                                            <table className={'table table-hover table-bordered table-striped sm-table'}>
                                                <tbody>
                                                    <tr>
                                                        <th> Nom </th>
                                                        <th> {order?.customer?.name} </th>
                                                    </tr>
                                                    <tr>
                                                        <th> Contact </th>
                                                        <th> {order?.customer?.phone} </th>
                                                    </tr>
                                                    <tr>
                                                        <th> Email </th>
                                                        <th> {order?.customer?.email} </th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5> Détails commande </h5>
                                        </div>
                                        <div className="card-body">
                                            <table className={'table table-hover table-bordered table-striped sm-table'}>
                                                <tbody>
                                                <tr>
                                                    <th className={'align-middle'}> Nom </th>
                                                    <th className={'align-middle'}>
                                                        <img src={order?.shop?.logo}  alt={'Logo boutique'} className={'table-image img-thumbnail me-2'} />
                                                        {order?.shop?.name}
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th className={'align-middle'}> Caissier(ère) </th>
                                                    <th className={'align-middle'}>
                                                        <img src={order?.sales_manager?.photo}  alt={'Logo boutique'} className={'table-image img-thumbnail me-2'} />
                                                        {order?.sales_manager?.name}
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th className={'align-middle'}> Email </th>
                                                    <th className={'align-middle'}> {order?.customer?.email} </th>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-4">
                                    <div className="card h-100">
                                        <div className="card-header">
                                            <h5> Récapitulatif de la commande </h5>
                                        </div>
                                        <div className="card-body">
                                            <table className={'table table-hover table-bordered table-striped sm-table'}>
                                                <tbody>
                                                <tr>
                                                    <th className={'align-middle'}> N° Commande </th>
                                                    <th className={'align-middle'}> <strong className={'text-theme'}> {order?.order_number} </strong> </th>
                                                    <th className={'align-middle'}> Total articles </th>
                                                    <th className={'align-middle'}> {order?.quantity} </th>
                                                </tr>
                                                <tr>
                                                    <th className={'align-middle'}> Status commande </th>
                                                    <th className={'align-middle'}> {order?.order_status_string} </th>
                                                    <th className={'align-middle'}> Status paiement </th>
                                                    <th className={'align-middle'}> {order?.payment_status} </th>
                                                </tr>
                                                <tr>
                                                    <th className={'align-middle'}> Méthod de paiement </th>
                                                    <th className={'align-middle'}> {order?.payment_method?.name} </th>
                                                    <th className={'align-middle'}> Numéro de compte </th>
                                                    <th className={'align-middle'}> {order?.payment_method?.account_number} </th>
                                                </tr>
                                                <tr>
                                                    <th className={'align-middle'}> Sous-total </th>
                                                    <th className={'align-middle'}> {GlobalFunction.formatPrice(order?.sub_total)} </th>
                                                    <th className={'align-middle'}> Réduction </th>
                                                    <th className={'align-middle'}> {GlobalFunction.formatPrice(order?.discount)} </th>
                                                </tr>
                                                <tr>
                                                    <th className={'align-middle'}> Total </th>
                                                    <th className={'align-middle'}> <strong className={'text-theme'}> {GlobalFunction.formatPrice(order?.total)} </strong> </th>
                                                </tr>
                                                <tr>
                                                    <th className={'align-middle'}> Montant payé </th>
                                                    <th className={'align-middle'}> <strong className={'text-success'}> {GlobalFunction.formatPrice(order?.paid_amount)} </strong> </th>
                                                    <th className={'align-middle'}> Montant dû </th>
                                                    <th className={'align-middle'}> <strong className={'text-danger'}> {GlobalFunction.formatPrice(order?.due_amount)} </strong> </th>
                                                </tr>
                                                <tr>
                                                    <th className={'align-middle'}> Date de création </th>
                                                    <th className={'align-middle'}> {order?.created_at} </th>
                                                    <th className={'align-middle'}> Date de modification </th>
                                                    <th className={'align-middle'}> {order?.updated_at} </th>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-4s">
                                    <div className="card h-100">
                                        <div className="card-header">
                                            <h5> Détails des articles de la commande </h5>
                                        </div>
                                        <div className="card-body">
                                            <table className={'table table-hover table-bordered table-striped sm-table'}>
                                                <thead>
                                                    <tr>
                                                        <th> SL </th>
                                                        <th> Libellé </th>
                                                        <th> Info </th>
                                                        <th> Quantité </th>
                                                        <th> Photo </th>
                                                        <th> Montant </th>
                                                        <th> Sous-total </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {order?.order_details?.map((product, index) =>(
                                                    <tr key={index}>
                                                        <td className={'align-middle'}> {++index} </td>
                                                        <td className={'align-middle'}>
                                                            <p>Libellé: {product?.name}</p>
                                                            <p className={'text-theme'}>SKU: {product?.sku}</p>
                                                            <p>Fournisseur: {product?.supplier}</p>
                                                        </td>
                                                        <td className={'align-middle'}>
                                                            <p>Marque: {product?.brand}</p>
                                                            <p className={'text-theme'}>Catégorie: {product?.category}</p>
                                                            <p>Sous-catégorie: {product?.sub_category}</p>
                                                        </td>
                                                        <td className={'align-middle'}>{product?.quantity}</td>
                                                        <td className={'align-middle'}>
                                                            <img src={product?.photo}  alt={'image article'} className={'table-image img-thumbnail'} />
                                                        </td>
                                                        <td className={'align-middle'}>
                                                            <p> Prix original: {product?.price}</p>
                                                            <p className={'text-theme'}> Réduction: {product?.sell_price?.discount}</p>
                                                            <p> Prix de vente: {GlobalFunction.formatPrice(product?.sell_price?.price)}</p>
                                                        </td>
                                                        <td className={'align-middle text-end'}>
                                                            { GlobalFunction.formatPrice(product?.sell_price?.price * product?.quantity) }
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-4 mb-5">
                                    <div className="card h-100">
                                        <div className="card-header">
                                            <h5> Transaction de la commande </h5>
                                        </div>
                                        <div className="card-body">
                                            <table className={'table table-hover table-bordered table-striped sm-table'}>
                                                <thead>
                                                <tr>
                                                    <th> SL </th>
                                                    <th> Trx ID </th>
                                                    <th> Montant </th>
                                                    <th> Client </th>
                                                    <th> Méthode de paiment </th>
                                                    <th> Staus </th>
                                                    <th> Effectué par </th>
                                                    <th> Date de création </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {order?.transactions?.map((transaction, index) =>(
                                                    <tr key={index}>
                                                        <td className={'align-middle'}> {++index} </td>
                                                        <td className={'align-middle'}>{transaction.trx_id}</td>
                                                        <td className={'align-middle'}>{GlobalFunction.formatPrice(transaction.amount)}</td>
                                                        <td className={'align-middle'}>
                                                            <p> Nom: {transaction.customer_name} </p>
                                                            <p className={'text-theme'}> Contact: {transaction.customer_phone} </p>
                                                        </td>
                                                        <td className={'align-middle'}>
                                                            <p> Nom: {transaction.payment_method_name} </p>
                                                            <p className={'text-theme'}> N° compte {transaction.account_number} </p>
                                                        </td>
                                                        <td className={'align-middle'}>
                                                            <p> Staus: {transaction?.status}</p>
                                                            <p className={'text-theme'}> Trx. Type: {transaction?.transaction_type}</p>
                                                        </td>
                                                        <td className={'align-middle'}>{transaction?.transaction_by}</td>
                                                        <td className={'align-middle'}>{transaction?.created_at}</td>
                                                    </tr>
                                                ))}
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

export default OrderDetails;