import React, {useEffect, useState} from 'react';
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import {useNavigate} from "react-router-dom";

import Constants from "../../../Constants";
import Swal from "sweetalert2";
import axiosClient from '../../../axios';
import {click} from "@testing-library/user-event/dist/click";

const AddProduct = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({status: 1})
    const [attribute_input, setAttribute_input] = useState({})
    const [specification_input, setSpecification_input] = useState({})
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [countries, setCountries] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [attributes, setAttributes] = useState([])

    const [attributeField, setAttributeField] = useState([])
    const [attributeFieldId, setAttributeFieldId] = useState(1)
    const [specificationFiled, setSpecificationFiled] = useState([])
    const [specificationFiledId, setSpecificationFiledId] = useState(1)

    const handleSpecificationFieldRemove = (id) => {
        setSpecificationFiled(oldValues => {
            return oldValues.filter(specificationFiled => specificationFiled !== id)
        })
        setSpecification_input(current => {
            const copy = {...current};
            delete copy[id];
            return copy;
        })
        setSpecificationFiledId(specificationFiledId-1)
    }
    const handleSpecificationFields = (id) => {
        setSpecificationFiledId(specificationFiledId+1)
        setSpecificationFiled(prevState => [...prevState, specificationFiledId])
    }

    const handleAttributeFieldsRemove = (id) => {
      setAttributeField(oldValues => {
          return oldValues.filter(attributeField => attributeField !== id)
      })
        setAttribute_input(current => {
            const copy = {...current};
            delete copy[id];
            return copy;
        })
        setAttributeFieldId(attributeFieldId-1)
    }
    /**
     * handleAttributeFields => boutton permettant d'ajouter des attributs Ex: [1,2,3]
     * attributeFieldId => L'index du tableau ['attribut' => 'attribut_valeur']
     *
     *
     * @param id
     */
    const handleAttributeFields = (id) => {
        if (attributes.length >= attributeFieldId){
            setAttributeFieldId(attributeFieldId+1)
            setAttributeField(prevState => [...prevState, attributeFieldId])
        }
    }
    const handleSpecificationInput = (e, id) => {
        setSpecification_input(prevState => ({
            ...prevState,
            [id]:{
                ...prevState[id], [e.target.name]: e.target.value
            }
        }))
    }
    const handleAttributeInput = (e, id) => {
        setAttribute_input(prevState => ({
            ...prevState,
            [id]:{
                ...prevState[id], [e.target.name]: e.target.value
            }
        }))
    }
    const getAttributes = () => {
        axiosClient.get(`/get-attribute-list`).then(res => {
            setAttributes(res.data)
        })
    }
    const getSuppliers = () => {
        axiosClient.get(`/get-supplier-list`).then(res => {
            setSuppliers(res.data)
        })
    }
    const getCountries = () => {
        axiosClient.get(`/get-country-list`).then(res => {
            setCountries(res.data)
        })
    }
    const getCategories = () => {
        axiosClient.get(`/get-category-list`).then(res => {
            setCategories(res.data)
        })
    }
    const getBrands = () => {
        axiosClient.get(`/get-brand-list`).then(res => {
            setBrands(res.data)
        })
    }

    const getSubCategories = (category_id) => {
        axiosClient.get(`/get-sub-category-list/${category_id}`).then(res => {
            setSubCategories(res.data)
        })
    }

    const handleInput = (e) => {
        if (e.target.name == 'name') {
            let slug = e.target.value
            slug = slug.toLowerCase()
            slug = slug.replaceAll(' ', '-')
            setInput(prevState => ({...prevState, slug: slug}))
        } else if (e.target.name == 'category_id') {
            let category_id = parseInt(e.target.value);
            if (!Number.isNaN(category_id)) {
                getSubCategories(e.target.value)
            }
        }

        setInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const handlePhoto = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onloadend = () => {
            setInput(prevState => ({...prevState, photo: reader.result}))
        }
        reader.readAsDataURL(file)
    }
    const handleProductCreate = () => {
        setIsLoading(true)
        axiosClient.post(`/product`, input).then(res => {
            setIsLoading(false)
            Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
            })
            if (res.data.product_id != undefined){
                navigate('/product/photo/'+res.data.product_id)
            }

        }).catch(errors => {
            setIsLoading(false)
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
            }
        })
    }


    useEffect(() => {
        getCategories()
        getBrands()
        getCountries()
        getSuppliers()
        getAttributes()
    }, []);

    useEffect(()=>{
        setInput(prevState => ({...prevState, attributes: attribute_input}))
    }, [attribute_input])

    useEffect(()=>{
        setInput(prevState => ({...prevState, specifications: specification_input}))
    }, [specification_input])


    return (
        <>
            <BreadCrumb title={'Add Product'}/>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <CardHeader
                                title={'Add Product'}
                                link={'/product'}
                                icon={'fa-list'}
                                button_text={'List'}
                            />
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <label className={'w-100 mt-4'}>
                                        <p>Choisir les boutique</p>
                                        <select
                                            className={errors.shop_id != undefined ? 'form-select mt-2 is-invalid' : 'form-select mt-2'}
                                            name={'shop_id[]'}
                                            value={input.shop_id}
                                            onChange={handleInput}
                                            placeholder={'Choisir les boutiques'}
                                        >

                                        </select>

                                        <p className={'login-error-msg'}>
                                            <small>{errors.shop_id != undefined ? errors.shop_id[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className={'w-100 mt-4'}>
                                        <p>Name</p>
                                        <input
                                            className={errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            type={'text'}
                                            name={'name'}
                                            value={input.name}
                                            onChange={handleInput}
                                            placeholder={'Enter Product name'}
                                        />
                                        <p className={'login-error-msg'}>
                                            <small>{errors.name != undefined ? errors.name[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className={'w-100 mt-4'}>
                                        <p>Slug</p>
                                        <input
                                            className={errors.slug != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            type={'text'}
                                            name={'slug'}
                                            value={input.slug}
                                            onChange={handleInput}
                                            placeholder={'Enter Product slug'}
                                        />
                                        <p className={'login-error-msg'}>
                                            <small>{errors.slug != undefined ? errors.slug[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className={'w-100 mt-4'}>
                                        <p>Select Category</p>
                                        <select
                                            className={errors.category_id != undefined ? 'form-select mt-2 is-invalid' : 'form-select mt-2'}
                                            name={'category_id'}
                                            value={input.category_id}
                                            onChange={handleInput}
                                            placeholder={'Select product category'}
                                        >
                                            <option>Select Category</option>
                                            {categories.map((category, index) => (
                                                <option value={category.id} key={index}>{category.name}</option>
                                            ))}

                                        </select>
                                        <p className={'login-error-msg'}>
                                            <small>{errors.category_id != undefined ? errors.category_id[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className={'w-100 mt-4'}>
                                        <p>Select Sub Category</p>
                                        <select
                                            className={errors.sub_category_id != undefined ? 'form-select mt-2 is-invalid' : 'form-select mt-2'}
                                            name={'sub_category_id'}
                                            value={input.sub_category_id}
                                            onChange={handleInput}
                                            placeholder={'Select product sub category'}
                                            disabled={input.category_id == undefined}
                                        >
                                            <option>Select Sub Category</option>
                                            {subCategories.map((sub_category, index) => (
                                                <option value={sub_category.id} key={index}>{sub_category.name}</option>
                                            ))}

                                        </select>
                                        <p className={'login-error-msg'}>
                                            <small>{errors.sub_category_id != undefined ? errors.sub_category_id[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className={'w-100 mt-4'}>
                                        <p>Select Brand</p>
                                        <select
                                            className={errors.brand_id != undefined ? 'form-select mt-2 is-invalid' : 'form-select mt-2'}
                                            name={'brand_id'}
                                            value={input.brand_id}
                                            onChange={handleInput}
                                            placeholder={'Select product brand'}
                                        >
                                            <option>Select Brand</option>
                                            {brands.map((brand, index) => (
                                                <option value={brand.id} key={index}>{brand.name}</option>
                                            ))}
                                        </select>
                                        <p className={'login-error-msg'}>
                                            <small>{errors.brand_id != undefined ? errors.brand_id[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className={'w-100 mt-4'}>
                                        <p>Select Product Origin</p>
                                        <select
                                            className={errors.country_id != undefined ? 'form-select mt-2 is-invalid' : 'form-select mt-2'}
                                            name={'country_id'}
                                            value={input.country_id}
                                            onChange={handleInput}
                                            placeholder={'Select product origin'}
                                        >
                                            <option>Select Product Origin</option>
                                            {countries.map((country, index) => (
                                                <option value={country.id} key={index}>{country.name}</option>
                                            ))}
                                        </select>
                                        <p className={'login-error-msg'}>
                                            <small>{errors.country_id != undefined ? errors.country_id[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className={'w-100 mt-4'}>
                                        <p>Select Product Supplier</p>
                                        <select
                                            className={errors.supplier_id != undefined ? 'form-select mt-2 is-invalid' : 'form-select mt-2'}
                                            name={'supplier_id'}
                                            value={input.supplier_id}
                                            onChange={handleInput}
                                            placeholder={'Select product supplier'}
                                        >
                                            <option>Select Product Supplier</option>
                                            {suppliers.map((supplier, index) => (
                                                <option value={supplier.id}
                                                        key={index}>{supplier.name} - {supplier.phone}</option>
                                            ))}
                                        </select>
                                        <p className={'login-error-msg'}>
                                            <small>{errors.supplier_id != undefined ? errors.supplier_id[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className={'w-100 mt-4'}>
                                        <p>Status</p>
                                        <select
                                            className={errors.status != undefined ? 'form-select mt-2 is-invalid' : 'form-select mt-2'}
                                            name={'status'}
                                            value={input.status}
                                            onChange={handleInput}
                                            placeholder={'Select product status'}
                                        >
                                            <option value={1}>Active</option>
                                            <option value={0}>Inactive</option>
                                        </select>
                                        <p className={'login-error-msg'}>
                                            <small>{errors.status != undefined ? errors.status[0] : null}</small></p>
                                    </label>
                                </div>

                                <div className="col-md-12">
                                    <div className="card my-4">
                                        <div className="card-header">
                                            <h5>Select Product Attribute</h5>
                                        </div>
                                        <div className="card-body">
                                            {attributeField.map((id, ind)=>(
                                                <div key={ind} className="row my-2 align-items-baseline">
                                                    <div className="col-md-5">
                                                        <label className={'w-100 mt-4'}>
                                                            <p>Select Attribute</p>
                                                            {/*<pre> {JSON.stringify(attribute_input, undefined, 2)} </pre>*/}
                                                            <select
                                                                className='form-select mt-2'
                                                                name={'attribute_id'}
                                                                value={attribute_input[id] != undefined ? attribute_input[id].attribute_id : null}
                                                                onChange={(e)=>handleAttributeInput(e, id)}
                                                                placeholder={'Select product attribute'}
                                                            >
                                                                <option>Select Attribute</option>
                                                                {attributes.map((value, index)=>(
                                                                    <option value={value.id}>{value.name}</option>
                                                                ))}
                                                            </select>
                                                            <p className={'login-error-msg'}>
                                                                <small>{errors.attribute_id != undefined ? errors.attribute_id[0] : null}</small></p>
                                                        </label>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <label className={'w-100 mt-4'}>
                                                            <p>Select Attribute Value</p>
                                                            <select
                                                                className={'form-select mt-2'}
                                                                name={'value_id'}
                                                                value={attribute_input[id] != undefined ? attribute_input[id].value_id : null}
                                                                onChange={(e)=>handleAttributeInput(e, id)}
                                                                placeholder={'Select product attribute value'}
                                                            >
                                                                <option>Select Attribute Value</option>
                                                                {attributes.map((value, index)=>(
                                                                    <>
                                                                        {attribute_input[id] != undefined && value.id == attribute_input[id].attribute_id ? value.value.map((atr_value, value_ind)=>(
                                                                            <option value={atr_value.id}>{atr_value.name}</option>
                                                                        )):null}
                                                                    </>
                                                                ))}
                                                            </select>
                                                            <p className={'login-error-msg'}>
                                                                <small>{errors.attribute_id != undefined ? errors.attribute_id[0] : null}</small></p>
                                                        </label>
                                                    </div>
                                                    <div className="col-md-2">
                                                        {attributeField.length -1 == ind ?
                                                        <button className={'btn btn-danger'} onClick={()=>handleAttributeFieldsRemove(id)}>
                                                            <i className="fa-solid fa-minus"/>
                                                        </button>:null
                                                        }
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="row">
                                                <div className="col-md-12 text-center">
                                                    <button className={'btn btn-success'} onClick={handleAttributeFields}>
                                                        <i className="fa-solid fa-plus"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="card my-4">
                                        <div className="card-header">
                                            <h5>Product Specifications</h5>
                                        </div>
                                        <div className="card-body">
                                            {specificationFiled.map((id, ind)=>(
                                                <div key={ind} className="row my-2 align-items-baseline">
                                                    <div className="col-md-5">
                                                        <label className={'w-100 mt-4'}>
                                                            <p>Specification Name</p>
                                                            <input
                                                                className={'form-control mt-2'}
                                                                type={'text'}
                                                                name={'name'}
                                                                value={specification_input[id] != undefined ? specification_input[id].name : null}
                                                                onChange={(e)=>handleSpecificationInput(e, id)}
                                                                placeholder={'Enter Product Specification Name'}
                                                            />
                                                            <p className={'login-error-msg'}>
                                                                <small>{errors.name != undefined ? errors.name[0] : null}</small></p>
                                                        </label>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <label className={'w-100 mt-4'}>
                                                            <p>Specification Value</p>
                                                            <input
                                                                className='form-control mt-2'
                                                                type={'text'}
                                                                name={'value'}
                                                                value={specification_input[id] != undefined ? specification_input[id].value : null}
                                                                onChange={(e)=>handleSpecificationInput(e, id)}
                                                                placeholder={'Enter Product Specification Name'}
                                                            />
                                                            <p className={'login-error-msg'}>
                                                                <small>{errors.name != undefined ? errors.name[0] : null}</small></p>
                                                        </label>
                                                    </div>
                                                    <div className="col-md-2">
                                                        {specificationFiled.length -1 == ind ?
                                                            <button className={'btn btn-danger'} onClick={()=>handleSpecificationFieldRemove(id)}>
                                                                <i className="fa-solid fa-minus"/>
                                                            </button> : null
                                                        }

                                                    </div>
                                                </div>
                                            ))}

                                            <div className="row">
                                                <div className="col-md-12 text-center">
                                                    <button className={'btn btn-success'} onClick={handleSpecificationFields}>
                                                        <i className="fa-solid fa-plus"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 my-4">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Product Price and Stock</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label className={'w-100 mt-4'}>
                                                        <p>Product Cost</p>
                                                        <input
                                                            className={errors.cost != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                            type={'number'}
                                                            name={'cost'}
                                                            value={input.cost}
                                                            onChange={handleInput}
                                                            placeholder={'Enter Product Cost'}
                                                        />
                                                        <p className={'login-error-msg'}>
                                                            <small>{errors.cost != undefined ? errors.cost[0] : null}</small></p>
                                                    </label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className={'w-100 mt-4'}>
                                                        <p>Product Sale Price</p>
                                                        <input
                                                            className={errors.price != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                            type={'number'}
                                                            name={'price'}
                                                            value={input.price}
                                                            onChange={handleInput}
                                                            placeholder={'Enter Product Price'}
                                                        />
                                                        <p className={'login-error-msg'}>
                                                            <small>{errors.price != undefined ? errors.price[0] : null}</small></p>
                                                    </label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className={'w-100 mt-4'}>
                                                        <p>Discount %</p>
                                                        <input
                                                            className={errors.discount_percent != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                            type={'number'}
                                                            name={'discount_percent'}
                                                            value={input.discount_percent}
                                                            onChange={handleInput}
                                                            placeholder={'Enter Product Discount (%)'}
                                                        />
                                                        <p className={'login-error-msg'}>
                                                            <small>{errors.discount_percent != undefined ? errors.discount_percent[0] : null}</small></p>
                                                    </label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className={'w-100 mt-4'}>
                                                        <p>Discount Fixed Amount</p>
                                                        <input
                                                            className={errors.discount_fixed != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                            type={'number'}
                                                            name={'discount_fixed'}
                                                            value={input.discount_fixed}
                                                            onChange={handleInput}
                                                            placeholder={'Enter Product Discount Fixed'}
                                                        />
                                                        <p className={'login-error-msg'}>
                                                            <small>{errors.discount_fixed != undefined ? errors.discount_fixed[0] : null}</small></p>
                                                    </label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className={'w-100 mt-4'}>
                                                        <p>Discount Start Date</p>
                                                        <input
                                                            className={errors.discount_start != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                            type={'datetime-local'}
                                                            name={'discount_start'}
                                                            value={input.discount_start}
                                                            onChange={handleInput}
                                                            placeholder={'Enter Discount Start Date'}
                                                        />
                                                        <p className={'login-error-msg'}>
                                                            <small>{errors.discount_start != undefined ? errors.discount_start[0] : null}</small></p>
                                                    </label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className={'w-100 mt-4'}>
                                                        <p>Discount End Date</p>
                                                        <input
                                                            className={errors.discount_end != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                            type={'datetime-local'}
                                                            name={'discount_end'}
                                                            value={input.discount_end}
                                                            onChange={handleInput}
                                                            placeholder={'Enter Discount End Date'}
                                                        />
                                                        <p className={'login-error-msg'}>
                                                            <small>{errors.discount_end != undefined ? errors.discount_end[0] : null}</small></p>
                                                    </label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className={'w-100 mt-4'}>
                                                        <p>Prouct Stock</p>
                                                        <input
                                                            className={errors.stock != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                            type={'number'}
                                                            name={'stock'}
                                                            value={input.stock}
                                                            onChange={handleInput}
                                                            placeholder={'Enter Product Stock'}
                                                        />
                                                        <p className={'login-error-msg'}>
                                                            <small>{errors.stock != undefined ? errors.stock[0] : null}</small></p>
                                                    </label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className={'w-100 mt-4'}>
                                                        <p>Prouct SKU</p>
                                                        <input
                                                            className={errors.sku != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                            type={'text'}
                                                            name={'sku'}
                                                            value={input.sku}
                                                            onChange={handleInput}
                                                            placeholder={'Enter Product SKU'}
                                                        />
                                                        <p className={'login-error-msg'}>
                                                            <small>{errors.sku != undefined ? errors.sku[0] : null}</small></p>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <label className={'w-100 mt-4'}>
                                        <p>Description</p>
                                        <textarea
                                            className={errors.description != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name={'description'}
                                            value={input.description}
                                            onChange={handleInput}
                                            placeholder={'Enter product description'}
                                        />
                                        <p className={'login-error-msg'}>
                                            <small>{errors.description != undefined ? errors.description[0] : null}</small>
                                        </p>
                                    </label>
                                </div>

                                <div className="col-md-12">
                                    <div className="row justify-content-center">
                                        <div className="col-md-4">
                                            <div className="d-grid mt-4">
                                                <button className={'btn theme-button'} onClick={handleProductCreate}
                                                        dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...' : 'Suivant'}}/>
                                            </div>
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
export default AddProduct;
