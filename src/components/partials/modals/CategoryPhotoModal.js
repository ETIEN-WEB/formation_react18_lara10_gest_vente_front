import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CategoryPhotoModal = (props) => {
    return (
    <>
        <Modal
            {...props}
            size={props.size}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton className={'modal-header'}>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={props.photo} className={'img-thumbnail'} alt={'Photo'} />
            </Modal.Body>
        </Modal>
    </>
    );
};

export default CategoryPhotoModal;