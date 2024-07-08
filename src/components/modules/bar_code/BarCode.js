import React, {useEffect, useRef, useState} from 'react';
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import axiosClient from "../../../axios";
import GlobalFunction from "../../../GlobalFunction";
import Barcode from 'react-barcode';
import {ReactToPrint, useReactToPrint} from "react-to-print";
import {components} from "react-select";
import BarCodePage from "./BarCodePage";

const BarCode = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const [input, setInput] = useState({
        name: '',
        category_id: '',
        sub_category_id: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [products, setProducts] = useState([])
    const [paperSize, setPaperSize] = useState({
        a4:{
            width: 595,
            height: 842
        }
    })

    const handleInput = (e) => {
        if (e.target.name == 'category_id'){
            let category_id = parseInt(e.target.value);
            if (!Number.isNaN(category_id)) {
                getSubCategories(e.target.value)
            }
        }

        setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }

    const getCategories = () => {
        axiosClient.get(`/get-category-list`).then(res => {
            setCategories(res.data)
        })
    }

    const getSubCategories = (category_id) => {
        axiosClient.get(`/get-sub-category-list/${category_id}`).then(res => {
            setSubCategories(res.data)
        })
    }

    const handleProductSearch = () => {
        axiosClient.get(`/get-product-list-for-bar-code?name=${input?.name}&category_id=${input?.category_id}&sub_category_id=${input?.sub_category_id}`).then(res => {
            setProducts(res.data.data)
        })
    }

    useEffect(() =>{
        getCategories()
    }, [])

    return (
        <>
            <BreadCrumb title={'Générer et imprimer code barre'} />
            <div className="row ">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <CardHeader
                                title={'Générer et imprimer code barre'}
                                link={'#'}
                                icon={'fa-list'}
                                button_text={'Liste'}
                                hide={true}
                            />
                        </div>
                        <div className="card-body">
                            <div className="row align-items-baseline">
                                <div className="col-md-3">
                                    <label className={'w-100 mt-2'}>
                                        <p>Choisir une catégorie</p>
                                        <select
                                            className={'form-select mt-2'}
                                            name={'category_id'}
                                            value={input.category_id}
                                            onChange={handleInput}
                                            placeholder={'Choisir une catégorie'}
                                        >
                                            <option> Choisir une catégorie </option>
                                            {categories.map((category, index) => (
                                                <option value={category.id} key={index}>{category.name}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className="col-md-3">
                                    <label className={'w-100 mt-2'}>
                                        <p>Choisir une sous-catégorie</p>
                                        <select
                                            className={'form-select mt-2'}
                                            name={'sub_category_id'}
                                            value={input.sub_category_id}
                                            onChange={handleInput}
                                            placeholder={'Choisir une sous-catégorie'}
                                            disabled={input.category_id == undefined}
                                        >
                                            <option> Choisir une sous-catégorie </option>
                                            {subCategories.map((sub_category, index) => (
                                                <option value={sub_category.id} key={index}>{sub_category.name}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className="col-md-4">
                                    <label className={'w-100 mt-2'}>
                                        <p>Libellé de l'article</p>
                                        <input
                                            className={'form-control mt-2'}
                                            type={'search'}
                                            name={'name'}
                                            value={input.name}
                                            onChange={handleInput}
                                            placeholder={'Entrer une marque'}
                                        />
                                    </label>
                                </div>
                                <div className="col-md-2">
                                    <div className="mt-2">
                                        <button className={'btn theme-button'} onClick={handleProductSearch} dangerouslySetInnerHTML={{__html: isLoading ? ' <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Chargement... ' : ' Rechercher ' }}/>
                                    </div>
                                </div>
                            </div>

                            <div className="print-area-parent" style={{display: Object.keys(products).length > 0 ? 'block':'none' }}>
                                <button className={'btn theme-button float-end mt-3'} onClick={handlePrint}> Imprimez</button>
                                <div className="bar-code-area-wrapper">
                                    <BarCodePage
                                        products={products}
                                        paperSize={paperSize}
                                        ref={componentRef}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BarCode;