import React from 'react';
import Modal from "react-bootstrap/Modal";

const SupplierDetails = (props) => {
    return (
        <>
            <Modal
                {...props}
                size={props.size}
                aria-labelledby="supplier_details_modal"
                centered
            >
                <Modal.Header closeButton className={'modal-header'}>
                    <Modal.Title id="supplier_details_modal">
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className={'my-table table table-sm table-hover table-striped table-bordered'}>
                        <tbody>
                        <tr>
                            <th>Id</th>
                            <th>{props.supplier.id}</th>
                        </tr>
                        <tr>
                            <th>Libellé</th>
                            <th>{props.supplier.name}</th>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <th>{props.supplier.email}</th>
                        </tr>
                        <tr>
                            <th>Contact</th>
                            <th>{props.supplier.phone}</th>
                        </tr>
                        <tr>
                            <th>Détails</th>
                            <th>{props.supplier.bio}</th>
                        </tr>

                        <tr>
                            <th>Status</th>
                            <th>{props.supplier.status}</th>
                        </tr>
                        <tr>
                            <th>Crée par</th>
                            <th>{props.supplier.created_by}</th>
                        </tr>
                        <tr>
                            <th> Date création </th>
                            <th>{props.supplier.created_at}</th>
                        </tr>
                        <tr>
                            <th> Date modification </th>
                            <th>{props.supplier.updated_at}</th>
                        </tr>
                        <tr>
                            <th> Adresse </th>
                            <th>
                                {
                                   `${props.supplier.address?.address} , 
                                    ${props.supplier.address?.landmark} ,
                                    ${props.supplier.address?.area} ,
                                    ${props.supplier.address?.district},
                                    ${props.supplier.address?.division}
                                    `
                                }




                            </th>
                        </tr>
                        <tr>
                            <th> Logo </th>
                            <th> <img src={props.supplier.photo} className={'img-thumbnail'} alt={'Logo'} /> </th>
                        </tr>
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SupplierDetails;