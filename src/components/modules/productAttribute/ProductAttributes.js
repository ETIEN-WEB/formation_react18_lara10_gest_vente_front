import React, {useEffect, useState} from 'react';
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import {Link} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axiosClient from "../../../axios";
import Swal from "sweetalert2";
import Loader from "../../partials/miniComponent/Loader";
import NoDataFound from "../../partials/miniComponent/NoDataFound";
import Pagination from "react-js-pagination";


const ProductAttributes = () => {
    const [modalShow, setModalShow] = useState(false);
    const [input, setInput] = useState({status : 1});
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [attributes, setAttributes] = useState([]);

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
    const [totalItemsCount, setTotalItemsCount] = useState(1)
    const [startFrom, setStartFrom] = useState(1)
    const [activePage, setActivePage] = useState(1)
    const [modalTitle, setModalTitle] = useState('Ajouter')
    const [valueModalTitle, setValueModalTitle] = useState('Ajouter')
    const [valueModalShow, setValueModalShow] = useState(false);

    const [isEditModel, setIsEditModel] = useState(false)
    const [modalValue, setModalValue] = useState([])
    const [modalValueShow, setModalValueShow] = useState(false)

    const handleInput = (e) => setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))


    const handleValueCreate = () => {
        setIsLoading(true)
        axiosClient.post('/value', input).then(res=>{
            setIsLoading(false)
            Swal.fire({
                position: "top-end",
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast:true,
                timer: 1500
            })
            setErrors([])
            setInput({status : 1})
            setValueModalShow(false)
            getAttributes()
        }).catch(errors => {
            setIsLoading(false)
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
            }
        })
    }

    const getAttributes = () => {
        setIsLoading(true)
        axiosClient.get('/attribute').then(res=>{
            setIsLoading(false)
            setAttributes(res.data.data)
            setItemsCountPerPage(res.data.meta.per_page)
            setStartFrom(res.data.meta.from)
            setTotalItemsCount(res.data.meta.total)
            setActivePage(res.data.meta.current_page)

        })
    }

    const handleAttributeCreate = () => {
        setIsLoading(true)
        axiosClient.post('/attribute', input).then(res=>{
            setIsLoading(false)
            Swal.fire({
                position: "top-end",
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast:true,
                timer: 1500
            })
            setErrors([])
            setInput({status : 1})
            setModalShow(false)
            getAttributes()
        }).catch(errors => {
            setIsLoading(false)
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
            }
        })
    }

    const handleAttributeUpdate = (id) => {
        setIsLoading(true)
        axiosClient.put(`/attribute/${id}`, input).then(res=>{
            setIsLoading(false)
            Swal.fire({
                position: "top-end",
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast:true,
                timer: 1500
            })
            setErrors([])
            setInput({status : 1})
            setModalShow(false)
            getAttributes()
        }).catch(errors => {
            setIsLoading(false)
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
            }
        })
    }


    const handleAttributeDelete = (id) => {
        Swal.fire({
            title: "Êtes-vous sure?",
            text: "Vous allez supprimer cet fournisseur",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, je supprime!",
            cancelButtonText: "Annuler",
        }).then((result) => {
            if (result.isConfirmed) {

                setIsLoading(true)
                axiosClient.delete(`/attribute/${id}`).then(res=>{
                    setIsLoading(false)
                    Swal.fire({
                        position: "top-end",
                        icon: res.data.cls,
                        title: res.data.msg,
                        showConfirmButton: false,
                        toast:true,
                        timer: 1500
                    })

                    getAttributes()
                })
            }
        })
    }

    const handleModal = (attribute = null) => {
        setInput({status : 1})
        if (attribute != undefined){
            setModalTitle('Modifier')
            setIsEditModel(true)
            setInput({status: attribute.original_status, name: attribute.name, id: attribute.id})
        }else {
            setIsEditModel(false)
            setModalTitle('Ajouter')
        }
        setErrors([])
        setModalShow(true)
    }

    const handleValueDetailsModal = (value) => {
        setModalValue(value)
        setModalValueShow(true)

    }

    const handleValueDelete = (id) => {
        //console.log(id);
        Swal.fire({
            title: "Êtes-vous sure?",
            text: "Vous allez supprimer cette valeur de l'attribut",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, je supprime!",
            cancelButtonText: "Annuler",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.delete(`/value/${id}`).then(res=>{
                    getAttributes()
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

    const handleValueCreateModal = (id) => {
        setValueModalShow(true)
        setIsEditModel(false)
        setValueModalTitle('Ajouter')
        setInput({status : 1, attribute_id : id})
        console.log(id)
    }

    const handleValueEditModal = (value) => {
        setIsEditModel(true)
        setValueModalShow(true)
        setValueModalTitle('Modifier')
        setInput({status: value.status_original, name: value.name, id: value.id})

    }

    const handleValueEdit = () => {
        setIsLoading(true)
        axiosClient.put(`/value/${input.id}`, input).then(res=>{
            setIsLoading(false)
            Swal.fire({
                position: "top-end",
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast:true,
                timer: 1500
            })
            setErrors([])
            setInput({status : 1})
            setValueModalShow(false)
            getAttributes()
        }).catch(errors => {
            setIsLoading(false)
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
            }
        })

        // setIsEditModel(true)
        // setValueModalShow(true)
        // setValueModalTitle('Modifier')
        // setInput(value)
    }

    useEffect( () => {
        getAttributes()
    }, [])

    return (
        <>
            <BreadCrumb title={' Attribut produit '} />
            <div className="row ">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="text-theme"> Attribut produit </h4>
                                    <button onClick={()=> handleModal() } className={'btn theme-button'}>
                                        <i className={`fa-solid mr_4 fa-plus`}/> Ajouter
                                    </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    {isLoading ? <Loader/> :
                                        <div className="table-responsive soft-landing">
                                            <table className={'my-table table table-hover table-striped table-bordered'}>
                                                <thead>
                                                <tr>
                                                    <th>SL</th>
                                                    <th>Libellé </th>
                                                    <th>Valeur </th>
                                                    <th> Status</th>
                                                    <th>Created By</th>
                                                    <th>Date Time</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {Object.keys(attributes).length > 0 ? attributes?.map((attribute, index) => (
                                                    <tr key={index} >
                                                        <td>{startFrom + index}</td>
                                                        <td>{attribute.name}</td>
                                                        <td className={'text-center'}>
                                                            <div className="value-container-parent">
                                                                {attribute.value != undefined ? attribute.value.map((value, valIndex) => (
                                                                    <div key={valIndex} className={'value-container'}>
                                                                        {value.name}
                                                                        <div className="value-buttons">
                                                                            <button onClick={()=> handleValueDetailsModal(value)} className={'btn btn-info'}> <i className="fa-solid fa-eye"/> </button>
                                                                            <button onClick={()=> handleValueEditModal(value)} className={'btn btn-warning'}> <i className="fa-solid fa-edit"/> </button>
                                                                            <button onClick={()=> handleValueDelete(value.id)} className={'btn btn-danger'}> <i className="fa-solid fa-trash"/> </button>
                                                                        </div>
                                                                    </div>
                                                                )):null}
                                                            </div>

                                                            <button onClick={()=> handleValueCreateModal(attribute.id)} className={'small-button'}>
                                                                <i className={`fa-solid fa-plus`}/>
                                                            </button>
                                                        </td>
                                                        <td>{attribute.status}</td>
                                                        <td>{attribute.created_by}</td>
                                                        <td>
                                                            <p className={'text-theme'}> <small>  Created: {attribute.created_at} </small></p>
                                                            <p className={'text-success'}> <small> Updated: {attribute.updated_at} </small> </p>
                                                        </td>
                                                        <td>
                                                            <button onClick={()=> handleModal(attribute) } className={'btn btn-sm btn-warning my-1'}> <i className="fa-solid fa-edit"/> </button>
                                                            <button onClick={() => handleAttributeDelete(attribute.id) } className={'btn btn-sm btn-danger mx-1 my-1'}> <i className="fa-solid fa-trash"/> </button>
                                                        </td>
                                                    </tr>
                                                )) : <NoDataFound/>}
                                                </tbody>

                                            </table>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <nav className={'pagination-sm'}>
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountPerPage}
                                    totalItemsCount={totalItemsCount}
                                    pageRangeDisplayed={5}
                                    onChange={getAttributes}
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

            <Modal
                centered
                show={modalShow}
                onHide={() => setModalShow(false)}
            >
                <Modal.Header closeButton className={'modal-header'}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {modalTitle} un attribut de produit
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className={'w-100'}>
                        <p>Libellé</p>
                        <input
                            className={ errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2' }
                            type={'text'}
                            name={'name'}
                            value={input.name}
                            onChange={handleInput}
                            placeholder={'Entrer un attribut'}
                        />
                        <p className={'login-error-msg'}> <small> {errors.name != undefined ? errors.name[0] : null } </small> </p>
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
                    <div className={'d-grid mt-4'}>
                        <button className={'btn theme-button mt-4'} onClick={ isEditModel ? ()=> handleAttributeUpdate(input.id) : handleAttributeCreate} dangerouslySetInnerHTML={{__html: isLoading ? ' <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Chargement... ' : ` ${modalTitle} un attribut `  }}/>
                    </div>
                </Modal.Body>
            </Modal>

            {/* START ATTRIBUTE MODAL*/}
            <Modal
                centered
                show={valueModalShow}
                onHide={() => setValueModalShow(false)}
            >
                <Modal.Header closeButton className={'modal-header'}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {valueModalTitle} une valeur à l'attribut
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className={'w-100'}>
                        <p>Libellé</p>
                        <input
                            className={ errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2' }
                            type={'text'}
                            name={'name'}
                            value={input.name}
                            onChange={handleInput}
                            placeholder={'Entrer un attribut'}
                        />
                        <p className={'login-error-msg'}> <small> {errors.name != undefined ? errors.name[0] : null } </small> </p>
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
                    <div className={'d-grid mt-4'}>
                        <button className={'btn theme-button mt-4'} onClick={ isEditModel ? handleValueEdit : handleValueCreate} dangerouslySetInnerHTML={{__html: isLoading ? ' <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Chargement... ' : ` ${modalTitle} une valeur ` }}/>
                    </div>
                </Modal.Body>
            </Modal>
            {/* END ATTRIBUTE   MODAL*/}

            {/* START VALUE OF ATTRIBUTE MODAL*/}
            <Modal
                centered
                show={modalValueShow}
                onHide={() => setModalValueShow(false)}
            >
                <Modal.Header closeButton className={'modal-header'}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Détails des valeurs
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className={'table table-bordered table-hover table-striped'}>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>{modalValue.id}</th>
                            </tr>
                            <tr>
                                <th>Libellé</th>
                                <th>{modalValue.name}</th>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <th>{modalValue.status}</th>
                            </tr>
                            <tr>
                                <th>Crée par</th>
                                <th>{modalValue.created_by}</th>
                            </tr>
                            <tr>
                                <th>Date création</th>
                                <th>{modalValue.created_at}</th>
                            </tr>
                            <tr>
                                <th>Date modification</th>
                                <th>{modalValue.updated_at}</th>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
            {/* END VALUE OF ATTRIBUTE MODAL*/}
        </>
    );
};

export default ProductAttributes;