import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CategoryDetailsModal = (props) => {
    return (
    <>
        <Modal
            {...props}
            size={props.size}
            aria-labelledby="category_details_modal"
            centered
            >
            <Modal.Header closeButton className={'modal-header'}>
                <Modal.Title id="category_details_modal">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className={'my-table table table-hover table-striped table-bordered'}>
                    <tbody>
                    <tr>
                        <th>Id</th>
                        <th>{props.category.id}</th>
                    </tr>
                    <tr>
                        <th>Libellé</th>
                        <th>{props.category.name}</th>
                    </tr>
                    <tr>
                        <th>Slug</th>
                        <th>{props.category.slug}</th>
                    </tr>
                    {props.category.category_name != undefined ?
                        <tr>
                            <th>Catégorie</th>
                            <th>{props.category.category_name}</th>
                        </tr>
                        :null
                    }

                    <tr>
                        <th>Description</th>
                        <th>{props.category.description}</th>
                    </tr>
                    <tr>
                        <th>Serial</th>
                        <th>{props.category.serial}</th>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <th>{props.category.status}</th>
                    </tr>
                    <tr>
                        <th>Crée par</th>
                        <th>{props.category.created_by}</th>
                    </tr>
                    <tr>
                        <th> Date création </th>
                        <th>{props.category.created_at}</th>
                    </tr>
                    <tr>
                        <th> Date modification </th>
                        <th>{props.category.updated_at}</th>
                    </tr>
                    <tr>
                        <th> Photo </th>
                        <th> <img src={props.category.photo} className={'img-thumbnail'} alt={'Photo'} /> </th>
                    </tr>
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
    </>
    );
};

export default CategoryDetailsModal;