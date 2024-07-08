import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import logo from "../../../assets/img/logo.png";
import Moment from 'react-moment';

const ShowOrderConfirmation = ({handleOrderPlace,handleOrderSummaryInput, ...props}) => {
    const [branch, setBranch] = useState({})

    useEffect(() => {
        if (localStorage.branch != undefined){
            setBranch(JSON.parse(localStorage.branch))
        }
    }, [])

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Détails de la commande
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="order-details-confirmation">
                    <div className="row px-4 align-items-center">
                        <div className="col-md-5">
                            {Object.keys(branch).length > 0 ?
                                <>
                                    <img src={branch.logo} alt={'logo'} className={'img-thumbnail'} />
                                </> : null
                             }

                        </div>
                        <div className="col-md-7 text-end">
                            <h4> DETAILS DE LA COMMANDE </h4>
                        </div>
                        <div className="col-md-6">
                            {Object.keys(branch).length > 0 ?
                                <>
                                    <p> <strong> {branch.name} </strong> </p>
                                    <address> {branch.address.address}, {branch.address.area}, {branch.address.district}, {branch.address.division}  </address>
                                    <p> <small> Contact: {branch.phone} </small></p>
                                </> : null
                            }
                        </div>
                        <div className="col-md-6 text-end">
                            <p> <strong>
                                <Moment format="DD MMMM, YYYY">

                                </Moment>
                            </strong> </p>
                            <h5> Détails du client </h5>
                            <div className="customer-details">
                                <p>Nom: <span>{props.order_summary.customer.split('-')[0]}</span> </p>
                                <p>Contact: <span>{props.order_summary.customer.split('-')[1]}</span> </p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <table className={'table table-sm table-hover table-stripped table-bordered mt-4'}>
                                <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Description</th>
                                    <th>Quantité</th>
                                    <th>Prix unitaire</th>
                                    <th>Sous-total</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(props.carts).map((key, index)=>(
                                        <tr>
                                            <td>{++index}</td>
                                            <td>{props.carts[key].name}</td>
                                            <td>{props.carts[key].quantity}</td>
                                            <td>{props.carts[key].price}</td>
                                            <td className={'text-end'}>{ new Intl.NumberFormat('en').format(props.carts[key].original_price * props.carts[key].quantity)} FCFA</td>
                                        </tr>
                                        ))}
                                    <tr>
                                        <td colSpan={4} className={'text-end'}> Sous-total</td>
                                        <td className={'text-end'}>{new Intl.NumberFormat('en').format(props.order_summary.amount)} FCFA</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4} className={'text-end'}> Réduction </td>
                                        <td className={'text-end'}> - {new Intl.NumberFormat('en').format(props.order_summary.discount)} FCFA</td>
                                    </tr>
                                    <tr>
                                        <th colSpan={4} className={'text-end'}> Total </th>
                                        <th className={'text-end'}> {new Intl.NumberFormat('en').format(props.order_summary.pay_able)} FCFA</th>
                                    </tr>
                                    <tr>
                                        <th colSpan={4} className={'text-end text-theme align-middle'}> Montant payé </th>
                                        <th className={'text-end align-middle'} style={{width: '160px'}}>
                                            <div className="input-group">
                                                <input
                                                    className="form-control form-control-sm text-end"
                                                    type={'number'}
                                                    name={'paid_amount'}
                                                    value={props.order_summary.paid_amount}
                                                    onChange={handleOrderSummaryInput}
                                                />
                                                <div className="input-group-text"> FCFA</div>
                                            </div>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th colSpan={4} className={'text-end'}> Montant dû </th>
                                        <th className={'text-end'}> {new Intl.NumberFormat('en').format(props.order_summary.due_amount)} FCFA</th>
                                    </tr>
                                    <tr>
                                        <th colSpan={4} className={'text-end text-theme align-middle'}> Choisir une méthode de paiement </th>
                                        <th className={'align-middle text-center'}>
                                            <select
                                                className="form-select form-select-sm text-end"
                                                name={'payment_method_id'}
                                                value={props.order_summary.payment_method_id}
                                                onChange={handleOrderSummaryInput}
                                            >
                                                {props.paymentMethods.map((payment_method, index) => (
                                                    <option key={index} value={payment_method.id}> {payment_method.name} </option>
                                                ))}
                                            </select>
                                        </th>
                                    </tr>
                                    {props.order_summary.payment_method_id != 1 ?
                                        <tr>
                                            <th colSpan={4} className={'text-end text-theme align-middle'}>ID Transaction</th>
                                            <td className={'align-middle'}>
                                                <input
                                                    className="form-control form-control-sm text-end"
                                                    type={'text'}
                                                    name={'trx_id'}
                                                    value={props.order_summary.trx_id}
                                                    onChange={handleOrderSummaryInput}
                                                />
                                            </td>
                                        </tr> : null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className="px-4">
                    <button className={'btn btn-sm btn-danger'} onClick={props.onHide}>Fermer</button>
                    <button
                        className={'btn btn-sm theme-button ms-4'}
                        onClick={handleOrderPlace}
                        dangerouslySetInnerHTML={{__html: props.is_loading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...' : 'Confirmer'}}
                    />
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default ShowOrderConfirmation;